package dev.michaelcao512.socialmedia.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dev.michaelcao512.socialmedia.Entities.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    @Query("SELECT i FROM Image i WHERE i.userInfo.id = :userInfoId")
    Image findByUserInfoId(Long userInfoId);

}
