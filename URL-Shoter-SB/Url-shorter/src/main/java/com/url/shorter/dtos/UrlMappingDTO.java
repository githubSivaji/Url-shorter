package com.url.shorter.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor
@NoArgsConstructor 
public class UrlMappingDTO {
	private Long id;
	private String originalUrl;
	private String shortUrl;
	private  int clickCount;
    private LocalDateTime createdDate; 
    private String username;
}
