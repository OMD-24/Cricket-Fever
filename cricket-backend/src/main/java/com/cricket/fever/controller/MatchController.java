package com.cricket.fever.controller;

import com.cricket.fever.common.response.ApiResponse;
import com.cricket.fever.dto.MatchDTO;
import com.cricket.fever.dto.TeamDTO;
import com.cricket.fever.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:5173")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/{filter}")
    public ResponseEntity<ApiResponse<List<MatchDTO>>> getMatches(@PathVariable String filter) {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Matches fetched successfully", matchService.getMatches(filter))
        );
    }

    @GetMapping("/standings")
    public ResponseEntity<ApiResponse<List<TeamDTO>>> getStandings() {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Standings fetched successfully", matchService.getStandings())
        );
    }
}