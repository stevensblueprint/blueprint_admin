import {
  Button,
  Fieldset,
  Input,
  useDisclosure,
  Alert
} from "@chakra-ui/react";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import React, { useState } from "react";

function CreateUserButton({
  setDisplaySuccess,
}: {
  displaySuccess: boolean;
  setDisplaySuccess: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { open, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [formData, setFormData] = useState({ email: "", roles: "" });
  const [displayError, setDisplayError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    console.log("Form submitted", formData);

    const simulateApiCall = async (): Promise<void> => {
      await new Promise<void>((resolve, reject) => {
        const apiState = true;
        if (!apiState) {
          reject(new Error("API call failed"));
        } else {
          resolve();
        }
      });
    };
    simulateApiCall()
      .then(() => {
        setDisplaySuccess(true);
        onClose();
      })
      .catch((error) => {
        setDisplayError(true);
        console.error(error);
      });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add Users
      </Button>

      <DialogRoot
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={open}
        onClose={onClose}
        isCentered
      >
        <DialogBackdrop />
        <DialogBody>
          <DialogHeader>Add User</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody pb={6}>
            {displayError && (
              <Alert.Root status="error">
                Request failed
              </Alert.Root>
            )}
            <Fieldset.Root>
              <Fieldset.Legend>Email</Fieldset.Legend>
              <Input
                name="email"
                placeholder="Email"
                ref={initialRef}
                onChange={handleChange}
                value={formData.email}
              />
            </Fieldset.Root>

            <Fieldset.Root mt={4}>
              <Fieldset.Legend>Roles</Fieldset.Legend>
              <Input
                name="roles"
                placeholder="Roles"
                onChange={handleChange}
                value={formData.roles}
              />
            </Fieldset.Root>
          </DialogBody>

          <DialogFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Accept
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </DialogBody>
      </DialogRoot>
    </>
  );
}

export default CreateUserButton;
