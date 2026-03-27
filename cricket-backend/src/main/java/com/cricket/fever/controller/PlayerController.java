package com.cricket.fever.controller;

import com.cricket.fever.common.response.ApiResponse;
import com.cricket.fever.dto.LoginRequest;
import com.cricket.fever.dto.PlayerDTO;
import com.cricket.fever.dto.RegisterRequest;
import com.cricket.fever.service.PlayerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<PlayerDTO>> register(
            @Valid @RequestBody RegisterRequest request) {

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Player registered successfully",
                        playerService.registerPlayer(request))
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<PlayerDTO>> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Login successful",
                        playerService.loginPlayer(request.getEmail(), request.getPassword()))
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PlayerDTO>> getPlayer(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Player fetched successfully",
                        playerService.getPlayer(id))
        );
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse<PlayerDTO>> updatePlayer(
            @Valid @RequestBody PlayerDTO dto) {

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Profile updated successfully",
                        playerService.updateProfile(dto))
        );
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<PlayerDTO>>> searchPlayers(
            @RequestParam String q) {

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Search completed",
                        playerService.searchByJersey(q))
        );
    }
}