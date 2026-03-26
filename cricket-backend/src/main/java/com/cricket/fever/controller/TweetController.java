package com.cricket.fever.controller;

import com.cricket.fever.Entity.Tweet;
import com.cricket.fever.common.response.ApiResponse;
import com.cricket.fever.service.TweetService;
import jakarta.validation.Valid;
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

    // ✅ Broadcast Tweet
    @PostMapping("/broadcast")
    public ResponseEntity<ApiResponse<Tweet>> broadcast(
            @Valid @RequestBody Tweet tweet) {

        Tweet savedTweet = tweetService.saveTweet(tweet);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Broadcast posted successfully",
                        savedTweet
                )
        );
    }

    // ✅ Get All Tweets
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Tweet>>> getAll() {

        List<Tweet> tweets = tweetService.getAllTweets();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Tweets fetched successfully",
                        tweets
                )
        );
    }

    // ✅ Delete Tweet
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<String>> deleteTweet(
            @PathVariable Long id) {

        tweetService.deleteTweet(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Tweet deleted successfully",
                        null
                )
        );
    }

    // ✅ Cheer Tweet
    @PatchMapping("/{id}/cheer")
    public ResponseEntity<ApiResponse<Tweet>> cheerTweet(
            @PathVariable Long id) {

        Tweet updatedTweet = tweetService.incrementCheers(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Cheers updated successfully",
                        updatedTweet
                )
        );
    }
}