package com.cricket.fever.dto;

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
    private String name;
    private String jerseyNo;
    private String teamColor;
    private String role;
}
