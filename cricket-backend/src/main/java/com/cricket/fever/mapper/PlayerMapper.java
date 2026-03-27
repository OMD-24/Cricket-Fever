package com.cricket.fever.mapper;

import com.cricket.fever.Entity.Player;
import com.cricket.fever.dto.PlayerDTO;
import org.springframework.stereotype.Component;

@Component
public class PlayerMapper {

    public PlayerDTO toDTO(Player player) {

        return new PlayerDTO(
                player.getId(),
                player.getName(),
                player.getJerseyNo(),
                player.getTeamColor(),
                player.getRole()
        );
    }
}