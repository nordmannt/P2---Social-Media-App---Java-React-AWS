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
import dev.michaelcao512.socialmedia.Entities.Post;
import dev.michaelcao512.socialmedia.Entities.Reaction;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.PostRepository;
import dev.michaelcao512.socialmedia.Repositories.ReactionRepository;
import dev.michaelcao512.socialmedia.Services.ReactionService;
import dev.michaelcao512.socialmedia.dto.Requests.CreateReactionRequest;

public class ReactionTest {
    @Mock
    private ReactionRepository reactionRepository;
    @Mock
    private PostRepository postRepository;
    @Mock
    private AccountRepository accountRepository;
    @InjectMocks
    private ReactionService reactionService;

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
    public void testCreateReaction() {
        CreateReactionRequest createReactionRequest = new CreateReactionRequest(1L, 1L, null,
                Reaction.ReactionType.LIKE);
        Reaction reaction = new Reaction();
        reaction.setPost(post);
        reaction.setReactionType(Reaction.ReactionType.LIKE);

        when(accountRepository.findById(createReactionRequest.accountId())).thenReturn(Optional.of(account));
        when(postRepository.findById(createReactionRequest.postId())).thenReturn(Optional.of(post));
        when(reactionRepository.findByPostIdAndAccountId(createReactionRequest.postId(),
                createReactionRequest.accountId()))
                .thenReturn(Optional.empty());
        when(reactionRepository.save(any(Reaction.class))).thenReturn(reaction);

        Reaction savedReaction = reactionService.createReaction(createReactionRequest);

        assertNotNull(savedReaction);
        assertEquals(post, savedReaction.getPost());
        assertEquals(Reaction.ReactionType.LIKE, savedReaction.getReactionType());
        verify(postRepository).findById(createReactionRequest.postId());
        verify(reactionRepository).save(any(Reaction.class));
    }

    /*
     * @Test
     * public void testCreateReaction() {
     * 
     * CreateReactionRequest createReactionRequest = new CreateReactionRequest(1L,
     * 1L, Reaction.ReactionType.LIKE);
     * Reaction reaction = new Reaction();
     * reaction.setPost(post);
     * reaction.setReactionType(Reaction.ReactionType.LIKE);
     * 
     * when(postRepository.findById(createReactionRequest.postId())).thenReturn(
     * Optional.of(post));
     * when(reactionRepository.save(reaction)).thenReturn(reaction);
     * 
     * Reaction savedReaction =
     * reactionService.createReaction(createReactionRequest);
     * 
     * assertNotNull(savedReaction);
     * assert (savedReaction.getReactionId() == 1L);
     * assert (savedReaction.getPost().getPostId() == 1L);
     * assert (savedReaction.getReactionType() == Reaction.ReactionType.LIKE);
     * verify(reactionRepository).save(reaction);
     * }
     * 
     */
    @Test
    public void testDeleteReaction() {
        Reaction reaction = new Reaction();
        reaction.setReactionId(1L);
        reaction.setPost(post);
        reaction.setReactionType(Reaction.ReactionType.LIKE);

        when(reactionRepository.findById(reaction.getReactionId())).thenReturn(Optional.of(reaction));
        reactionService.deleteReaction(reaction.getReactionId());
        verify(reactionRepository).deleteById(reaction.getReactionId());

        assertThrows(IllegalArgumentException.class, () -> reactionService.deleteReaction(2L));
    }

    @Test
    public void testGetReactionsByPostId() {
        long postId = 1L;
        Reaction reaction1 = new Reaction();
        reaction1.setReactionId(1L);
        reaction1.setPost(post);
        reaction1.setReactionType(Reaction.ReactionType.LIKE);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(reactionRepository.existsByPost(post)).thenReturn(true);
        when(reactionRepository.findByPost(post)).thenReturn(List.of(reaction1));

        List<Reaction> reactions = reactionService.getReactionsByPostId(postId);

        assertNotNull(reactions);
        assert (reactions.get(0).getReactionId() == 1L);
        assert (reactions.get(0).getPost().getPostId() == 1L);

        assertThrows(IllegalArgumentException.class, () -> reactionService.getReactionsByPostId(2L));
    }

    @Test
    public void testGetReactionsByAccountId() {
        long accountId = 1L;
        Reaction reaction1 = new Reaction();
        reaction1.setReactionId(1L);
        reaction1.setPost(post);
        reaction1.setReactionType(Reaction.ReactionType.LIKE);

        when(reactionRepository.findById(accountId)).thenReturn(Optional.of(reaction1));
        Reaction retrievedReaction = reactionService.getReactionById(1L);

        assertNotNull(retrievedReaction);
        assert (retrievedReaction.getReactionId() == 1L);
        assert (retrievedReaction.getPost().getPostId() == 1L);

        assertThrows(IllegalArgumentException.class, () -> reactionService.getReactionById(2L));
    }
}