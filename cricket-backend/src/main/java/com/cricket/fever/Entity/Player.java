package com.cricket.fever.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.util.*;

@Entity
@Data
@Table(name = "players")
public class Player{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("name")
    private String name;
    @JsonProperty("jerseyNo")
    private String jerseyNo;
    @JsonProperty("teamColor")
    private String teamColor;
    @JsonProperty("role")
    private String role;

    @Column(unique = true)
    private String email;
    private String password;

    public Long getId() {
        return id;
    }
}
