package dev.michaelcao512.socialmedia.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userInfoId;

    @OneToOne
    @JoinColumn(name = "accountId", nullable = false)
    @JsonBackReference(value = "userinfo")
    private Account account;

    private String firstName;
    private String lastName;
    private String biography;
    private String gender;
    @Column(columnDefinition = "TEXT")
    private String avatarUrl;

    @OneToOne(mappedBy = "userInfo", cascade = CascadeType.ALL, orphanRemoval = false)
    @JsonManagedReference(value = "profileImage")
    private Image profileImage;

    @Override
    public String toString() {
        return "UserInfo{" +
                "userInfoId=" + userInfoId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", biography='" + biography + '\'' +
                ", gender='" + gender + '\'' +
                ", avatarUrl='" + avatarUrl + '\'' +
                '}';
    }

}
