package com.sitblueprint.admin.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class RootDTO {
  private String body;
  private int status;
}
