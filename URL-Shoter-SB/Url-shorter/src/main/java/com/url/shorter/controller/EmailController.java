package com.url.shorter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.url.shorter.dtos.EmailDTO;
import com.url.shorter.service.EmailService;

@RestController
@RequestMapping("/accounts")
public class EmailController {
	@Autowired
	EmailService emailService ;
       
	@PostMapping("/forgot")
	public ResponseEntity<String> forgot_password(@RequestBody EmailDTO emailDTO)
	{
		try {
		emailService.sendMessage(emailDTO);
		return ResponseEntity.ok("mail generated check");
		}
		catch(Exception e)
		{
			return ResponseEntity.internalServerError().body(e.getMessage());
		}
	}
}
