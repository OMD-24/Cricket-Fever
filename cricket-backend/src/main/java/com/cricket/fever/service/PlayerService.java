package com.cricket.fever.service;

import com.cricket.fever.Entity.Player;
import com.cricket.fever.dto.PlayerDTO;
import com.cricket.fever.dto.RegisterRequest;
import com.cricket.fever.exception.DuplicatePlayerException;
import com.cricket.fever.exception.InvalidCredentialsException;
import com.cricket.fever.exception.PlayerNotFoundException;
import com.cricket.fever.repository.PlayerRepository;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Transactional
    public PlayerDTO updateProfile(PlayerDTO dto) {

        Player entity = playerRepository.findById(dto.getId())
                .orElseThrow(() ->
                        new PlayerNotFoundException("Player not found with ID: " + dto.getId()));

        entity.setName(dto.getName());
        entity.setJerseyNo(dto.getJerseyNo());
        entity.setTeamColor(dto.getTeamColor());
        entity.setRole(dto.getRole());

        Player savedEntity = playerRepository.save(entity);


        return convertToDto(savedEntity);
    }


    public PlayerDTO getPlayer(Long id) {
        Player player = playerRepository.findById(id)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found with id: " + id));
        return convertToDto(player);
    }

    private PlayerDTO convertToDto(Player player) {
        PlayerDTO dto = new PlayerDTO();
        dto.setId(player.getId());
        dto.setName(player.getName());
        dto.setJerseyNo(player.getJerseyNo());
        dto.setTeamColor(player.getTeamColor());
        dto.setRole(player.getRole());
        return dto;
    }




    public @Nullable List<PlayerDTO> searchByJersey(String query) {

        List<Player> players = playerRepository.findByJerseyNo(query);


        return players.stream().map(player -> {
            PlayerDTO dto = new PlayerDTO();
            dto.setId(player.getId());
            dto.setName(player.getName());
            dto.setJerseyNo(player.getJerseyNo());
            dto.setTeamColor(player.getTeamColor());
            dto.setRole(player.getRole());
            return dto;
        }).collect(Collectors.toList());
    }

    public PlayerDTO registerPlayer(RegisterRequest request) {

        if (playerRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicatePlayerException("Player with this email already exists");
        }

        Player player = new Player();
        player.setName(request.getName());
        player.setJerseyNo(request.getJerseyNo());
        player.setTeamColor(request.getTeamColor());
        player.setRole(request.getRole());
        player.setEmail(request.getEmail());
        player.setPassword(request.getPassword());

        Player saved = playerRepository.save(player);

        return convertToDto(saved);
    }


    public PlayerDTO loginPlayer(String email, String password) {

        Player player = playerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid email or password")
                );

        if (!player.getPassword().equals(password)) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return convertToDto(player);
    }
}