package com.cricket.fever.mapper;

import com.cricket.fever.Entity.Tweet;
import com.cricket.fever.dto.TweetRequest;
import com.cricket.fever.dto.TweetResponse;
import org.springframework.stereotype.Component;

@Component
public class TweetMapper {

    public Tweet toEntity(TweetRequest request) {

        Tweet tweet = new Tweet();
        tweet.setName(request.getName());
        tweet.setJerseyNo(request.getJerseyNo());
        tweet.setTeamColor(request.getTeamColor());
        tweet.setText(request.getText());

        return tweet;
    }

    public TweetResponse toResponse(Tweet tweet) {

        return new TweetResponse(
                tweet.getId(),
                tweet.getName(),
                tweet.getJerseyNo(),
                tweet.getTeamColor(),
                tweet.getText(),
                tweet.getCheers(),
                tweet.getCreatedAt()
        );
    }
}