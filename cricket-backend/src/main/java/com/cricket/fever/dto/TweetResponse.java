package com.cricket.fever.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class TweetResponse {

    private Long id;
    private String name;
    private String jerseyNo;
    private String teamColor;
    private String text;
    private Integer cheers;
    private LocalDateTime createdAt;
}