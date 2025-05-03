package com.sitblueprint.admin.mapper;

import com.sitblueprint.admin.dto.MemberDTO;
import com.sitblueprint.admin.model.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
  Member toEntity(MemberDTO.Request dto);
  MemberDTO.Response toResponseDTO(Member entity);
}
