package com.cricket.fever.controller;

import com.cricket.fever.common.response.ApiResponse;
import com.cricket.fever.dto.TweetRequest;
import com.cricket.fever.dto.TweetResponse;
import com.cricket.fever.service.TweetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tweets")
@CrossOrigin(origins = "http://localhost:5173")
public class TweetController {


    private final TweetService tweetService;

    public TweetController(TweetService tweetService){
        this.tweetService = tweetService;
    }

    @PostMapping("/broadcast")
    public ResponseEntity<ApiResponse<TweetResponse>> broadcast(
            @Valid @RequestBody TweetRequest request) {

        TweetResponse response = tweetService.saveTweet(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Broadcast posted successfully",
                        response
                )
        );
    }


    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<TweetResponse>>> getAllTweets() {

        List<TweetResponse> tweets = tweetService.getAllTweets();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Tweets fetched successfully",
                        tweets
                )
        );
    }


    @DeleteMapping("/{id}")
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


    @PatchMapping("/{id}/cheer")
    public ResponseEntity<ApiResponse<TweetResponse>> cheerTweet(
            @PathVariable Long id) {

        TweetResponse updatedTweet = tweetService.incrementCheers(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Cheers updated successfully",
                        updatedTweet
                )
        );
    }
}