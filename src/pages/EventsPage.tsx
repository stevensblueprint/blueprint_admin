import { Table } from "@chakra-ui/react";
import { events } from "../data/seed";

function EventsPage(): JSX.Element {
    return (
        <Table.Root size="sm" showColumnBorder>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Organizer</Table.ColumnHeader>
                    <Table.ColumnHeader>Date</Table.ColumnHeader>
                    <Table.ColumnHeader>Location</Table.ColumnHeader>
                    <Table.ColumnHeader>Budget</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Event Type</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {events.map((event) => (
                    <Table.Row key={event.name}>
                        <Table.Cell>{event.name}</Table.Cell>
                        <Table.Cell>{event.organizer.name}</Table.Cell>
                        <Table.Cell>{event.date}</Table.Cell>
                        <Table.Cell>{event.location}</Table.Cell>
                        <Table.Cell>{event.budget}</Table.Cell>
                        <Table.Cell textAlign="end">{event.eventType}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
};

export default EventsPage;