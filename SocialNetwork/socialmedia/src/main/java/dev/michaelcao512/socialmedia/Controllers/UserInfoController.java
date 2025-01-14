package dev.michaelcao512.socialmedia.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.michaelcao512.socialmedia.Entities.UserInfo;
import dev.michaelcao512.socialmedia.Services.UserInfoService;

@RestController
@RequestMapping("/api/userinfo")
public class UserInfoController {

    private final UserInfoService userInfoService;

    public UserInfoController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    /**
     * Updates the user information associated with the given user id.
     * 
     * The object in the request body should contain the fields to be updated.
     * If the field is not present in the request body, it will not be updated.
     * 
     * 
     * @param userInfo the user information to update
     * @return the updated user information if the update is successful
     * @throws IllegalArgumentException if the user information is not found
     */
    @PutMapping("/{userInfoId}")
    public ResponseEntity<UserInfo> updateUserInfo(@PathVariable Long userInfoId, @RequestBody UserInfo userInfo) {
      
        UserInfo newUserInfo = userInfoService.updateUserInfo(userInfo);
        return ResponseEntity.ok(newUserInfo);
    }

    /**
     * Retrieves the user information associated with the given account id.
     * 
     * @param accountId the id of the account to retrieve user information for
     * @return the user information associated with the given account id
     * @throws IllegalArgumentException if the given account id does not exist
     */
    @GetMapping("/{userInfoId}")
    public ResponseEntity<UserInfo> getUserInfo(@PathVariable Long accountId) {
        UserInfo userInfo = userInfoService.getUserInfo(accountId);
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/getByAccountId/{accountId}")
    public ResponseEntity<UserInfo> getUserInfoByAccountId(@PathVariable Long accountId) {
        UserInfo userInfo = userInfoService.getUserInfoByAccountId(accountId);
        return ResponseEntity.ok(userInfo);
    }
}