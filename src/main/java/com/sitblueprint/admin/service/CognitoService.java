package com.sitblueprint.admin.service;

import com.amazonaws.services.cognitoidp.model.SignUpResult;
import com.sitblueprint.admin.dto.MemberDTO;

public interface CognitoService {
  SignUpResult signUp(MemberDTO.Request input);
}
