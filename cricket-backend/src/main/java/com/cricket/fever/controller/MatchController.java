package com.cricket.fever.controller;


import com.cricket.fever.dto.TeamDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cricket.fever.dto.MatchDTO;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:5173")
public class MatchController {

    @GetMapping("/{filter}")
    public ResponseEntity<List<MatchDTO>> getMatches(@PathVariable String filter) {

        List<MatchDTO> mockMatches = Arrays.asList(
                new MatchDTO("India", "Australia", "352/5", "120/2", "India won by 132 runs"),
                new MatchDTO("England", "Pakistan", "280/10", "150/4", "Pakistan needs 131 runs"),
                new MatchDTO("South Africa", "New Zealand", "190/3", "Yet to bat", "Match delayed by rain")
        );
        return ResponseEntity.ok(mockMatches);
    }

    @GetMapping("/standings")
    public ResponseEntity<List<TeamDTO>> getStandings() {

        List<TeamDTO> mockStandings = Arrays.asList(
                new TeamDTO("IND", 5, 10),
                new TeamDTO("AUS", 5, 8),
                new TeamDTO("SA", 5, 6),
                new TeamDTO("ENG", 5, 4)
        );
        return ResponseEntity.ok(mockStandings);
    }
}