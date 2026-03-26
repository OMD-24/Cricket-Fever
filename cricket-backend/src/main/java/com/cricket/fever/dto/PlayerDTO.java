package com.cricket.fever.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class PlayerDTO {

    private Long id;

    @NotBlank(message = "Player name is required")
    private String name;

    @NotBlank(message = "Jersey number is required")
    private String jerseyNo;

    @NotBlank(message = "Team color is required")
    private String teamColor;

    @NotBlank(message = "Role is required")
    private String role;
}
