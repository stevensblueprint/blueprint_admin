package com.sitblueprint.admin.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

public class TeamDTO {
  @Getter
  @Setter
  @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
  public static class Request {
    @NotBlank
    private String name;
    @NotBlank
    private String githubRole;
  }

  @Getter
  @Setter
  @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
  public static class Response {
    private String name;
    protected String githubTeam;
  }
}
