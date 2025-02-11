import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react"
import { Event } from "../types/events"
import { events } from "../data/seed"
import userEvent from "@testing-library/user-event";

function EventDisplay(): JSX.Element {
    return(
        <TableContainer>
            <Table variant="simple" size="md">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Organizer</Th>
                        <Th>Date</Th>
                        <Th>Location</Th>
                        <Th>Budget</Th>
                        <Th>Event Type</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {events
                    .sort((a: Event, b: Event) => {
                        return a.eventType.localeCompare(b.eventType);
                    })
                    .filter((userEvent: Event) => userEvent.eventType)
                    .map(event => (
                        <Tr>
                            <Th>{event.name}</Th>
                            <Th>{event.organizer.name}</Th>
                            <Th>{event.date}</Th>
                            <Th>{event.location}</Th>
                            <Th>${event.budget.toLocaleString()}</Th>
                            <Th>{event.eventType}</Th>
                        </Tr>
                    ),
                        )
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default EventDisplay;