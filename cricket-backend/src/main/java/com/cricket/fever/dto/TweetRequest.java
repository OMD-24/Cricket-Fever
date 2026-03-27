package com.cricket.fever.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TweetRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Jersey number is required")
    private String jerseyNo;

    @NotBlank(message = "Team color is required")
    private String teamColor;

    @NotBlank(message = "Text cannot be empty")
    @Size(max = 280, message = "Tweet cannot exceed 280 characters")
    private String text;
}