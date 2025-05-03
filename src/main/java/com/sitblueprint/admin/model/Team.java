package com.sitblueprint.admin.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "teams")
public class Team {
  @Id
  private String id;
  private String name;
  private String githubTeam;
}
