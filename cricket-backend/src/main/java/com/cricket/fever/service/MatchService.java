package com.cricket.fever.service;

import com.cricket.fever.dto.MatchDTO;
import com.cricket.fever.dto.TeamDTO;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class MatchService {

    public List<MatchDTO> getMatches(String filter) {
        return Arrays.asList(
                new MatchDTO("India", "Australia", "352/5", "120/2", "India won by 132 runs"),
                new MatchDTO("England", "Pakistan", "280/10", "150/4", "Pakistan needs 131 runs"),
                new MatchDTO("South Africa", "New Zealand", "190/3", "Yet to bat", "Match delayed by rain")
        );
    }

    public List<TeamDTO> getStandings() {
        return Arrays.asList(
                new TeamDTO("IND", 5, 10),
                new TeamDTO("AUS", 5, 8),
                new TeamDTO("SA", 5, 6),
                new TeamDTO("ENG", 5, 4)
        );
    }
}