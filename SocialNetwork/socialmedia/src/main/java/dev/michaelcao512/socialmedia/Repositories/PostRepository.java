package dev.michaelcao512.socialmedia.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByAccount(Account account);

    boolean existsByAccount(Account account);

    @Query("SELECT p FROM Post p WHERE p.account.accountId != ?1 ORDER BY p.dateCreated DESC")
    List<Post> findAllPostsBesidesOwn(Long accountId);

    @Query("SELECT p FROM Post p WHERE LOWER(p.content) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Post> searchPosts(@Param("query") String query);

    @Query("SELECT p FROM Post p WHERE p.postId = ?1")
    Optional<Post> findById(long postId);

    @Query("SELECT p FROM Post p WHERE p.account.accountId IN (:followingIds) ORDER BY p.dateCreated DESC")
    List<Post> findPostsByFollowingAccounts(@Param("followingIds") List<Long> followingIds);
}
