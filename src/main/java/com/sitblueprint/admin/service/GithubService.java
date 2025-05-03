package com.sitblueprint.admin.service;


import com.sitblueprint.admin.model.Member;
import java.util.List;

public interface GithubService {
  List<String> getAllTeams();
  void addMember(Member member, boolean isAdmin);
}
