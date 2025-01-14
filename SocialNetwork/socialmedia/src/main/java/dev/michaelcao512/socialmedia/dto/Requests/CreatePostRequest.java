package dev.michaelcao512.socialmedia.dto.Requests;

import java.util.List;


public record CreatePostRequest(String content, Long accountId, List<Long> imageIds) {

}