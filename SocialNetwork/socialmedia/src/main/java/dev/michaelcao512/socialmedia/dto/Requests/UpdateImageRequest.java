package dev.michaelcao512.socialmedia.dto.Requests;

import org.springframework.web.multipart.MultipartFile;

public record UpdateImageRequest(MultipartFile file, String fileName) {
    
}
