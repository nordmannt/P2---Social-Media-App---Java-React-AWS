package dev.michaelcao512.socialmedia.Exceptions;

public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException() {
        super("Username already exists");
    }
}