package com.cricket.fever.controller;

import com.cricket.fever.Entity.Tweet;
import com.cricket.fever.common.response.ApiResponse;
import com.cricket.fever.service.TweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tweets")
@CrossOrigin(origins = "http://localhost:5173")
public class TweetController {

    @Autowired
    private TweetService tweetService;

    @PostMapping("/broadcast")
    public ApiResponse<Tweet> broadcast(@RequestBody Tweet tweet) {
        return new ApiResponse<>(true,"Broadcast created",
                tweetService.saveTweet(tweet));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Tweet>> getAll() {
        return ResponseEntity.ok(tweetService.getAllTweets());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTweet(@PathVariable Long id){
        tweetService.deleteTweet(id);
        return ResponseEntity.ok("The Tweet is deleted");
    }

    @PatchMapping("/{id}/cheer")
    public ResponseEntity<Tweet> cheerTweet(@PathVariable Long id) {
        return ResponseEntity.ok(tweetService.incrementCheers(id));
    }
}