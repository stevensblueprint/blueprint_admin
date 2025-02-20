import Sidebar from "../components/Sidebar";
import Table from "../components/EventTable";
import { HStack } from "@chakra-ui/react";

function Events(): JSX.Element {
  return (
    <>
      <HStack height="100vh" spacing="0">
        <Sidebar></Sidebar>
        <Table></Table>
      </HStack>
    </>
  );
}

export default Events;
