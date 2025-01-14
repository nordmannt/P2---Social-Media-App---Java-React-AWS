
package dev.michaelcao512.socialmedia.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({ EmailAlreadyExistsException.class, UsernameAlreadyExistsException.class })
    public ResponseEntity<String> handleExistsExceptions(Exception e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
    @ExceptionHandler({ InvalidCredentialsException.class })
    public ResponseEntity<String> handleInvalidCredentialsException(Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler({ IllegalArgumentException.class })
    public ResponseEntity<String> handleIllegalArgumentExceptions(Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

}