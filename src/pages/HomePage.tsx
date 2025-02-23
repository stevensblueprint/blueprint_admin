import {
  Center,
  Container,
  HStack,
  Spinner,
  Text,
  Box,
} from "@chakra-ui/react";
import TableDashboard from "../components/TableDashboard";
import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import { Member } from "../types/member";
import { getAllMembers } from "../api/lib/member";

function HomePage(): JSX.Element {
  const [members, setMembers] = React.useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllMembers = async () => {
      getAllMembers()
        .then((response) => {
          setMembers(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    };
    fetchAllMembers();
  }, []);

  return (
    <HStack height="100vh">
      <Sidebar />
      <Container>
        {isLoading ? (
          <Center>
            {" "}
            <Spinner size="xl" />{" "}
          </Center>
        ) : (
          <TableDashboard members={members} />
        )}
        {error && <Text color="red.500">{error}</Text>}
      </Container>
    </HStack>
  );
}

export default HomePage;
