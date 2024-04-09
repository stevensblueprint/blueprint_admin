import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react'
import { type User } from '../types/index'
import React from 'react'

function TableDashboard ({ members }: { members: User[] }): JSX.Element {
  return (
    <TableContainer>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Title</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {members
            .sort((a: User, b: User) => {
              return a.name.localeCompare(b.name)
            })
            .filter((user: User) => !user.isEnabled)
            .map(
              (
                { name, email, isEnabled }: User // Add type annotation for User
              ) => (
                <Tr key={email}>
                  <Th>{name}</Th>
                  <Th>{email}</Th>
                  <Th></Th>
                  <Th>{isEnabled ? 'Active' : 'Inactive'}</Th>
                </Tr>
              )
            )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TableDashboard
