package com.cricket.fever.service;

import com.cricket.fever.Entity.Player;
import com.cricket.fever.dto.PlayerDTO;
import com.cricket.fever.dto.RegisterRequest;
import com.cricket.fever.exception.DuplicatePlayerException;
import com.cricket.fever.exception.InvalidCredentialsException;
import com.cricket.fever.exception.PlayerNotFoundException;
import com.cricket.fever.mapper.PlayerMapper;
import com.cricket.fever.repository.PlayerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final PlayerMapper playerMapper;
    private final PasswordEncoder passwordEncoder;

    public PlayerService(PlayerRepository playerRepository,
                         PlayerMapper playerMapper,
                         PasswordEncoder passwordEncoder) {
        this.playerRepository = playerRepository;
        this.playerMapper = playerMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public PlayerDTO registerPlayer(RegisterRequest request) {

        if (playerRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicatePlayerException(
                    "A player with email '" + request.getEmail() + "' already exists"
            );
        }

        Player player = new Player();
        player.setName(request.getName());
        player.setEmail(request.getEmail());
        // BCrypt encode — safe because @NotBlank ensures password is never null
        player.setPassword(passwordEncoder.encode(request.getPassword()));
        player.setJerseyNo(request.getJerseyNo());
        player.setTeamColor(request.getTeamColor());
        // Default to PLAYER if client doesn't send a role
        player.setRole(request.getRole() != null ? request.getRole() : "PLAYER");

        Player saved = playerRepository.save(player);
        return playerMapper.toDTO(saved);
    }

    @Transactional(readOnly = true)
    public PlayerDTO loginPlayer(String email, String password) {

        Player player = playerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid email or password"));

        // BCrypt comparison — never compare plain text
        if (!passwordEncoder.matches(password, player.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return playerMapper.toDTO(player);
    }

    @Transactional(readOnly = true)
    public PlayerDTO getPlayer(Long id) {

        Player player = playerRepository.findById(id)
                .orElseThrow(() ->
                        new PlayerNotFoundException("Player not found with id: " + id));

        return playerMapper.toDTO(player);
    }

    @Transactional
    public PlayerDTO updateProfile(PlayerDTO dto) {

        Player player = playerRepository.findById(dto.getId())
                .orElseThrow(() ->
                        new PlayerNotFoundException("Player not found with id: " + dto.getId()));

        player.setName(dto.getName());
        player.setJerseyNo(dto.getJerseyNo());
        player.setTeamColor(dto.getTeamColor());
        // Role is not editable via profile update for security reasons

        Player updated = playerRepository.save(player);
        return playerMapper.toDTO(updated);
    }


    @Transactional(readOnly = true)
    public List<PlayerDTO> searchByJersey(String query) {
        return playerRepository
                .findByJerseyNoContainingIgnoreCase(query)
                .stream()
                .map(playerMapper::toDTO)
                .collect(Collectors.toList());
    }
}