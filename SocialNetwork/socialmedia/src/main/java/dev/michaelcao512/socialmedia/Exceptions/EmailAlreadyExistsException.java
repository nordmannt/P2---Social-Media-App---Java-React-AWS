package dev.michaelcao512.socialmedia.Exceptions;

public class EmailAlreadyExistsException extends RuntimeException{
    public EmailAlreadyExistsException() {
        super("Email already exists");
    }
}