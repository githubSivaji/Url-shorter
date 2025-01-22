package com.url.shorter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.url.shorter.dtos.LoginRequest;
import com.url.shorter.dtos.RegisterRequest;
import com.url.shorter.models.User;
import com.url.shorter.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/greet")
	public String greet()
	{
		return "hello from backend";
	}
	
	@PostMapping("/postgreet")
	public String greet2()
	{
		return "hello from backend";
	}
	 @PostMapping("/public/login")
	 public ResponseEntity<?> LoginUser(@RequestBody LoginRequest loginRequest)
	 {
		  return ResponseEntity.ok(userService.authenticateUser(loginRequest)); 
	 }
	
	 @PostMapping("/public/register")
	    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
	        User user = new User();
	        user.setUsername(registerRequest.getUsername());
	        user.setPassword(registerRequest.getPassword());
	        user.setEmail(registerRequest.getEmail());
	        user.setRole("ROLE_USER");
	        userService.registerUser(user);
	        return ResponseEntity.ok("User registered successfully");
	    }
  
	  
}
