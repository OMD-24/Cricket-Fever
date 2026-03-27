package com.cricket.fever.service;

import com.cricket.fever.Entity.Tweet;
import com.cricket.fever.dto.TweetRequest;
import com.cricket.fever.dto.TweetResponse;
import com.cricket.fever.exception.TweetNotFoundException;
import com.cricket.fever.mapper.TweetMapper;
import com.cricket.fever.repository.TweetRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TweetService {

    private final TweetRepository tweetRepository;
    private final TweetMapper tweetMapper;

    public TweetService(TweetRepository tweetRepository, TweetMapper tweetMapper) {
        this.tweetRepository = tweetRepository;
        this.tweetMapper = tweetMapper;
    }

    @Transactional
    public TweetResponse saveTweet(TweetRequest request) {
        Tweet tweet = tweetMapper.toEntity(request);
        Tweet saved = tweetRepository.save(tweet);
        return tweetMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<TweetResponse> getAllTweets() {
        return tweetRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(tweetMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteTweet(Long id) {
        Tweet tweet = tweetRepository.findById(id)
                .orElseThrow(() ->
                        new TweetNotFoundException("Broadcast not found with id: " + id));
        tweetRepository.delete(tweet);
    }

    @Transactional
    public TweetResponse incrementCheers(Long id) {
        Tweet tweet = tweetRepository.findById(id)
                .orElseThrow(() ->
                        new TweetNotFoundException("Broadcast not found with id: " + id));
        tweet.setCheers(tweet.getCheers() + 1);
        Tweet updated = tweetRepository.save(tweet);
        return tweetMapper.toResponse(updated);
    }
}