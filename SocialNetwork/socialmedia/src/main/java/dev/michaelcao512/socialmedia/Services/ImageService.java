package dev.michaelcao512.socialmedia.Services;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Image;
import dev.michaelcao512.socialmedia.Entities.UserInfo;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.CommentRepository;
import dev.michaelcao512.socialmedia.Repositories.ImageRepository;
import dev.michaelcao512.socialmedia.Repositories.UserInfoRepository;
import dev.michaelcao512.socialmedia.Repositories.PostRepository;
import dev.michaelcao512.socialmedia.dto.Requests.UpdateImageRequest;
import dev.michaelcao512.socialmedia.dto.Requests.UploadFileRequest;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.Optional;
import java.util.UUID;

@Service
public class ImageService {

    private final S3Client s3Client;
    private final S3Presigner s3Presigner;
    private final ImageRepository imageRepository;
    private final AccountRepository accountRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserInfoRepository userInfoRepository;
    private String bucketName;

    public ImageService(S3Client s3Client, S3Presigner s3Presigner, ImageRepository imageRepository,
            AccountRepository accountRepository,
            PostRepository postRepository, CommentRepository commentRepository, UserInfoRepository userInfoRepository,
            @Value("${S3.bucket.name}") String bucketName) {
        this.s3Client = s3Client;
        this.s3Presigner = s3Presigner;
        this.imageRepository = imageRepository;
        this.accountRepository = accountRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.bucketName = bucketName;
        this.userInfoRepository = userInfoRepository;
    }

    public PutObjectResponse uploadFileToS3(MultipartFile file, String bucketKey) {

        Path filePath = null;

        // Create a temp file to store the file
        try {
            filePath = Files.createTempFile("upload-", bucketKey);
            file.transferTo(filePath.toFile());
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }

        // Upload the file to S3
        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(bucketKey)
                .build();
        PutObjectResponse response = s3Client.putObject(request, filePath);

        // Delete the file from the local filesystem
        try {
            Files.delete(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file", e);
        }

        return response;
    }

    public Image uploadFile(UploadFileRequest uploadFileRequest) {
        String bucketKey = UUID.randomUUID().toString();
        PutObjectResponse response = uploadFileToS3(uploadFileRequest.file(), bucketKey);

        Image image = new Image();
        image.setFileName(uploadFileRequest.fileName());
        image.setETag(response.eTag());
        image.setImageType(uploadFileRequest.imageType());
        image.setBucketKey(bucketKey);

        if (uploadFileRequest.accountId() == null) {
            throw new RuntimeException("Account ID is required");
        }
        Account account = accountRepository.findById(uploadFileRequest.accountId()).get();
        image.setAccount(account);

        switch (uploadFileRequest.imageType()) {
            case PROFILE:
                if (uploadFileRequest.userInfoId() != null) {
                    userInfoRepository.findById(uploadFileRequest.userInfoId()).ifPresent(u -> {
                        Image existingImage = imageRepository.findByUserInfoId(u.getUserInfoId());
                        if (existingImage != null) {
                            u.setProfileImage(null);
                            userInfoRepository.save(u);
                            deleteImageFromS3(existingImage);
                            imageRepository.delete(existingImage);
                        }
                        u.setProfileImage(image);
                        image.setUserInfo(u);
                    });
                } else {
                    throw new RuntimeException("UserInfo ID is required for profile image");
                }
                break;
            case POST:
                if (uploadFileRequest.postId() != null) {
                    postRepository.findById(uploadFileRequest.postId()).ifPresent(p -> image.setPost(p));
                } else {
                    // no id provided, postId should be updated after post creation
                }
                break;
            case COMMENT:
                if (uploadFileRequest.commentId() != null) {
                    commentRepository.findById(uploadFileRequest.commentId()).ifPresent(c -> image.setComment(c));
                } else {
                    // no id provided, commentId should be updated after comment creation
                }
                break;
            default:
                throw new RuntimeException("Invalid image type");
        }

        return imageRepository.save(image);
    }

    @Transactional
    public void deleteImage(Long imageId) {
        Optional<Image> imageOpt = imageRepository.findById(imageId);
        if (imageOpt.isPresent()) {
            Image image = imageOpt.get();
            if (image.getImageType() == Image.ImageType.PROFILE) {
                UserInfo userInfo = userInfoRepository.findByProfileImage(image)
                        .orElseThrow(() -> new RuntimeException("Associated UserInfo not found"));
                userInfo.setProfileImage(null); 
                userInfoRepository.save(userInfo); 
            }
            deleteImageFromS3(image);
            imageRepository.delete(image);
        } else {
            throw new RuntimeException("Image not found with id: " + imageId);
        }

    }

    @Transactional
    public void deleteImageFromS3(Image image) {
        if (image != null) {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(image.getBucketKey())
                    .build();
            s3Client.deleteObject(deleteObjectRequest);
        } else {
            throw new RuntimeException("Image not found in delete from S3");
        }
    }

    public String getPresignedUrl(String key) {

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(15))
                .getObjectRequest(getObjectRequest)
                .build();

        PresignedGetObjectRequest presignedRequest = s3Presigner.presignGetObject(getObjectPresignRequest);
        return presignedRequest.url().toExternalForm();
    }

    public Image updateImage(Long imageId, UpdateImageRequest updateImageRequest) {
        Optional<Image> imageOpt = imageRepository.findById(imageId);
        // reuploading the image to s3 if image id already exists
        if (imageOpt.isPresent()) {
            Image image = imageOpt.get();
            deleteImageFromS3(image);

            String bucketKey = UUID.randomUUID().toString();
            PutObjectResponse response = uploadFileToS3(updateImageRequest.file(), bucketKey);
            image.setBucketKey(bucketKey);
            image.setETag(response.eTag());
            image.setFileName(updateImageRequest.fileName());

            return imageRepository.save(image);
        } else {
            throw new RuntimeException("Image not found with id: " + imageId);
        }
    }
}