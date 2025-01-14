package dev.michaelcao512.socialmedia.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendshipId;

    @ManyToOne
    @JoinColumn(name = "accountId")
    @JsonBackReference (value = "following")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "friendId")
    @JsonBackReference (value = "followers")
    private Account friend;

}