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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.michaelcao512.socialmedia.Entities.Post;
import dev.michaelcao512.socialmedia.Services.PostService;
import dev.michaelcao512.socialmedia.dto.Requests.CreatePostRequest;
import dev.michaelcao512.socialmedia.dto.Requests.UpdatePostRequest;

@RestController
@RequestMapping("/api/post")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/searchPosts")
    public ResponseEntity<List<Post>> searchPosts(@RequestParam("query") String query) {
        System.out.println("Received query: " + query);
        List<Post> posts = postService.searchPosts(query);
        return ResponseEntity.ok(posts);
    }
    

    /**
     * Retrieves all posts.
     * 
     * @return a list of all posts
     */
    @GetMapping("")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    /**
     * Creates a new post.
     * 
     * The object in the request body should contain the content of the post.
     * 
     * @param post the post to be created
     * @return the created post
     * @throws IllegalArgumentException if the post is null
     */
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody CreatePostRequest createPostRequest) {
        Post newPost = postService.createPost(createPostRequest);
        return ResponseEntity.ok(newPost);

    }

    /**
     * Deletes a post with the given post id.
     * 
     * @param postId the id of the post to be deleted
     * @return an empty response if the post was successfully deleted
     * @throws IllegalArgumentException if the post does not exist
     */

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.ok().build();
    }

    /**
     * Updates an existing post with the provided post details.
     * 
     * The object in the request body should contain the updated content of the
     * post.
     * 
     * @param post the post to be updated
     * @return the updated post if the update is successful
     * @throws IllegalArgumentException if the post is null or does not exist
     */

    @PutMapping("/{postId}")
    public ResponseEntity<Post> updatePost(@RequestBody UpdatePostRequest updatePostRequest) {
        Post updatedPost = postService.updatePost(updatePostRequest);
        return ResponseEntity.ok(updatedPost);
    }

    /**
     * Retrieves a post with the given post id.
     * 
     * @param postId the id of the post to be retrieved
     * @return the post with the given post id
     * @throws IllegalArgumentException if the post does not exist
     */
    @GetMapping("/{postId:[0-9]+}")
    public ResponseEntity<Post> getPostById(@PathVariable Long postId) {
        Post post = postService.getPostById(postId);
        return ResponseEntity.ok(post);
    }

    /**
     * Retrieves all posts associated with the given account id.
     * 
     * @param accountId the id of the account to retrieve posts for
     * @return a list of posts associated with the given account id
     * @throws IllegalArgumentException if the given account id does not exist
     */
    @GetMapping("/getPostsByAccountId/{accountId}")
    public ResponseEntity<List<Post>> getPostsByAccountId(@PathVariable Long accountId) {
        List<Post> post = postService.getPostsByAccountId(accountId);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/getPostsBesidesOwn/{accountId}")
    public ResponseEntity<List<Post>> getPostsBesidesOwn(@PathVariable Long accountId) {
        List<Post> post = postService.getAllPostsBesidesOwn(accountId);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/getHomePosts/{accountId}")
    public ResponseEntity<List<Post>> getHomePosts(@PathVariable Long accountId) {
        List<Post> posts = postService.getPostsFromFollowedAccounts(accountId);
        return ResponseEntity.ok(posts);
    }
}