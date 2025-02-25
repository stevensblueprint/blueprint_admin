import { Button, ButtonGroup, DialogActionTrigger } from "@chakra-ui/react";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"
import { useDisclosure } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

const members_page = () => {
    
    return(
        <div>
            <DialogRoot>
                <DialogTrigger>
                    <Button variant="subtle" size="md">Add New Member</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle fontSize="25px">Add New Member</DialogTitle>
                    </DialogHeader>
                    <DialogBody fontSize="15px">
                        <p>Enter the name of the new member:</p>
                        <Input placeholder="Enter name" variant="subtle"></Input>
                        <p>Enter the email address of new member:</p>
                        <Input placeholder="Enter email" variant="subtle"></Input>
                        <p>Enter the role of the new member:</p>
                        <Input placeholder="Enter role" variant="subtle"></Input>
                        <p>Enter the GitHub username of the new member:</p>
                        <Input placeholder="Enter username" variant="subtle"></Input>
                        <p>Enter the class standing of the new member (e.g., Freshman, Sophomore, Junior or Senior):</p>
                        <Input placeholder="Enter class standing" variant="subtle"></Input>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="outline">Close</Button>
                        </DialogActionTrigger>
                        <Button variant="solid" size="md" ml="auto">Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </div>
    )
}

export default members_page;