package com.sitblueprint.admin.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ProblemDetails> handleNotFound(ResourceNotFoundException ex,
      HttpServletRequest req) {
    var problem = new ProblemDetails(
        "Resource Not Found",
        HttpStatus.NOT_FOUND.value(),
        ex.getMessage(),
        URI.create(req.getRequestURI())
    );

    return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .contentType(MediaType.APPLICATION_PROBLEM_JSON)
        .body(problem);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ProblemDetails> handleConstraintViolation(ConstraintViolationException ex,
      HttpServletRequest req) {
    String detail = ex.getConstraintViolations().stream()
        .map(ConstraintViolation::getMessage)
        .collect(Collectors.joining("; "));

    var problem = new ProblemDetails(
        "Constraint Violation",
        HttpStatus.BAD_REQUEST.value(),
        detail,
        URI.create(req.getRequestURI())
    );

    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .contentType(MediaType.APPLICATION_PROBLEM_JSON)
        .body(problem);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ProblemDetails> handleBadRequest(MethodArgumentNotValidException ex,
      HttpServletRequest req) {
    String detail = ex.getBindingResult()
        .getFieldErrors().stream()
        .map(DefaultMessageSourceResolvable::getDefaultMessage)
        .collect(Collectors.joining("; "));

    var problem = new ProblemDetails(
        "Validation Failed",
        HttpStatus.BAD_REQUEST.value(),
        detail,
        URI.create(req.getRequestURI())
    );

    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .contentType(MediaType.APPLICATION_PROBLEM_JSON)
        .body(problem);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ProblemDetails> handleGeneric(Exception ex,
      HttpServletRequest req) {
    var problem = new ProblemDetails(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        "An unexpected error occurred: " + ex.getMessage(),
        URI.create(req.getRequestURI())
    );

    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .contentType(MediaType.APPLICATION_PROBLEM_JSON)
        .body(problem);
  }
}
