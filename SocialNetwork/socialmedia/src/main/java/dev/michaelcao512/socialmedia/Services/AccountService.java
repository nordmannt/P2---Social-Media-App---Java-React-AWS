package dev.michaelcao512.socialmedia.Services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import dev.michaelcao512.socialmedia.Utilities.TokenGenerator;
import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.UserInfo;
import dev.michaelcao512.socialmedia.Exceptions.EmailAlreadyExistsException;
import dev.michaelcao512.socialmedia.Exceptions.InvalidCredentialsException;
import dev.michaelcao512.socialmedia.Exceptions.UsernameAlreadyExistsException;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.UserInfoRepository;
import dev.michaelcao512.socialmedia.dto.Requests.RegistrationRequest;
import org.springframework.beans.factory.annotation.Value;


@Service
public class AccountService implements UserDetailsService {
    @Value("${verification.url.base}")
    private String verificationBaseUrl;
    Logger logger = LoggerFactory.getLogger(AccountService.class);
    private final AccountRepository accountRepository;
    private final UserInfoRepository userInfoRepository;
    private final PasswordEncoder passwordEncoder;
    // new emailService class
    private final EmailService emailService;

    public AccountService(AccountRepository accountRepository, UserInfoRepository userInfoRepository,
            EmailService emailService, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.userInfoRepository = userInfoRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }
   
    public Account registerAccount(RegistrationRequest registrationRequest) {
        Logger logger = LoggerFactory.getLogger(AccountService.class);

        String email = registrationRequest.getEmail();
        String password = registrationRequest.getPassword();
        String username = registrationRequest.getUsername();
        String firstName = registrationRequest.getFirstName();
        String lastName = registrationRequest.getLastName();
        String gender = registrationRequest.getGender();
        // checking for non null required fields

        if (email == null || password == null || username == null) {
            throw new IllegalArgumentException("Email, password, and username must be provided.");
        }

        // checking for empty required fields
        if (email.trim().isEmpty() || password.trim().isEmpty() || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Email, password, and username must be provided.");
        }

        // ensuring no whitespace exists in any field
        if (email.contains(" ") || password.contains(" ") || username.contains(" ")) {
            throw new IllegalArgumentException("Email, password, and username cannot contain whitespace.");
        }

        // checking if email or username already exists
        if (accountRepository.existsByUsername(username)) {
            throw new UsernameAlreadyExistsException();
        }
        if (accountRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException();
        }

       
        password = passwordEncoder.encode(password);

        Account newAccount = new Account();

        // generate verification token
        String token = TokenGenerator.generateToken();
        logger.info("Generated token: " + token);

        newAccount.setVerificationToken(token);
        newAccount.setTokenExpiration(LocalDateTime.now().plusHours(4));

        newAccount.setEmail(email);
        newAccount.setPassword(password);
        newAccount.setUsername(username);
        newAccount.setEmailVerified(false);

        Account savedAccount = accountRepository.save(newAccount);

        UserInfo userInfo = new UserInfo();
        userInfo.setAccount(savedAccount);
        userInfo.setFirstName(firstName);
        userInfo.setLastName(lastName);
        userInfo.setGender(gender);

        userInfoRepository.save(userInfo);

        newAccount.setUserInfo(userInfo);
        accountRepository.save(savedAccount);
        logger.info("Account registered: " + newAccount);

        String verificationUrl = verificationBaseUrl+ "?token=" + token;
        emailService.sendVerificationEmail(newAccount.getEmail(), verificationUrl);

        return newAccount;
    }

    public void verifyAccount(String token) {
        logger.info("Passed in token: " + token);
        Optional<Account> accountOptional = accountRepository.findByVerificationToken(token);
        ;

        // Check if the token exists
        if (accountOptional.isEmpty()) {
            throw new IllegalArgumentException("Invalid verification token");
        }

        Account account = accountOptional.get();
        String accountToken = account.getVerificationToken();

        // Compare token content, not references
        if (accountToken.equals(token)) {
            account.setEmailVerified(true);
            account.setVerificationToken(null); // Optional: Invalidate token after use
            accountRepository.save(account); // Persist changes
        } else {
            throw new IllegalArgumentException("Token mismatch");
        }
    }

    /**
     * Logs in an account given the provided email and password.
     *
     * @param account The account to log in.
     * @return The account if the login is successful, null if the login fails.
     * @throws InvalidCredentialsException If the username or password is incorrect
     * @throws IllegalArgumentException    If the account is null.
     */
    public Account loginAccount(Account account) {
        String password = account.getPassword();
        String username = account.getUsername();
        // checking for non null required fields
        if (username == null || password == null) {
            throw new IllegalArgumentException("Email and password must be provided.");
        }

        // checking if account exists
        Account newAccount = accountRepository.findByUsername(username);
        if (newAccount == null) {
            throw new InvalidCredentialsException("Account not found.");
        }

        password = passwordEncoder.encode(password);
        // checking if password matches
        if (!password.equals(password)) {
            throw new InvalidCredentialsException("Invalid password.");
        }

        return newAccount;
    }

    public Account getAccountByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public Account getAccountByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username);
        if (account == null) {
            throw new UsernameNotFoundException("User not found.");
        }
        return account;
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(Long accountId) {
        Optional<Account> account = accountRepository.findById(accountId);
        if (account.isEmpty()) {
            throw new IllegalArgumentException("Account doesn't exist");
        }
        return account.get();

    }

    public Account getAccountOfComment(Long commentId) {
        Optional<Account> account = accountRepository.findByCommentsCommentId(commentId);
        if (account.isEmpty()) {
            throw new IllegalArgumentException("Account does not exist");
        }
        return account.get();
    }

    public Account getAccountOfPost(Long postId) {
        Optional<Account> account = accountRepository.findAccountOfPost(postId);
        if (account.isEmpty()) {
            throw new IllegalArgumentException("Account doesn't exist");
        }
        return account.get();

    }

    public List<Account> getFollowing(Long accountId) {
        List<Account> following = accountRepository.findFollowing(accountId);
        return following;
    }

    public List<Account> getFollowers(Long accountId) {
        List<Account> followers = accountRepository.findFollowers(accountId);
        return followers;
    }

    public List<Account> searchUsers(String query) {
        return accountRepository.searchUsers(query);
    }

    public Boolean existsByEmail(String email) {
        return accountRepository.existsByEmail(email);
    }

    public Boolean existsByUsername(String username) {
        return accountRepository.existsByUsername(username);
    }

    public String getUsernameByAccountId(Long accountId) {
        return accountRepository.findUsernameByAccountId(accountId);
    }
}