package dev.michaelcao512.socialmedia.Entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PreUpdate;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Data
public class Account implements UserDetails {
    //@Transient
    //Logger logger = LoggerFactory.getLogger(Account.class);
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;

    @Column(updatable = false)
    private LocalDateTime dateCreated = LocalDateTime.now();
    private LocalDateTime dateUpdated = LocalDateTime.now();

    @Column(nullable = false)
    private boolean emailVerified = false;

    @Column(unique = true)
    private String verificationToken;


    private LocalDateTime tokenExpiration; 
    
  
    @Column()
    private Collection<? extends GrantedAuthority> authorities = List.of(); // Initialize with an empty list

    /*
     * @Column()
     * private Collection<? extends GrantedAuthority> authorities;
     */
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "userinfo")
    private UserInfo userInfo;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "following")
    private List<Friendship> following;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "followers")
    private List<Friendship> followers;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "account-posts")
    private List<Post> posts;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "account-comments")
    private List<Comment> comments;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "account-reactions")
    private List<Reaction> reactions;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "account-images")
    private List<Image> images;


    @PreUpdate
    public void onUpdate() {
        this.dateUpdated = LocalDateTime.now();
    }



    @Override
public String toString() {
    return "Account{" +
            "accountId=" + accountId +
            ", username='" + username + '\'' +
            ", email='" + email + '\'' +
            ", emailVerified=" + emailVerified +
            ", verificationToken='" + verificationToken + '\'' +
            ", tokenExpiration=" + tokenExpiration +
            ", dateCreated=" + dateCreated +
            ", dateUpdated=" + dateUpdated +
            '}';
}


   

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return emailVerified;
    }
}
