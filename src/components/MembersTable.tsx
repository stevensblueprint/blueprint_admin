import React from "react";
import { Table } from "@chakra-ui/react";
import { Member } from "../types/member";
function MembersTable({ members }: { members: Member[] }): JSX.Element {
  //
  return (
    <Table.Root
      size={"sm"}
      striped
      showColumnBorder
      borderRight="solid 1px"
      borderColor="gray.200"
    >
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Email</Table.ColumnHeader>
          <Table.ColumnHeader>Role</Table.ColumnHeader>
          <Table.ColumnHeader>Github Username</Table.ColumnHeader>
          <Table.ColumnHeader>Date Joined</Table.ColumnHeader>
          <Table.ColumnHeader>Class Standing</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {members
          .filter((member) => member.isActive)
          .map((member) => (
            <Table.Row key={member.id}>
              <Table.Cell>{member.name}</Table.Cell>
              <Table.Cell>{member.email}</Table.Cell>
              <Table.Cell>{member.roles.join(", ")}</Table.Cell>
              <Table.Cell>{member.username}</Table.Cell>
              <Table.Cell>{member.dateJoined}</Table.Cell>
              <Table.Cell>Year To Be Added</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
}

export default MembersTable;
