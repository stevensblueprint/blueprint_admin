package com.sitblueprint.admin.service;

import com.sitblueprint.admin.model.Member;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.kohsuke.github.GHOrganization;
import org.kohsuke.github.GHTeam;
import org.kohsuke.github.GitHub;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GithubServiceImpl implements GithubService {
  private static final Logger log = LoggerFactory.getLogger(GithubServiceImpl.class);
  private static final String githubOrganization = "stevensblueprint";

  private final GitHub gitHubClient;

  @Override
  public List<String> getAllTeams() {
    try {
      GHOrganization org = gitHubClient.getOrganization(githubOrganization);
      return org.listTeams()
          .toList().stream()
          .map(GHTeam::getName)
          .collect(Collectors.toList());
    } catch (IOException e) {
      log.error("Unable to list teams for org '{}'", githubOrganization, e);
      return Collections.emptyList();
    }
  }

  @Override
  public void addMember(Member member, boolean isAdmin) {
    try {
      GHOrganization org = gitHubClient.getOrganization(githubOrganization);

    } catch (IOException e) {
      log.error("Unable to add member '{}' to team", member.getName());
    }
  }
}
