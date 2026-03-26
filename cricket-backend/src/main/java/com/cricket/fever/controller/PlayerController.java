package com.cricket.fever.controller;

import com.cricket.fever.Entity.Player;
import com.cricket.fever.common.response.ApiResponse;
import com.cricket.fever.dto.LoginRequest;
import com.cricket.fever.dto.PlayerDTO;
import com.cricket.fever.dto.RegisterRequest;
import com.cricket.fever.service.PlayerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {

    @Autowired
    PlayerService playerService;

    @PostMapping("/update")
    public ApiResponse<PlayerDTO> updatePlayer(@Valid @RequestBody PlayerDTO playerDto) {
        return new ApiResponse<>(
                true,
                "Profile updated successfully",
                playerService.updateProfile(playerDto)
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<PlayerDTO> getPlayer(@PathVariable Long id) {
        return new ApiResponse<>(
                true,
                "Player fetched successfully",
                playerService.getPlayer(id)
        );
    }

    @GetMapping("/search")
    public ApiResponse<List<PlayerDTO>> searchPlayers(@RequestParam String q) {
        return new ApiResponse<>(
                true,
                "Search completed",
                playerService.searchByJersey(q)
        );
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<PlayerDTO>> register(
            @Valid @RequestBody RegisterRequest request) {

        PlayerDTO player = playerService.registerPlayer(request);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Player registered successfully", player)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<PlayerDTO>> login(
            @Valid @RequestBody LoginRequest request) {

        PlayerDTO player =
                playerService.loginPlayer(request.getEmail(), request.getPassword());

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Login successful", player)
        );
    }
}