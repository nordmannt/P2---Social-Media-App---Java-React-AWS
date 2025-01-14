package dev.michaelcao512.socialmedia.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.michaelcao512.socialmedia.Entities.Friendship;
import dev.michaelcao512.socialmedia.Services.FriendshipService;
import dev.michaelcao512.socialmedia.dto.Requests.FriendshipRequest;

@RestController
@RequestMapping("/api/friendship")
public class FriendshipController {
    private final FriendshipService friendshipService;

    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    /**
     * Adds a new friendship to the database.
     * 
     * The object in the request body should contain the account and friend to be
     * added.
     * 
     * @param friendshipRequest the new friendship to be added
     * @return the added friendship
     * @throws IllegalArgumentException if account or friend is null
     * @throws IllegalArgumentException if the friendship already exists
     * @throws IllegalArgumentException if the account is the same as the friend
     */
    @PostMapping
    public ResponseEntity<Friendship> addFriend(@RequestBody FriendshipRequest friendshipRequest) {
        Friendship friendship = friendshipService.addFriend(friendshipRequest);
        return ResponseEntity.ok(friendship);
    }

    /**
     * Removes a friendship from the database.
     * 
     * @param friendshipRequest the friendship to be removed
     * @return an empty response if the friendship was successfully removed
     * @throws IllegalArgumentException if account or friend is null
     * @throws IllegalArgumentException if the friendship does not exist
     */
    @DeleteMapping("/{friendshipId}")
    public ResponseEntity<Void> removeFriend(@RequestBody FriendshipRequest friendshipRequest) {
        friendshipService.removeFriend(friendshipRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/deleteFriendshipByAccountIdAndFriendId/{accountId}/{friendId}")
    public ResponseEntity<Void> deleteFriendshipByAccountIdAndFriendId(@PathVariable Long accountId, @PathVariable Long friendId) {
        friendshipService.deleteFriendshipByAccountIdAndFriendId(accountId, friendId);
        return ResponseEntity.ok().build();
    }
    /**
     * Retrieves all friendships associated with the given account id.
     * 
     * @param accountId the id of the account to retrieve friendships for
     * @return a list of friendships associated with the given account id
     * @throws IllegalArgumentException if the given account id does not exist
     */
    @GetMapping("/getFriendshipByAccountId/{accountId}")
    public ResponseEntity<List<Friendship>> getFriendshipByAccountId(@PathVariable Long accountId) {
        List<Friendship> friendship = friendshipService.getAllFriends(accountId);
        return ResponseEntity.ok(friendship);
    }

    @GetMapping("/isFollowing/{accountId}/{friendId}")
    public ResponseEntity<Boolean> isFollowing(@PathVariable Long accountId, @PathVariable Long friendId) {
        Boolean isFollowing = friendshipService.isFollowing(accountId, friendId);
        return ResponseEntity.ok(isFollowing);
    }
}