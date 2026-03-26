package com.cricket.fever.controller;

import com.cricket.fever.Entity.Player;
import com.cricket.fever.common.response.ApiResponse;
import com.cricket.fever.dto.PlayerDTO;
import com.cricket.fever.service.PlayerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ApiResponse<PlayerDTO> register(@RequestBody Player player) {
        return new ApiResponse<>(
                true,
                "Player registered successfully",
                playerService.registerPlayer(player)
        );
    }

    @PostMapping("/login")
    public ApiResponse<PlayerDTO> login(@RequestBody Map<String, String> credentials) {

        PlayerDTO authenticatedPlayer =
                playerService.loginPlayer(
                        credentials.get("email"),
                        credentials.get("password")
                );

        return new ApiResponse<>(
                true,
                "Login successful",
                authenticatedPlayer
        );
    }
}