package com.cricket.fever.repository;

import com.cricket.fever.Entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Query("SELECT p FROM Player p WHERE p.jerseyNo = :jerseyNo")
    List<Player> findByJerseyNo(@Param("jerseyNo") String jerseyNo);

    List<Player> findByJerseyNoContainingIgnoreCase(String jerseyNo);

    Optional<Player> findByEmail(String email);
}