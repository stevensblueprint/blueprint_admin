package com.sitblueprint.admin.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

public class MemberDTO {
  @Getter
  @Setter
  @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
  public static class Request {
    @NotBlank(message = "Name cannot be empty")
    private String name;
    @NotBlank(message = "Email cannot be empty")
    private String email;
    @NotBlank(message = "Password cannot be empty")
    private String password;
    @NotBlank(message = "Discord username cannot be empty")
    private String discordUsername;
    @NotBlank(message = "GitHub username cannot be empty")
    private String githubUsername;
    private LocalDate dateJoined;
  }

  @Getter
  @Setter
  @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
  public static class Response {
    private String name;
    private String email;
    private String discordUsername;
    private String githubUsername;
    private LocalDate dateJoined;
  }
}
