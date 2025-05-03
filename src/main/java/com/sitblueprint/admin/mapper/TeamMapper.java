package com.sitblueprint.admin.mapper;

import com.sitblueprint.admin.dto.TeamDTO;
import com.sitblueprint.admin.model.Team;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TeamMapper {
  Team toEntity(TeamDTO.Request dto);
  TeamDTO.Response toResponseDTO(Team entity);
}
