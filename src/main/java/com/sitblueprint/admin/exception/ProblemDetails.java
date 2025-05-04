package com.sitblueprint.admin.exception;

import java.net.URI;
import java.time.LocalDateTime;

public record ProblemDetails(
    String title,
    int status,
    String detail,
    URI instance,
    LocalDateTime timestamp
) {
  public ProblemDetails(String title, int status, String detail, URI instance) {
    this(title, status, detail, instance, LocalDateTime.now());
  }
}
