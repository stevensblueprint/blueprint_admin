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
    @NotBlank
    private String name;
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String discordUsername;
    @NotBlank
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
