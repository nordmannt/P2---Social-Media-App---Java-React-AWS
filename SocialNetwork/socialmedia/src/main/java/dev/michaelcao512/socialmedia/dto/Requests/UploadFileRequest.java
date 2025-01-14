package dev.michaelcao512.socialmedia.dto.Requests;

import org.springframework.web.multipart.MultipartFile;

import dev.michaelcao512.socialmedia.Entities.Image;

public record UploadFileRequest(
                String fileName, 
                MultipartFile file, 
                Image.ImageType imageType, 
                Long accountId,
                        
                Long userInfoId,
                Long postId,
                Long commentId) {
}