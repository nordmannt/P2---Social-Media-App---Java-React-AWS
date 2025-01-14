package dev.michaelcao512.socialmedia.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.michaelcao512.socialmedia.Entities.Image;
import dev.michaelcao512.socialmedia.Entities.UserInfo;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    @Query("SELECT u FROM UserInfo u WHERE u.account.accountId = :accountId")
    Optional<UserInfo> findByAccountId(@Param("accountId") Long accountId);

    @Query("SELECT u FROM UserInfo u WHERE u.profileImage = :image")
    Optional<UserInfo> findByProfileImage(Image image);
}
