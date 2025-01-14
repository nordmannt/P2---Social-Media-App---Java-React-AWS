package dev.michaelcao512.socialmedia.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reactionId;

    @ManyToOne
    @JoinColumn(name = "accountId", nullable = false)
    @JsonBackReference(value = "account-reactions")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "postId", nullable = true) // Nullable if reaction relates to a comment instead
    @JsonBackReference(value = "post-reactions")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "commentId", nullable = true) // Nullable if reaction relates to a post instead
    @JsonBackReference(value = "comment-reactions")
    private Comment comment;

    @Enumerated(EnumType.STRING)
    private ReactionType reactionType;

    public enum ReactionType {
        LIKE, DISLIKE
    }

    @Override
    public String toString() {
        return "Reaction{" +
                "reactionId=" + reactionId +
                ", accountId=" + (account != null ? account.getAccountId() : "null") +
                ", postId=" + (post != null ? post.getPostId() : "null") +
                ", commentId=" + (comment != null ? comment.getCommentId() : "null") +
                ", reactionType=" + reactionType +
                '}';
    }
}
