package dev.michaelcao512.socialmedia.dto.Requests;

import java.util.List;


public record UpdatePostRequest(Long postId, String content, Long accountId, List<Long> imageIds) {

}
