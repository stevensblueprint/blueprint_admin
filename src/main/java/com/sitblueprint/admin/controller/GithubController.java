package com.sitblueprint.admin.controller;

import com.sitblueprint.admin.service.GithubService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/github")
@AllArgsConstructor
public class GithubController {
  private GithubService githubService;

  @GetMapping("/teams")
  public ResponseEntity<List<String>> getAllTeams() {
    return ResponseEntity.ok(githubService.getAllTeams());
  }
}
