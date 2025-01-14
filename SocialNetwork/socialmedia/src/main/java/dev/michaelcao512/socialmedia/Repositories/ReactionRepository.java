package dev.michaelcao512.socialmedia.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dev.michaelcao512.socialmedia.Entities.Post;
import dev.michaelcao512.socialmedia.Entities.Reaction;
import dev.michaelcao512.socialmedia.Entities.Comment;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    List<Reaction> findByPost(Post post);

    boolean existsByPost(Post post);

    @Query("SELECT COUNT(r) FROM Reaction r WHERE r.post.postId = ?1 AND r.reactionType = 'LIKE'")
    int getLikeCount(long postId);

    @Query("SELECT COUNT(r) FROM Reaction r WHERE r.post.postId = ?1 AND r.reactionType = 'DISLIKE'")
    int getDislikeCount(long postId);

    // @Query("SELECT r FROM Reaction r JOIN r.post p JOIN p.account a WHERE p.postId = ?1 AND a.accountId = ?2")
    // Optional<Reaction> getReactionByPostIdAndAccountId(long postId, long accountId);

    @Query("SELECT r FROM Reaction r WHERE r.post.postId = ?1 AND r.account.accountId = ?2")
    Optional<Reaction> findByPostIdAndAccountId(long postId, long accountId);


    List<Reaction> findByComment(Comment comment);
    boolean existsByComment(Comment comment);
    
    @Query("SELECT COUNT(r) FROM Reaction r WHERE r.comment.commentId = ?1 AND r.reactionType = 'LIKE'")
    int getLikeCountByCommentId(Long commentId);
    
    @Query("SELECT COUNT(r) FROM Reaction r WHERE r.comment.commentId = ?1 AND r.reactionType = 'DISLIKE'")
    int getDislikeCountByCommentId(Long commentId);

    @Query("SELECT r FROM Reaction r WHERE r.comment.commentId = ?1 AND r.account.accountId = ?2")
    Optional<Reaction> findByCommentIdAndAccountId(long commentId, long accountId);


}
