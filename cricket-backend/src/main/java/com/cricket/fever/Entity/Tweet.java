package com.cricket.fever.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "tweets")
public class Tweet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String jerseyNo;
    private String teamColor;

    @Column(length = 280)
    private String text;
    private String cheers = "0";
    private LocalDateTime createdAt = LocalDateTime.now();
}