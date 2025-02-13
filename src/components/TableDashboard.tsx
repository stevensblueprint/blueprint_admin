import { Table } from "@chakra-ui/react";
import { Member } from "../types/member";

function TableDashboard({ members }: { members: Member[] }): JSX.Element {
  return (
    <Table.Root size="md">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {members
            .sort((a: Member, b: Member) => {
              return a.name.localeCompare(b.name);
            })
            .filter((user: Member) => !user.isActive)
            .map(
              (
                { name, email, isActive }: Member, // Add type annotation for User
              ) => (
                <Table.Row key={email}>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{email}</Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>{isActive ? "Active" : "Inactive"}</Table.Cell>
                </Table.Row>
              ),
            )}
        </Table.Body>
    </Table.Root>
  );
}

export default TableDashboard;
