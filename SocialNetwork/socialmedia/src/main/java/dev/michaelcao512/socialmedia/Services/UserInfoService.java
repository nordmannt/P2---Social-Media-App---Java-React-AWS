package dev.michaelcao512.socialmedia.Services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import dev.michaelcao512.socialmedia.Entities.UserInfo;
import dev.michaelcao512.socialmedia.Repositories.UserInfoRepository;

@Service
public class UserInfoService {
    private final UserInfoRepository userInfoRepository;

    public UserInfoService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    public UserInfo updateUserInfo(UserInfo userInfo) {
        UserInfo existingUserInfo = userInfoRepository.findById(userInfo.getUserInfoId()).orElse(null);
        if (existingUserInfo == null) {
            throw new IllegalArgumentException("User info not found");
        }
        if (userInfo.getFirstName() != null && !userInfo.getFirstName().isEmpty()) {
            existingUserInfo.setFirstName(userInfo.getFirstName());
        }
        if (userInfo.getLastName() != null && !userInfo.getLastName().isEmpty()) {
            existingUserInfo.setLastName(userInfo.getLastName());
        }
        if (userInfo.getGender() != null && !userInfo.getGender().isEmpty()) {
            existingUserInfo.setGender(userInfo.getGender());
        }

        if (userInfo.getBiography() != null) {
            existingUserInfo.setBiography(userInfo.getBiography());
        }

        return userInfoRepository.save(existingUserInfo);
    }

    public UserInfo getUserInfo(Long userInfoId) {
        Optional<UserInfo> userInfo = userInfoRepository.findById(userInfoId);
        if (userInfo.isEmpty()) {
            throw new IllegalArgumentException("User info not found");
        }
        return userInfo.get();
    }

    public UserInfo getUserInfoByAccountId(Long accountId) {
        Optional<UserInfo> userInfo = userInfoRepository.findByAccountId(accountId);
        if (userInfo.isEmpty()) {
            throw new IllegalArgumentException("User info not found");
        }
        return userInfo.get();
    }

}
