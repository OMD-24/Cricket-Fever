package com.cricket.fever.service;

import com.cricket.fever.Entity.Tweet;
import com.cricket.fever.repository.TweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TweetService{

    @Autowired
    private TweetRepository tweetRepository;

    public Tweet saveTweet(Tweet tweet) {
        // Logic: Clean the text before saving
        if (tweet.getText() != null) {
            tweet.setText(tweet.getText().trim());
        }
        return tweetRepository.save(tweet);
    }

    public List<Tweet> getAllTweets() {
        return tweetRepository.findAllByOrderByCreatedAtDesc();
    }

    public void deleteTweet(Long id) {
        if (tweetRepository.existsById(id)) {
            tweetRepository.deleteById(id);
        } else {
            throw new RuntimeException("Tweet not found with id: " + id);
        }
    }
    public Tweet incrementCheers(Long id) {
        Tweet tweet = tweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Broadcast not found"));

        // Convert string cheer to int, increment, and save back
        int currentCheers = Integer.parseInt(tweet.getCheers());
        tweet.setCheers(String.valueOf(currentCheers + 1));

        return tweetRepository.save(tweet);
    }
}