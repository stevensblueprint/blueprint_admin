package com.sitblueprint.admin.config;

import java.io.IOException;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GithubConfig {

  @Value("${github.token}")
  private String token;

  @Bean
  public GitHub githubClient() throws IOException {
    return new GitHubBuilder()
        .withOAuthToken(token)
        .build();
  }
}
