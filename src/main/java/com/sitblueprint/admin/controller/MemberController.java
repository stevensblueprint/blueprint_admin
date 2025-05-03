package com.sitblueprint.admin.controller;

import com.sitblueprint.admin.dto.MemberDTO;
import com.sitblueprint.admin.service.MemberService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/members")
@AllArgsConstructor
public class MemberController {

  private MemberService memberService;

  @GetMapping
  public ResponseEntity<List<MemberDTO.Response>> getAllMembers() {
    List<MemberDTO.Response> members = memberService.getAllMembers();
    return ResponseEntity.ok(members);
  }

  @PostMapping
  public ResponseEntity<MemberDTO.Response> createMember(@RequestBody MemberDTO.Request member) {
    return ResponseEntity.ok(memberService.createMember(member));
  }
}
