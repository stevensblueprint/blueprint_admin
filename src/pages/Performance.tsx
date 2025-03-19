import { Table } from "@chakra-ui/react";

const performance_page = () => {
  return (
    <div>
      <Table.Root
        key={"outline"}
        size="sm"
        variant={"outline"}
        width="20%"
        showColumnBorder
      >
        <Table.Header>
          <Table.ColumnHeader colSpan={2} textAlign={"Center"}>
            Top Contributor
          </Table.ColumnHeader>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Github Username</Table.ColumnHeader>
            <Table.ColumnHeader>
              Number of Pull Requests This Week
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        {items1.map((items) => (
          <Table.Row>
            <Table.Cell>{items.name}</Table.Cell>
            <Table.Cell>{items.pullRequests}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Root>

      <Table.Root
        key={"outline"}
        size="sm"
        variant={"outline"}
        width="30%"
        showColumnBorder
      >
        <Table.Header>
          <Table.ColumnHeader colSpan={4} textAlign={"Center"}>
            Existing Issues
          </Table.ColumnHeader>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Date Opened</Table.ColumnHeader>
            <Table.ColumnHeader>Github Username</Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        {items2.map((items) => (
          <Table.Row>
            <Table.Cell>{items.date}</Table.Cell>
            <Table.Cell>{items.username}</Table.Cell>
            <Table.Cell>{items.title}</Table.Cell>
            <Table.Cell>{items.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Root>
    </div>
  );
};

const items1 = [{ id: 1, name: "User1", pullRequests: 0 }];

const items2 = [
  {
    id: 1,
    username: "User1",
    date: "2025-02-14",
    title: "title1",
    status: "open",
  },
  {
    id: 2,
    username: "User2",
    date: "2025-03-18",
    title: "title2",
    status: "closed",
  },
  {
    id: 3,
    username: "User3",
    date: "2024-01-20",
    title: "title3",
    status: "closed",
  },
];

export default performance_page;
