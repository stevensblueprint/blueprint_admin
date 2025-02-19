// TeamLayout.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Heading, Text } from '@chakra-ui/react';
import { members, teams, organizations } from '../data/seed'; // Adjust the import path as necessary

const TeamLayout: React.FC = () => {
    const { teamId } = useParams<{ teamId: string }>();

    // Find the team based on the teamId
    const team = teams.find(t => t.id === teamId);
    const teamMembers = members.filter(member => member.team.id === teamId);

    if (!team) {
        return <div>Team not found</div>;
    }

    // Find the organization associated with the team
    const organization = organizations.find(org => org.team.id === teamId);

    return (
        <Box p={5}>
            <Heading mb={4}>Team Information</Heading>
            {organization && (
                <Box mb={4}>
                    <Text><strong>Organization:</strong> {organization.name}</Text>
                    <Text><strong>Team Lead:</strong> {organization.teamLeadId.name}</Text>
                    <Text><strong>Project Manager:</strong> {organization.projectManagerId.name}</Text>
                </Box>
            )}
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Date Joined</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {teamMembers.map(member => (
                        <Tr key={member.id}>
                            <Td>{member.name}</Td>
                            <Td>{member.email}</Td>
                            <Td>{new Date(member.dateJoined).toLocaleDateString()}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default TeamLayout;
