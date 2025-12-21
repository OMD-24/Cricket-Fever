package com.cricket.fever.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TeamDTO {
    private String name;
    private int played;
    private int points;
}