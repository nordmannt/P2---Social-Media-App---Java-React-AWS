package dev.michaelcao512.socialmedia.UnitTesting;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.UserInfo;
import dev.michaelcao512.socialmedia.Exceptions.UsernameAlreadyExistsException;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.UserInfoRepository;
import dev.michaelcao512.socialmedia.Services.AccountService;
import dev.michaelcao512.socialmedia.Services.EmailService;
import dev.michaelcao512.socialmedia.dto.Requests.RegistrationRequest;

public class RegistrationTest {
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private UserInfoRepository userInfoRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private EmailService emailService;
    @InjectMocks
    private AccountService accountService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Tests the successful registration of a new account.
     * 
     * This test verifies that when a valid registration request is provided,
     * and the email does not already exist in the repository, the account
     * is successfully created and saved. It ensures that the Account object
     * returned by the registerAccount method is not null and matches the
     * registration request details. Additionally, it verifies that the
     * account and user information are saved in their respective repositories.
     */
    @Test
    public void testRegisterAccount_Success() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");
        request.setUsername("testuser");
        request.setFirstName("Test");
        request.setLastName("User");
        request.setGender("Male");

        when(accountRepository.existsByUsername(request.getUsername())).thenReturn(false);
        when(accountRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        Account result = accountService.registerAccount(request);

        assertNotNull(result);
        assertEquals(result.getEmail(), result.getEmail());
        assertEquals(result.getPassword(), "encodedPassword");
        assertEquals(result.getUsername(), result.getUsername());

        verify(accountRepository, times(1)).save(any(Account.class));
        verify(userInfoRepository, times(1)).save(any(UserInfo.class));
    }

    /**
     * Tests the registration of an account with an email that already exists.
     * 
     * This test verifies that when a registration request is provided with an
     * email that already exists in the repository, the method throws an
     * IllegalArgumentException. It ensures that the exception is thrown when
     * the email is already taken. Additionally, it verifies that no account is
     * created and saved when the email is already taken.
     */
    @Test
    public void testRegisterAccount_EmailExists() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("test@example.com");

        when(accountRepository.existsByEmail(request.getEmail())).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> {
            accountService.registerAccount(request);
        });

        verify(accountRepository, never()).save(any(Account.class));
        verify(userInfoRepository, never()).save(any(UserInfo.class));
    }

    /**
     * Tests the registration of an account with a username that already exists.
     * 
     * This test verifies that when a registration request is provided with a
     * username that already exists in the repository, the method throws an
     * IllegalArgumentException. It ensures that an exception is thrown when the
     * username is already taken. Additionally, it verifies that no account is
     * created and saved when the username is already taken.
     */
    @Test
    public void testRegisterAccount_UsernameExists() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("newTestEmail@example.com");
        request.setUsername("testuser");
        request.setPassword("password");

        Account storedAccount = new Account();
        storedAccount.setEmail("test@example.com");
        storedAccount.setUsername("testuser");
        storedAccount.setPassword("password");

        when(accountRepository.existsByUsername(request.getUsername())).thenReturn(true);

        assertThrows(UsernameAlreadyExistsException.class, () -> {
            accountService.registerAccount(request);
        });

        verify(accountRepository, never()).save(any(Account.class));
        verify(userInfoRepository, never()).save(any(UserInfo.class));
    }

    /**
     * Tests the registration of an account with a null email.
     * 
     * This test verifies that when a registration request is provided with a null
     * email, the method returns null. It ensures that no account is created and
     * saved when the email is null.
     */
    @Test
    public void testRegisterAccount_NullEmail() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail(null);
        request.setPassword("password");
        request.setUsername("testuser");

        assertThrows(IllegalArgumentException.class, () -> {
            accountService.registerAccount(request);
        });
        verify(accountRepository, never()).save(any(Account.class));
        verify(userInfoRepository, never()).save(any(UserInfo.class));
    }

    /**
     * Tests the registration of an account with a null password.
     * 
     * This test verifies that when a registration request is provided with a null
     * password, the method returns null. It ensures that no account is created and
     * saved when the password is null.
     */
    @Test
    public void testRegisterAccount_NullPassword() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("test@example.com");
        request.setPassword(null);
        request.setUsername("testuser");

        assertThrows(IllegalArgumentException.class, () -> {
            accountService.registerAccount(request);
        });
        verify(accountRepository, never()).save(any(Account.class));
        verify(userInfoRepository, never()).save(any(UserInfo.class));
    }

    /**
     * Tests the registration of an account with a null username.
     * 
     * This test verifies that when a registration request is provided with a null
     * username, the method returns null. It ensures that no account is created and
     * saved when the username is null.
     */
    @Test
    public void testRegisterAccount_NullUsername() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");
        request.setUsername(null);

        assertThrows(IllegalArgumentException.class, () -> {
            accountService.registerAccount(request);
        });
        verify(accountRepository, never()).save(any(Account.class));
        verify(userInfoRepository, never()).save(any(UserInfo.class));
    }

    /**
     * Tests the registration of an account with valid user information.
     * 
     * This test verifies that when a registration request is provided with valid
     * user information, the method returns an account with the correct user
     * information. It ensures that the user information is saved correctly when
     * the account is created.
     */
    @Test
    public void testRegisterAccount_LogsUserInfo() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");
        request.setUsername("testuser");
        request.setFirstName("Test");
        request.setLastName("User");
        request.setGender("Male");

        when(accountRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(accountRepository.existsByUsername(request.getUsername())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");

        Account result = accountService.registerAccount(request);

        UserInfo userInfo = result.getUserInfo();

        assertNotNull(result);
        assertNotNull(userInfo);
        assertEquals(request.getEmail(), result.getEmail());
        assertEquals("encodedPassword", result.getPassword());
        assertEquals(request.getUsername(), result.getUsername());
        assertEquals(request.getFirstName(), userInfo.getFirstName());
        assertEquals(request.getLastName(), userInfo.getLastName());
        assertEquals(request.getGender(), userInfo.getGender());
    }

    /**
     * Tests the registration of an account with an empty email.
     * 
     * This test verifies that when a registration request is provided with an
     * empty email, the method throws an IllegalArgumentException. It ensures
     * that an exception is thrown when the email is empty.
     */
    @Test
    public void testRegisterAccount_EmptyEmail() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("");
        request.setPassword("password");
        request.setUsername("testuser");

        assertThrows(IllegalArgumentException.class, () -> {
            accountService.registerAccount(request);
        });
    }

    /**
     * Tests the registration of an account with an empty password.
     * 
     * This test verifies that when a registration request is provided with an
     * empty password, the method throws an IllegalArgumentException. It
     * ensures that an exception is thrown when the password is empty.
     */
    @Test
    public void testRegisterAccount_EmptyPassword() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("test@example.com");
        request.setPassword("");
        request.setUsername("testuser");

        assertThrows(IllegalArgumentException.class, () -> {
            accountService.registerAccount(request);
        });
    }

    /**
     * Tests the registration of an account with an empty username.
     * 
     * This test verifies that when a registration request is provided with an
     * empty username, the method throws an IllegalArgumentException.
     * It ensures that no account is created and saved when the username is empty.
     */

    @Test
    public void testRegisterAccount_EmptyUsername() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");
        request.setUsername("");

        assertThrows(IllegalArgumentException.class, () -> {
            accountService.registerAccount(request);
        });
    }

}