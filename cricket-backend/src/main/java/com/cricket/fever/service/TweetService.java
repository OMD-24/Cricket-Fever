package com.cricket.fever.service;

import com.cricket.fever.Entity.Tweet;
import com.cricket.fever.exception.PlayerNotFoundException;
import com.cricket.fever.repository.TweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TweetService{

    @Autowired
    private TweetRepository tweetRepository;

    public Tweet saveTweet(Tweet tweet) {

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
            throw new PlayerNotFoundException("Tweet not found with id: " + id);
        }
    }
    public Tweet incrementCheers(Long id) {
        Tweet tweet = tweetRepository.findById(id)
                .orElseThrow(() -> new PlayerNotFoundException("Broadcast not found"));

        int currentCheers = Integer.parseInt(tweet.getCheers());
        tweet.setCheers(String.valueOf(currentCheers + 1));

        return tweetRepository.save(tweet);
    }
}