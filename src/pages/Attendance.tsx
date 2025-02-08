import { Center, Container, HStack, Spinner, Text, Box } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react"
import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import { Member } from "../types/member";

function Attendance(): JSX.Element {
    // const [members, setMembers] = React.useState<Member[]>([]);
  
    return (
      <HStack height="100vh" spacing="0">
        <Sidebar />
        <Box background="tomato" width="90%" padding="4" color="white">
            This is the Box
        </Box>
        {/* <Table.Root interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Date</Table.ColumnHeader>
                <Table.ColumnHeader>Location</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Number of Attendees</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {events.map((event) => (
                <Table.Row key={event.id}>
                  <Table.Cell>{event.date}</Table.Cell>
                  <Table.Cell>{event.location}</Table.Cell>
                  <Table.Cell textAlign="end">{event.num_attendees}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root> */}
      </HStack>
    );
  }
  
  export default Attendance;

  const events = [
    { id: 1, date: "02/08/2025", location: "The Moon", num_attendees: 0 },
    { id: 2, date: "02/09/2025", location: "Gateway South 214", num_attendees: 0 },
    { id: 3, date: "03/21/2025", location: "Martha Bayard 297197197", num_attendees: 0 },
    { id: 4, date: "04/10/2025", location: "Point Nemo", num_attendees: 0 },
    { id: 5, date: "07/12/2025", location: "NYC", num_attendees: 0 },
  ]
  
  