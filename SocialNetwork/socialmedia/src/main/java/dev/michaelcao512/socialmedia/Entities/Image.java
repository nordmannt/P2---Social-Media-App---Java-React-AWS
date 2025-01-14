package dev.michaelcao512.socialmedia.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    private String fileName;
    private String eTag;
    private String bucketKey;

    @ManyToOne
    @JoinColumn(name = "accountId")
    @JsonBackReference(value = "account-images")
    private Account account;

    @ManyToOne // (cascade = CascadeType.ALL)
    @JoinColumn(name = "postId")
    @JsonBackReference(value = "post-images")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "commentId")
    @JsonBackReference(value = "comment-images")
    private Comment comment;

    @OneToOne
    @JoinColumn(name = "userInfoId")
    @JsonBackReference(value = "profileImage")
    private UserInfo userInfo;

    @Enumerated(EnumType.STRING)
    private ImageType imageType;

    public enum ImageType {
        PROFILE, POST, COMMENT
    }

    @Override
    public String toString() {
        return "Image{" +
                "imageId=" + imageId +
                ", fileName='" + fileName + '\'' +
                ", eTag='" + eTag + '\'' +
                ", bucketKey='" + bucketKey + '\'' +
                ", imageType=" + imageType +
                '}';
    }
}
