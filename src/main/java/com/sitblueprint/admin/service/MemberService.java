package com.sitblueprint.admin.service;

import com.sitblueprint.admin.dto.MemberDTO;
import java.util.List;

public interface MemberService {
  List<MemberDTO.Response> getAllMembers();
  MemberDTO.Response createMember(MemberDTO.Request member);
  MemberDTO.Response getMemberById(String id);
  MemberDTO.Response updateMember(String id, MemberDTO.Request member);
  void deleteMember(MemberDTO.Request member);
}
