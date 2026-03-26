package com.cricket.fever.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Jersey number required")
    private String jerseyNo;

    @NotBlank(message = "Team color required")
    private String teamColor;

    @NotBlank(message = "Role required")
    private String role;

    @Email(message = "Email must be valid")
    @NotBlank(message = "Email required")
    private String email;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}