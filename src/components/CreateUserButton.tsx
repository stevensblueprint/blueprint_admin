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

function CreateUserButton ({
  setDisplaySuccess
}: {
  displaySuccess: boolean
  setDisplaySuccess: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [formData, setFormData] = useState({ email: '', roles: '' })
  const [displayError, setDisplayError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    console.log('Form submitted', formData)

    const simulateApiCall = async (): Promise<void> => {
      await new Promise<void>((resolve, reject) => {
        const apiState = true
        if (!apiState) {
          reject(new Error('API call failed'))
        } else {
          resolve()
        }
      })
    }
    simulateApiCall()
      .then(() => {
        setDisplaySuccess(true)
        onClose()
      })
      .catch((error) => {
        setDisplayError(true)
        console.error(error)
      })
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add Users
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {displayError && (
              <Alert status="error">
                <AlertIcon />
                Request failed
              </Alert>
            )}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                placeholder="Email"
                ref={initialRef}
                onChange={handleChange}
                value={formData.email}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Roles</FormLabel>
              <Input
                name="roles"
                placeholder="Roles"
                onChange={handleChange}
                value={formData.roles}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Accept
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateUserButton
