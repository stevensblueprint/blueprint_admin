import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, Center, Container, HStack, Spinner } from '@chakra-ui/react'
import TableDashboard from '../components/TableDashboard'
import Sidebar from '../components/Sidebar'
import { getAllUsers } from '../api/lib/users'
import { type User } from '../types/index'
import React, { useEffect, useState } from 'react'

function HomePage (): JSX.Element {
  const [members, setMembers] = React.useState<User[]>([])
  const [errorTitle, setErrorTitle] = useState<string | null>(null)
  const [errorDesc, setErrorDesc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    void getAllUsers().then((response) => {
      setMembers(response.data as User[])
      setIsLoading(false)
    }).catch((error) => {
      console.error(error)
      setErrorTitle('Failed to load Blueprint members.')
      setErrorDesc('Please try again later.')
      setIsLoading(false)
    })
  }, [])

  return (
    <HStack height="100vh" spacing="0">
      <Sidebar />
      <Container>
      {!errorTitle && !errorDesc
        ? (isLoading
            ? <Center> <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" /> </Center>
            : <TableDashboard members={members} />
          )
        : (<Alert status="error" borderRadius="lg">
            <AlertIcon/>
            <Box>
              <AlertTitle>{errorTitle}</AlertTitle>
              <AlertDescription>{errorDesc}</AlertDescription>
            </Box>
          </Alert>)
      }
      </Container>
    </HStack>
  )
}

export default HomePage
