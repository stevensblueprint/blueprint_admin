package com.sitblueprint.admin.service;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.amazonaws.services.cognitoidp.model.SignUpRequest;
import com.amazonaws.services.cognitoidp.model.SignUpResult;
import com.sitblueprint.admin.dto.MemberDTO.Request;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CognitoServiceImpl implements CognitoService {

  private AWSCognitoIdentityProvider cognitoClient;

  @Override
  public SignUpResult signUp(Request input) {
    SignUpRequest request = new SignUpRequest()
        .withClientId("")
        .withUsername(input.getEmail())
        .withPassword(input.getPassword())
        .withUserAttributes(new AttributeType()
            .withName("name")
            .withValue(input.getName()));

    return cognitoClient.signUp(request);
  }
}
