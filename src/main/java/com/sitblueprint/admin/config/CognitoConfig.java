package com.sitblueprint.admin.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CognitoConfig {
  @Value("${aws.cognito.access-key}")
  private String accessKey;

  @Value("${aws.cognito.secret-key}")
  private String secretKey;

  @Value("${aws.cognito.region}")
  private String region;

  @Bean
  public AWSCognitoIdentityProvider cognitoClient() {
    AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
    return AWSCognitoIdentityProviderClientBuilder.standard()
        .withCredentials(new AWSStaticCredentialsProvider(credentials))
        .withRegion(region)
        .build();
  }
}
