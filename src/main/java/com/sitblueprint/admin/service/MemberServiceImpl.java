package com.sitblueprint.admin.service;

import com.sitblueprint.admin.dto.MemberDTO;
import com.sitblueprint.admin.dto.MemberDTO.Request;
import com.sitblueprint.admin.dto.MemberDTO.Response;
import com.sitblueprint.admin.mapper.MemberMapper;
import com.sitblueprint.admin.model.Member;
import com.sitblueprint.admin.repository.MemberRepository;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

  private final MemberRepository memberRepository;
  private final MemberMapper mapper;

  @Override
  public List<Response> getAllMembers() {
    List<Member> members = memberRepository.findAll();
    return members.stream().map(mapper::toResponseDTO).toList();
  }

  @Override
  public Response createMember(Request input) {
    Member member = mapper.toEntity(input);
    if (Objects.isNull(member.getId())) {
      member.setId(UUID.randomUUID().toString());
    }
    Member savedMember = memberRepository.save(member);
    return mapper.toResponseDTO(savedMember);
  }

  @Override
  public Response getMemberById(String id) {
    return mapper.toResponseDTO(memberRepository.findById(id).orElseThrow());
  }

  @Override
  public Response updateMember(String id, Request member) {
    Member savedMember = memberRepository.save(mapper.toEntity(member));
    return mapper.toResponseDTO(savedMember);
  }

  @Override
  public void deleteMember(Request input) {
    Member member = mapper.toEntity(input);
    memberRepository.delete(member);
  }
}
