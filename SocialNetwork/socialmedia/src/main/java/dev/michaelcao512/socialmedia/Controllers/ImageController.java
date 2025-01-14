package dev.michaelcao512.socialmedia.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.michaelcao512.socialmedia.Entities.Image;
import dev.michaelcao512.socialmedia.Services.ImageService;
import dev.michaelcao512.socialmedia.dto.Requests.UploadFileRequest;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@RequestMapping("/api/image")
public class ImageController {
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Image> uploadImage(@ModelAttribute UploadFileRequest uploadFileRequest) {
        return ResponseEntity.ok(imageService.uploadFile(uploadFileRequest));
    }

    @DeleteMapping("/{imageId}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long imageId) {
        imageService.deleteImage(imageId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getPresignedUrl/{key}")
    public ResponseEntity<String> getPresignedUrl(@PathVariable String key) {
        return ResponseEntity.ok(imageService.getPresignedUrl(key));
    }
    

}
