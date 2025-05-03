package com.sitblueprint.admin.service;

import com.sitblueprint.admin.dto.MemberDTO;
import com.sitblueprint.admin.dto.TeamDTO;
import java.util.List;

public interface TeamService {
  List<TeamDTO.Response> getAllTeams();
  TeamDTO.Response createTeam(TeamDTO.Request input);
  TeamDTO.Response getTeamById(String id);
  TeamDTO.Response updateTeam(String id, TeamDTO.Request input);
  void deleteTeam(MemberDTO.Request input);
}
