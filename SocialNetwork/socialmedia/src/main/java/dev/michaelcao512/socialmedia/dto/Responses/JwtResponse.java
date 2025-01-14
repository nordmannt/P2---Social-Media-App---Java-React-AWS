package dev.michaelcao512.socialmedia.dto.Responses;

public record JwtResponse(String accessToken, Long id, String username, String email) {
}