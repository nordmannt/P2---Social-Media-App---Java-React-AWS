package dev.michaelcao512.socialmedia.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Friendship;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    boolean existsByAccountAndFriend(Account account, Account friend);

    Optional<Friendship> findByAccountAndFriend(Account account, Account friend);

    List<Friendship> findAllByAccount(Account account);

    Boolean existsByAccountAccountIdAndFriendAccountId(Long accountId, Long friendId);

}
