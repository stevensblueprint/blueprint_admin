import React, { useState } from "react"; //for the save button that hasnt' been implemented
import sampleUserData from "../sample_data.json";

import {
  useDisclosure,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";

interface UserCardProps {
  buttonText: string;
  userName: string;
  email: string;
  status: string;
  title: string;
}

function UserCard({
  buttonText,
  userName,
  email,
  status,
  title,
}: UserCardProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setName] = useState(userName); //does this go here?
  const [email, setEmail] = useState(email);
  const [status, setStatus] = useState(status);
  const [title, setTitle] = useState(title);
  const saveChanges = () => {
    onClose(); //close modal after saving
  };

  return (
    <>
      <Button onClick={onOpen}>{buttonText}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{userName}'s Information</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <p>Name:</p>
            <Editable
              defaultValue={userName}
              onSubmit={(value) => setName(value)}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>

            <p>Email:</p>
            <Editable
              defaultValue={email}
              onSubmit={(value) => setEmail(value)}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>

            <p>Status:</p>
            <Editable
              defaultValue={status}
              onSubmit={(value) => setStatus(value)}
            >
              {status}
              <EditablePreview />
              <EditableInput />
            </Editable>

            <p>Title:</p>
            <Editable
              defaultValue={title}
              onSubmit={(value) => setTitle(value)}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={saveChanges}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserCard;
