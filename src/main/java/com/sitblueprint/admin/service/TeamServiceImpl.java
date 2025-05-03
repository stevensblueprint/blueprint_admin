package com.sitblueprint.admin.service;

import com.sitblueprint.admin.dto.MemberDTO;
import com.sitblueprint.admin.dto.TeamDTO.Request;
import com.sitblueprint.admin.dto.TeamDTO.Response;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TeamServiceImpl implements TeamService {

  @Override
  public List<Response> getAllTeams() {
    return List.of();
  }

  @Override
  public Response createTeam(Request input) {
    return null;
  }

  @Override
  public Response getTeamById(String id) {
    return null;
  }

  @Override
  public Response updateTeam(String id, Request input) {
    return null;
  }

  @Override
  public void deleteTeam(MemberDTO.Request input) {

  }
}
