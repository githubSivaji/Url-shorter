package com.url.shorter.dtos;

import java.time.LocalDate;

import lombok.Data;

@Data 
public class ClickEventDTO {
 
	private LocalDate createDate;
	private Long count;
}
