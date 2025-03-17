import {
  Button,
  ButtonGroup,
  DialogActionTrigger,
  useDisclosure,
  Input,
  Container,
  HStack,
  Center,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import MembersTable from "../components/MembersTable";
import Sidebar from "../components/Sidebar";
import { members as testMembers } from "../data/seed";
import { Member } from "../types/member";
import { useEffect, useState } from "react";

const members_page = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //For debugging
  useEffect(() => {
    setMembers(testMembers);
    //placeholders for now until we can get the actual data
    setError(null);
    setIsLoading(false);
  });
  return (
    <HStack height="100vh">
      <Sidebar />
      <Container maxW={"75vw"}>
        {isLoading ? (
          <Center>
            {" "}
            <Spinner size="xl" />{" "}
          </Center>
        ) : (
          <HStack align={"start"} border="solid 1px" borderColor="gray.200">
            <MembersTable members={members} />
            <DialogRoot>
              <DialogTrigger>
                <Button margin="10px 10px 10px 0px" variant="subtle" size="md">
                  Add New Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle fontSize="25px">Add New Member</DialogTitle>
                </DialogHeader>
                <DialogBody fontSize="15px">
                  <p>Enter the name of the new member:</p>
                  <Input placeholder="Enter name" variant="subtle"></Input>
                  <p>Enter the email address of new member:</p>
                  <Input placeholder="Enter email" variant="subtle"></Input>
                  <p>Enter the role of the new member:</p>
                  <Input placeholder="Enter role" variant="subtle"></Input>
                  <p>Enter the GitHub username of the new member:</p>
                  <Input placeholder="Enter username" variant="subtle"></Input>
                  <p>
                    Enter the class standing of the new member (e.g., Freshman,
                    Sophomore, Junior or Senior):
                  </p>
                  <Input
                    placeholder="Enter class standing"
                    variant="subtle"
                  ></Input>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Close</Button>
                  </DialogActionTrigger>
                  <Button variant="solid" size="md" ml="auto">
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </HStack>
        )}
        {error && <Text color="red.500">{error}</Text>}
      </Container>
    </HStack>
  );
};

export default members_page;
