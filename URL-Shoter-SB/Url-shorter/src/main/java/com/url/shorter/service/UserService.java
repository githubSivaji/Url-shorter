package com.url.shorter.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.url.shorter.dtos.LoginRequest;
import com.url.shorter.models.User;
import com.url.shorter.repository.UserRepository;
import com.url.shorter.security.jwt.JwtAuthenticationResponse;
import com.url.shorter.security.jwt.JwtUtils;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
	
	 private PasswordEncoder passwordEncoder;
	 private JwtUtils jwtUtils;
	  
	 @Autowired 
	 private UserRepository userRepository;
	 
	 private AuthenticationManager authenticationManager;
	
	public User registerUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
	
	public JwtAuthenticationResponse  authenticateUser(LoginRequest loginRequest){
		Authentication authentication=authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
				);
		SecurityContextHolder.getContext().setAuthentication(authentication);
       UserDetailsImpl userDetails=(UserDetailsImpl)authentication.getPrincipal();
       String Jwt=jwtUtils.generateToken(userDetails);
        return new JwtAuthenticationResponse(Jwt) ;
    } 
     

    public User findByUsername(String name) {
        return userRepository.findByUsername(name)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + name));
    }
	
}
