package dev.michaelcao512.socialmedia.dto.Requests;

import dev.michaelcao512.socialmedia.Entities.Reaction.ReactionType;

public record CreateReactionRequest(Long postId, Long accountId, Long commentId, ReactionType reactionType) {
}
