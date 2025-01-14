package dev.michaelcao512.socialmedia.UnitTesting;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Comment;
import dev.michaelcao512.socialmedia.Entities.Post;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.CommentRepository;
import dev.michaelcao512.socialmedia.Repositories.PostRepository;
import dev.michaelcao512.socialmedia.Services.CommentService;
import dev.michaelcao512.socialmedia.dto.Requests.CreateCommentRequest;

public class CommentTest {
    @Mock
    private CommentRepository commentRepository;
    @Mock
    private PostRepository postRepository;
    @Mock
    private AccountRepository accountRepository;
    @InjectMocks
    private CommentService commentService;

    private Account account;
    private Post post;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        account = new Account();
        post = new Post();

        account.setAccountId(1L);
        post.setPostId(1L);
        post.setAccount(account);
    }

    @Test
    public void testCreateComment() {

        CreateCommentRequest createCommentRequest = new CreateCommentRequest(1L, null, 1L, "Test Comment Content");

        when(accountRepository.findById(createCommentRequest.accountId())).thenReturn(Optional.of(account));
        when(postRepository.findById(createCommentRequest.postId())).thenReturn(Optional.of(post));

        Comment comment = new Comment();
        comment.setCommentId(1L);
        comment.setAccount(account);
        comment.setPost(post);
        comment.setContent("Test Comment Content");

        when(commentRepository.save(any(Comment.class))).thenReturn(comment);

        Comment savedComment = commentService.createComment(createCommentRequest);

        assertNotNull(savedComment);
        assertEquals(1L, savedComment.getCommentId());
        assertEquals(1L, savedComment.getAccount().getAccountId());
        assertEquals(1L, savedComment.getPost().getPostId());
        assertEquals("Test Comment Content", savedComment.getContent());
    }

    @Test
    public void testUpdateComment() {
        Comment updates = new Comment();
        updates.setCommentId(1L);
        // updates.setAccount(account);
        updates.setPost(post);
        updates.setContent("Updated Comment Content");

        Comment comment = new Comment();
        comment.setCommentId(1L);
        // comment.setAccount(account);
        comment.setPost(post);
        comment.setContent("Test Comment Content");

        // checking for illegal argument exception when comment is null
        assertThrows(IllegalArgumentException.class, () -> commentService.updateComment(null));

        // checking for illegal argument exception when account is null
        // updates.setAccount(null);
        assertThrows(IllegalArgumentException.class, () -> commentService.updateComment(comment));
        // updates.setAccount(account);

        // checking for illegal argument exception when post is null
        updates.setPost(null);
        assertThrows(IllegalArgumentException.class, () -> commentService.updateComment(comment));
        updates.setPost(post);

        when(commentRepository.save(comment)).thenReturn(comment);
        when(commentRepository.existsById(comment.getCommentId())).thenReturn(true);
        when(commentRepository.findById(comment.getCommentId())).thenReturn(Optional.of(comment));
        Comment savedComment = commentService.updateComment(updates);

        assertNotNull(savedComment);
        assert (savedComment.getCommentId() == 1L);
        // assert (savedComment.getAccount().getAccountId() == 1L);
        assert (savedComment.getPost().getPostId() == 1L);
        assert (savedComment.getContent().equals("Updated Comment Content"));
    }

    @Test
    public void testDeleteComment() {
        Comment comment = new Comment();
        comment.setCommentId(1L);
        // comment.setAccount(account);
        comment.setPost(post);
        comment.setContent("Test Comment Content");

        when(commentRepository.existsById(comment.getCommentId())).thenReturn(true);
        commentService.deleteComment(comment.getCommentId());

        verify(commentRepository).deleteById(comment.getCommentId());

        // throws exception when comment does not exist
        assertThrows(IllegalArgumentException.class, () -> commentService.deleteComment(2L), "Comment does not exist");
    }

    @Test
    public void testGetCommentsByPostId() {
        Comment comment = new Comment();
        comment.setCommentId(1L);
        comment.setAccount(account);
        comment.setPost(post);
        comment.setContent("Test Comment Content");

        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        when(commentRepository.existsByPost(post)).thenReturn(true);
        when(commentRepository.findByPost(post)).thenReturn(List.of(comment));
        List<Comment> retrievedComments = commentService.getCommentsByPostId(post.getPostId());

        assertNotNull(retrievedComments);
        assert (retrievedComments.get(0).getCommentId() == 1L);
        assert (retrievedComments.get(0).getContent().equals("Test Comment Content"));

        // throws exception when post does not exist
        assertThrows(IllegalArgumentException.class, () -> commentService.getCommentsByPostId(2L),
                "Post does not exist");
    }

    @Test
    public void testGetCommentById() {
        Comment comment = new Comment();
        comment.setCommentId(1L);
        // comment.setAccount(account);
        comment.setPost(post);
        comment.setContent("Test Comment Content");

        when(commentRepository.findById(comment.getCommentId())).thenReturn(Optional.of(comment));
        Comment retrievedComment = commentService.getCommentById(comment.getCommentId());

        assertNotNull(retrievedComment);
        assert (retrievedComment.getCommentId() == 1L);
        assert (retrievedComment.getContent().equals("Test Comment Content"));
        verify(commentRepository).findById(comment.getCommentId());

        // throws exception when comment does not exist
        assertThrows(IllegalArgumentException.class, () -> commentService.getCommentById(2L), "Comment does not exist");
    }
}
