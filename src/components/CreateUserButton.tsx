import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import React, { useState } from 'react'

function CreateUserButton ({ displaySuccess, setDisplaySuccess }: { displaySuccess: boolean, setDisplaySuccess: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [displayError, setDisplayError] = useState(false)
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const handleSubmit: () => void = () => {
    console.log('Form submitted')
    // Check if correct
    const apiState = true
    if (!apiState) {
      setDisplayError(true)
      return
    }
    setDisplaySuccess(true)
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme='blue' >Add Users</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {displayError ? <Alert status='error'> <AlertIcon /> Request failed </Alert> : <></>}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input ref={initialRef} placeholder='Email' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Roles</FormLabel>
              <Input placeholder='Roles' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}> Accept </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateUserButton
