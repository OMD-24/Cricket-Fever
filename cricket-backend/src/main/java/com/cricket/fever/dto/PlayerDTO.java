package com.cricket.fever.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PlayerDTO {

    private Long id;

    @NotBlank(message = "Player name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Jersey number is required")
    @Pattern(regexp = "\\d+", message = "Jersey number must be numeric")
    private String jerseyNo;

    @NotBlank(message = "Team color is required")
    private String teamColor;

    @NotBlank(message = "Role is required")
    private String role;
}