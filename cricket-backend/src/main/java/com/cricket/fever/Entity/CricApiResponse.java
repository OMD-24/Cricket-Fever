package com.cricket.fever.Entity;

import lombok.Data;

import java.util.List;


@Data
public class CricApiResponse {
    private String status;
    private List<MatchData> data;
}

@Data
class MatchData {
    private String id;
    private String name;
    private String status;
    private String t1;  // Team 1
    private String t2;  // Team 2
    private String t1s; // Team 1 Score
    private String t2s; // Team 2 Score
}