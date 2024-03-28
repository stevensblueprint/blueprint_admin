import { useState } from "react"; //for the save button that hasnt' been implemented
import React from "react";
import sampleUserData from "../sample_data.json";
import { useDisclosure } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
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
  return (
    <>
      <Button onClick={onOpen}>{buttonText}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{userName} Information</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            Name:
            <Editable>
              {userName}
              <EditablePreview /*need?*/ />
              <EditableInput />
            </Editable>
          </ModalBody>

          <ModalBody>
            Email:
            <Editable>
              {email}
              <EditablePreview /*need?*/ />
              <EditableInput />
            </Editable>
          </ModalBody>

          <ModalBody>
            Status:
            <Editable>
              {status}
              <EditablePreview /*need?*/ />
              <EditableInput />
            </Editable>
          </ModalBody>

          <ModalBody>
            Title:
            <Editable>
              {}
              <EditablePreview /*need?*/ />
              <EditableInput />
            </Editable>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserCard;
