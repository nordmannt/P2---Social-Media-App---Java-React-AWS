package dev.michaelcao512.socialmedia.Utilities;

import java.security.SecureRandom;
import java.util.Base64;



public class TokenGenerator {



    
    private static final int DEFAULT_TOKEN_LENGTH = 32;

    public static String generateToken(){
        return generateToken(DEFAULT_TOKEN_LENGTH);
    }
    

    public static String generateToken(int length){
        if(length <= 0){
            throw new IllegalArgumentException("Token length must be greater than 0.");
        }

    SecureRandom secureRandom = new SecureRandom();
    byte[] randomBytes = new byte[length];
    secureRandom.nextBytes(randomBytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);

    }

}
