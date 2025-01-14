package dev.michaelcao512.socialmedia.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;
import jakarta.mail.*;
import jakarta.mail.internet.*;
import org.springframework.beans.factory.annotation.Value;



import org.springframework.mail.javamail.MimeMessageHelper;


@Service
public class EmailService {
    @Value("${spring.mail.from}")
    private String fromEmailAddress;

    @Autowired
    private JavaMailSender mailSender; // Spring Boot will inject this automatically

    public void sendVerificationEmail(String toEmail, String verificationUrl) {
        try {
            // Create a MimeMessage using JavaMailSender
            MimeMessage message = mailSender.createMimeMessage();

            // Use MimeMessageHelper to simplify working with MimeMessage
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setFrom(fromEmailAddress);
            helper.setSubject("Verify Your Email Address");

            // HTML Email Content
            String htmlContent = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; background-color: #f4f8fc; padding: 20px; }" +
                ".email-container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }" +
                ".email-header { text-align: center; }" +
                ".email-header h1 { font-size: 36px; font-family: 'Roboto', sans-serif; font-weight: bold; color: #334E71; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); margin-bottom: 10px; }" +
                ".email-body { text-align: center; color: #34495e; }" +
                ".cta-button { display: inline-block; padding: 10px 25px; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #1C4260; text-decoration: none; border-radius: 25px; }" +
                ".cta-button:hover { background-color: #2c3e50; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='email-container'>" +
                "<div class='email-header'>" +
                "<h1>Connect.</h1>" +
                "<h2>Confirm Your Email Address</h2>" +
                "</div>" +
                "<div class='email-body'>" +
                "<p>Thank you for registering with Connect.!</p>" +
                "<p>Please click the button below to verify your account within 4 hours:</p>" +
                "<a href='" + verificationUrl + "' class='cta-button'>Verify Email</a>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";

            helper.setText(htmlContent, true); // Set as HTML content

            // Send the email
            mailSender.send(message);
            System.out.println("Verification email sent to " + toEmail);
        } catch (MessagingException e) {
            System.err.println("Failed to send verification email to " + toEmail + ": " + e.getMessage());
            throw new RuntimeException("Email sending failed", e);
        }
    }
}

