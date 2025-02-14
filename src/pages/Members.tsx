import { Button, ButtonGroup } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

const members_page = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return(
        <div>
            <Button onClick={onOpen}>Create new user</Button>
            <Modal isOpen={ isOpen } size={'xl'} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Create New User</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        Enter the name of new member:
                        <Input placeholder='Enter Name'></Input>
                        Enter the email address of new member:
                        <Input placeholder='Enter email'></Input>
                        Enter the role of the new member:
                        <Input placeholder='Enter role'></Input>
                        Enter the GitHub username of the new member:
                        <Input placeholder='Enter username'></Input>
                        Enter the class standing of the new member (e.g., Freshman, Sophomore, Junior or Senior):
                        <Input placeholder='Enter class standing'></Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                        <Button>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default members_page;