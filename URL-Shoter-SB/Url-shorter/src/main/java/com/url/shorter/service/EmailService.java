package com.url.shorter.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.url.shorter.dtos.EmailDTO;
import com.url.shorter.exception.AccountNotFoundException;
import com.url.shorter.models.User;
import com.url.shorter.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
	
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private UserRepository userRepository;
	
	@Value("${spring.mail.username}")
	private String sendmail;
	
	public void sendMessage(EmailDTO emailDTO) throws MessagingException
	{
		MimeMessage message=javaMailSender.createMimeMessage();
		
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
	
        User  user=userRepository.findByEmail(emailDTO.getEmail()).orElseThrow(() -> new AccountNotFoundException("User not found with mail: " + emailDTO.getEmail()));
		
        
		helper.setTo(user.getEmail()); // Receiver's email
		helper.setSubject("Hello from Spring Boot!"); // Email subject
		helper.setText("This is a simple text email.", false); // Email body (false = plain text)
		helper.setFrom(sendmail);
		javaMailSender.send(message);
	}

}
