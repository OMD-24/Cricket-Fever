package com.cricket.fever.controller;

import com.cricket.fever.Entity.Player;
import com.cricket.fever.dto.PlayerDTO;
import com.cricket.fever.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {

    @Autowired
    PlayerService playerService;
    @PostMapping("/update")
    public ResponseEntity<PlayerDTO> updatePlayer(@RequestBody PlayerDTO playerDto) {
        PlayerDTO updatedDto = playerService.updateProfile(playerDto);

        return ResponseEntity.ok(updatedDto);
    }


    @GetMapping("/{id}")
    public Player getPlayer(@PathVariable Long id){
        return playerService.getPlayer(id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<PlayerDTO>> searchPlayers(@RequestParam String q){
        return ResponseEntity.ok(playerService.searchByJersey(q));
    }


    @PostMapping("/register")
    public ResponseEntity<PlayerDTO> register(@RequestBody Player player) {
        return ResponseEntity.ok(playerService.registerPlayer(player));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");
            PlayerDTO authenticatedPlayer = playerService.loginPlayer(email, password);
            return ResponseEntity.ok(authenticatedPlayer);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
