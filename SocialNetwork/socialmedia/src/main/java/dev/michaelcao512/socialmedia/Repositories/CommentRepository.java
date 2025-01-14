package dev.michaelcao512.socialmedia.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dev.michaelcao512.socialmedia.Entities.Comment;
import dev.michaelcao512.socialmedia.Entities.Post;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    boolean existsByPost(Post post);

    List<Comment> findByPost(Post post);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.post = ?1")
    int countByPost(Post post);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.parentComment = ?1")
    int countByParentComment(Comment parentComment);

}
