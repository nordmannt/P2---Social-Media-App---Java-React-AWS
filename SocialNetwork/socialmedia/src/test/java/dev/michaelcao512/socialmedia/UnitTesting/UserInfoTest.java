package dev.michaelcao512.socialmedia.UnitTesting;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import dev.michaelcao512.socialmedia.Entities.UserInfo;
import dev.michaelcao512.socialmedia.Repositories.UserInfoRepository;
import dev.michaelcao512.socialmedia.Services.UserInfoService;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;

public class UserInfoTest {
    @Mock
    private UserInfoRepository userInfoRepository;

    @InjectMocks
    private UserInfoService userInfoService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testUpdateFirstName() {
        UserInfo existingInfo = new UserInfo();
        existingInfo.setUserInfoId(1L);
        existingInfo.setFirstName("OldFirstName");
        existingInfo.setLastName("LastName");
        existingInfo.setGender("Male");

        UserInfo updatedInfo = new UserInfo();
        updatedInfo.setUserInfoId(1L);
        updatedInfo.setFirstName("NewFirstName");

        when(userInfoRepository.findById(1L)).thenReturn(Optional.of(existingInfo));
        when(userInfoRepository.save(existingInfo)).thenAnswer(i -> i.getArguments()[0]);

        UserInfo result = userInfoService.updateUserInfo(updatedInfo);

        assertEquals("NewFirstName", result.getFirstName());
        assertEquals("LastName", result.getLastName()); // Previous value maintained
        assertEquals("Male", result.getGender()); // Previous value maintained

        verify(userInfoRepository, times(1)).findById(1L);
        verify(userInfoRepository, times(1)).save(existingInfo);
    }

    @Test
    public void testUpdateLastName() {
        UserInfo existingInfo = new UserInfo();
        existingInfo.setUserInfoId(1L);
        existingInfo.setFirstName("FirstName");
        existingInfo.setLastName("OldLastName");
        existingInfo.setGender("Male");

        UserInfo updatedInfo = new UserInfo();
        updatedInfo.setUserInfoId(1L);
        updatedInfo.setLastName("NewLastName");

        when(userInfoRepository.findById(1L)).thenReturn(Optional.of(existingInfo));
        when(userInfoRepository.save(existingInfo)).thenAnswer(i -> i.getArguments()[0]);

        UserInfo result = userInfoService.updateUserInfo(updatedInfo);

        assertEquals("FirstName", result.getFirstName()); // Previous value maintained
        assertEquals("NewLastName", result.getLastName());
        assertEquals("Male", result.getGender()); // Previous value maintained

        verify(userInfoRepository, times(1)).findById(1L);
        verify(userInfoRepository, times(1)).save(existingInfo);
    }

    @Test
    public void testUpdateGender() {
        UserInfo existingInfo = new UserInfo();
        existingInfo.setUserInfoId(1L);
        existingInfo.setFirstName("FirstName");
        existingInfo.setLastName("LastName");
        existingInfo.setGender("OldGender");

        UserInfo updatedInfo = new UserInfo();
        updatedInfo.setUserInfoId(1L);
        updatedInfo.setGender("NewGender");

        when(userInfoRepository.findById(1L)).thenReturn(Optional.of(existingInfo));
        when(userInfoRepository.save(existingInfo)).thenAnswer(i -> i.getArguments()[0]);

        UserInfo result = userInfoService.updateUserInfo(updatedInfo);

        assertEquals("FirstName", result.getFirstName()); // Previous value maintained
        assertEquals("LastName", result.getLastName()); // Previous value maintained
        assertEquals("NewGender", result.getGender());

        verify(userInfoRepository, times(1)).findById(1L);
        verify(userInfoRepository, times(1)).save(existingInfo);
    }

    @Test
    public void getUserInfo() {
        UserInfo userInfo = new UserInfo();
        userInfo.setUserInfoId(1L);
        userInfo.setFirstName("FirstName");
        userInfo.setLastName("LastName");
        userInfo.setGender("Male");

        when(userInfoRepository.findById(1L)).thenReturn(Optional.of(userInfo));

        UserInfo result = userInfoService.getUserInfo(1L);

        assertEquals("FirstName", result.getFirstName());
        assertEquals("LastName", result.getLastName());
        assertEquals("Male", result.getGender());

        verify(userInfoRepository, times(1)).findById(1L);
    }

}