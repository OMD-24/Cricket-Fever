package com.cricket.fever.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:5173")
public class NewsController {

    @GetMapping("/latest")
    public List<Map<String, String>> getLatestNews() {
        return Arrays.asList(
                Map.of(
                        "category", "Breaking",
                        "title", "Champions Trophy: High-voltage final scheduled for Sunday",
                        "description", "The stage is set for the ultimate rivalry as both teams clear fitness tests.",
                        "time", "10 Mins Read"
                ),
                Map.of(
                        "category", "Match Analysis",
                        "title", "Tactical shift: Why spinners will dominate in Chennai",
                        "description", "As the pitch wears down, experts believe the dry surface will play into the hands of spinners.",
                        "time", "5 Mins Read"
                )
        );
    }
}