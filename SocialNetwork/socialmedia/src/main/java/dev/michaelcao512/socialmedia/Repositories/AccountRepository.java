package dev.michaelcao512.socialmedia.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.michaelcao512.socialmedia.Entities.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByUsername(String username);

    Account findByEmail(String email);

    Account findByUsernameOrEmail(String username, String email);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    Optional<Account> findByCommentsCommentId(Long commentId);

    @Query("SELECT a FROM Account a JOIN a.posts p WHERE p.postId = ?1")
    Optional<Account> findAccountOfPost(Long postId);

    @Query("SELECT f.friend FROM Friendship f JOIN f.account a WHERE a.accountId =?1")
    List<Account> findFollowing(Long accountId);

    @Query("SELECT f.account FROM Friendship f JOIN f.friend a WHERE a.accountId =?1")
    List<Account> findFollowers(Long accountId);

    @Query("SELECT a FROM Account a WHERE LOWER(a.username) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(a.email) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Account> searchUsers(@Param("query") String query);

    @Query(value = "select username from account\n" +
            "where account_id = :accountId", nativeQuery = true)
    String findUsernameByAccountId(@Param("accountId") Long accountId);
    
    @Query("SELECT a FROM Account a WHERE a.accountId = ?1")
    Optional<Account> findById(long accountId);
    Optional<Account> findByVerificationToken(String token);

}
