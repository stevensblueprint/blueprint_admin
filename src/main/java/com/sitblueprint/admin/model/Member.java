package com.sitblueprint.admin.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "members")
@Getter
@Setter
public class Member {
  @Id
  private String id;
  private String name;
  private String email;
  private String password;
  private String discordUsername;
  private String githubUsername;
  private LocalDate dateJoined;
}
