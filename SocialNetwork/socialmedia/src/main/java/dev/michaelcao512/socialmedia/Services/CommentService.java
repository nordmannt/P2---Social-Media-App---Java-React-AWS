package dev.michaelcao512.socialmedia.Services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Comment;
import dev.michaelcao512.socialmedia.Entities.Post;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.CommentRepository;
import dev.michaelcao512.socialmedia.Repositories.PostRepository;
import dev.michaelcao512.socialmedia.dto.Requests.CreateCommentRequest;

@Service
public class CommentService {
    Logger logger = LoggerFactory.getLogger(CommentService.class);
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final AccountRepository accountRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository,
            AccountRepository accountRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.accountRepository = accountRepository;
    }

    public Comment createComment(CreateCommentRequest createCommentRequest) {
        Account account = accountRepository.findById(createCommentRequest.accountId()).orElse(null);
        Post post = null;
        Comment parentComment = null;
        if (createCommentRequest.postId() != null) {
            post = postRepository.findById(createCommentRequest.postId()).orElse(null);
        }
        if (createCommentRequest.parentCommentId() != null) {
            parentComment = commentRepository.findById(createCommentRequest.parentCommentId()).orElse(null);
        }

        if (account == null || (post == null && parentComment == null)) {
            throw new IllegalArgumentException("Request body contents cannot be null");
        }
        Comment comment = new Comment();

        comment.setContent(createCommentRequest.content());
        comment.setPost(post);
        comment.setAccount(account);
        comment.setParentComment(parentComment);

        Comment c = commentRepository.save(comment);

        return c;
    }

    public Comment updateComment(Comment updates) {
        if (updates == null) {
            throw new IllegalArgumentException("Comment cannot be null");
        }
        if (!commentRepository.existsById(updates.getCommentId())) {
            throw new IllegalArgumentException("Comment does not exist");
        }

        Comment existingComment = commentRepository.findById(updates.getCommentId()).get();
        existingComment.setContent(updates.getContent());

        return commentRepository.save(existingComment);

    }

    public void deleteComment(Long commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new IllegalArgumentException("Comment does not exist");
        }

        commentRepository.deleteById(commentId);
    }

    public Comment getCommentById(Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isEmpty()) {
            throw new IllegalArgumentException("Comment does not exist");
        }
        return comment.get();
    }

    public List<Comment> getCommentsByPostId(long postId) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty()) {
            throw new IllegalArgumentException("Post does not exist");
        }
        if (!commentRepository.existsByPost(post.get())) {
            return List.of();
        }
        return commentRepository.findByPost(post.get());
    }

    public int getCommentsCountByPostId(Long postId) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty()) {
            return 0;
        }
        return commentRepository.countByPost(post.get());
    }
    public int getCommentsCountByCommentId(Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isEmpty()) {
            return 0;
        }
        return commentRepository.countByParentComment(comment.get());
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }



}
