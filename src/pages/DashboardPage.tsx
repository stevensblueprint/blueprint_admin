import CreateUserButton from '../components/CreateUserButton'
import { Alert, AlertIcon, VStack, Flex, Spacer } from '@chakra-ui/react'
import { useState } from 'react'

function DashboardPage (): JSX.Element {
  const [displaySuccess, setDisplaySuccess] = useState(false)
  return (
    <VStack align="stretch" >
      <Flex>
      <Spacer/>
      <CreateUserButton displaySuccess={displaySuccess} setDisplaySuccess={setDisplaySuccess} />
      </Flex>
      {displaySuccess && (
       <Flex>
        <Spacer/>
        <Alert status="success" justifyContent="center" height="50px" width = "200px" alignItems="right">
          <AlertIcon/>
          Request success
        </Alert>
        </Flex>
      )}
    </VStack>
  )
}

export default DashboardPage
