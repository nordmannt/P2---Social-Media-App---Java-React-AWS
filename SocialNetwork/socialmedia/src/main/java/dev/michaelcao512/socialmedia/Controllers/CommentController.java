package dev.michaelcao512.socialmedia.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.michaelcao512.socialmedia.Entities.Comment;
import dev.michaelcao512.socialmedia.Services.CommentService;
import dev.michaelcao512.socialmedia.dto.Requests.CreateCommentRequest;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    /**
     * Retrieves a comment with the given comment id.
     * 
     * @param commentId the id of the comment to be retrieved
     * @return the comment with the given comment id
     * @throws IllegalArgumentException if the comment does not exist
     */
    @GetMapping("/{commentId}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long commentId) {
        Comment comment = commentService.getCommentById(commentId);
        return ResponseEntity.ok(comment);
    }

    /**
     * Creates a new comment for the given post and account.
     * 
     * The object in the request body should contain the post ID, account ID, and
     * content of the comment.
     * 
     * @param comment the comment to be created
     * @return the created comment if the creation is successful
     * @throws IllegalArgumentException if the comment is null, the post does not
     *                                  exist, or the account does not exist
     */
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CreateCommentRequest createCommentRequest) {
        Comment newComment = commentService.createComment(createCommentRequest);
        return ResponseEntity.ok(newComment);
    }

    /**
     * Updates a comment with the given ID.
     * 
     * @param comment the comment to be updated
     * @return the updated comment if the update is successful
     * @throws IllegalArgumentException if the comment is null or does not exist
     */
    @PutMapping("/{commentId}")
    public ResponseEntity<Comment> updateComment(@RequestBody Comment comment) {
        Comment updatedComment = commentService.updateComment(comment);
        return ResponseEntity.ok(updatedComment);

    }

    /**
     * Deletes a comment with the given ID.
     * 
     * @param commentId The ID of the comment to delete
     * @return 200 OK if the comment was deleted, 400 Bad Request if the comment
     *         does not exist
     */
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }

    /**
     * Retrieves all comments for a given post.
     * 
     * @param postId the id of the post to retrieve comments for
     * @return a list of comments associated with the given post id
     * @throws IllegalArgumentException if the post does not exist
     */

    @GetMapping("/getCommentsByPostId/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/getCommentCountByPostId/{postId}")
    public ResponseEntity<Integer> getCommentsCountByPostId(@PathVariable Long postId) {
        int commentsCount = commentService.getCommentsCountByPostId(postId);
        return ResponseEntity.ok(commentsCount);
    }

    @GetMapping("/getCommentCountByCommentId/{commentId}")
    public ResponseEntity<Integer> getCommentsCountByCommentId(@PathVariable Long commentId) {
        int commentsCount = commentService.getCommentsCountByCommentId(commentId);
        return ResponseEntity.ok(commentsCount);
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        return ResponseEntity.ok(commentService.getAllComments());
    }

}