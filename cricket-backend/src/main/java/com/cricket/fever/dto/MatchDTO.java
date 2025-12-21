package com.cricket.fever.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MatchDTO {
    private String team1;
    private String team2;
    private String score1;
    private String score2;
    private String status;
}