package com.cricket.fever.repository;

import com.cricket.fever.Entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByJerseyNo(String jerseyNo);

    Optional<Player> findByEmail(String email);
}
