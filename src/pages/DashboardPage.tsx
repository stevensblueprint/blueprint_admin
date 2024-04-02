import CreateUserButton from '../components/CreateUserButton'
import { Alert, AlertIcon, Container, HStack, Box } from '@chakra-ui/react'
import { useState } from 'react'

function DashboardPage (): JSX.Element {
  const [displaySuccess, setDisplaySuccess] = useState(false)
  return (
    <HStack height="100vh" spacing="0">
      {displaySuccess ? <Box pt={740} position="relative" h="100vh" w='20%'><Alert status='success'> <AlertIcon /> Request success </Alert> </Box> : <></>}
      <Container><CreateUserButton displaySuccess={displaySuccess} setDisplaySuccess={setDisplaySuccess} />
      </Container>
    </HStack>
  )
}

export default DashboardPage
