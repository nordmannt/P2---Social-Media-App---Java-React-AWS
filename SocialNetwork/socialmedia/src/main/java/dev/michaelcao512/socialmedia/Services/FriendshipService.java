package dev.michaelcao512.socialmedia.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Friendship;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.FriendshipRepository;
import dev.michaelcao512.socialmedia.dto.Requests.FriendshipRequest;

@Service
public class FriendshipService {
    private final FriendshipRepository friendshipRepository;
    private final AccountRepository accountRepository;

    public FriendshipService(FriendshipRepository friendshipRepository, AccountRepository accountRepository) {
        this.friendshipRepository = friendshipRepository;
        this.accountRepository = accountRepository;
    }

    public Friendship addFriend(FriendshipRequest friendshipRequest) {
        Long accountId = friendshipRequest.accountId();
        Long friendId = friendshipRequest.friendId();

        Account account = accountRepository.findById(accountId).orElse(null);
        Account friend = accountRepository.findById(friendId).orElse(null);
        if (account == null || friend == null) {
            throw new IllegalArgumentException("Account or friend cannot be null");
        }
        if (friendshipRepository.existsByAccountAndFriend(account, friend)) {
            throw new IllegalArgumentException("Friendship already exists");
        }
        if (accountId == friendId) {
            throw new IllegalArgumentException("Cannot be friends with yourself");
        }
        Friendship friendship = new Friendship();
        friendship.setAccount(account);
        friendship.setFriend(friend);

        return friendshipRepository.save(friendship);
    }

    public void removeFriend(FriendshipRequest friendshipRequest) {
        Long accountId = friendshipRequest.accountId();
        Long friendId = friendshipRequest.friendId();

        Account account = accountRepository.findById(accountId).orElse(null);
        Account friend = accountRepository.findById(friendId).orElse(null);

        if (account == null || friend == null) {
            throw new IllegalArgumentException("Account and friend cannot be null");
        }
        Optional<Friendship> friendship = friendshipRepository.findByAccountAndFriend(account, friend);
        if (friendship.isEmpty()) {
            throw new IllegalArgumentException("Friendship does not exist");
        }

        friendshipRepository.delete(friendship.get());
    }

    public List<Friendship> getAllFriends(Long accountId) {
        Account account = accountRepository.findById(accountId).orElse(null);
        if (account == null) {
            throw new IllegalArgumentException("Account cannot be null");
        }
        return friendshipRepository.findAllByAccount(account);
    }

    public Boolean isFollowing(Long accountId, Long friendId) {
        return friendshipRepository.existsByAccountAccountIdAndFriendAccountId(accountId, friendId);

    }

    public void deleteFriendshipByAccountIdAndFriendId(Long accountId, Long friendId) {
        Optional<Account> account = accountRepository.findById(accountId);
        Optional<Account> friend = accountRepository.findById(friendId);
        if (account.isEmpty() || friend.isEmpty()) {
            throw new IllegalArgumentException("Account or friend cannot be null");
        }
        Optional<Friendship> friendship = friendshipRepository.findByAccountAndFriend(account.get(), friend.get());
        if (friendship.isEmpty()) {
            throw new IllegalArgumentException("Friendship does not exist");
        }
        friendshipRepository.delete(friendship.get());
    }
}
