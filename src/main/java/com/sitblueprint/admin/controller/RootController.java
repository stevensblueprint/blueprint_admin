package com.sitblueprint.admin.controller;

import com.sitblueprint.admin.dto.RootDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class RootController {
  @GetMapping
  public ResponseEntity<RootDTO> getRoot() {
    return ResponseEntity.ok(
        RootDTO.builder()
        .body("Blueprint Admin")
        .status(200).build());
  }
}
