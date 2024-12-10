import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalBody, 
  ModalCloseButton, 
  ModalHeader,
  Stack,
  useToast 
} from "@chakra-ui/react"
import { EventContext } from '../../EventProvider';

const DeleteEventModal = ({isOpen, onClose, event}) => {
  const { setEvents } = useContext(EventContext);
  const navigate = useNavigate();
  const toast = useToast()

  const handleClick = () => {
    fetch('http://localhost:3000/events/' + event.id.toString(), {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(resp => {
      setEvents((prevEvents) => 
        prevEvents.filter((event) => event.id !== resp.id)
      );
      navigate('/events');

      toast({
        title: "Deleted successfully!",
        type: "success",
        position: "top",
        isClosable: true
      })
      onClose()
    }).catch(() => toast({
        title: "Something went wrong, please try again!",
        type: "error",
        position: "top",
        isClosable: true  
      })
    )
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this event</Text>
            <Stack direction='row-reverse' spacing={4}>
              <Button mt={6} colorScheme="blue" onClick={handleClick}>
                Yes
              </Button>
              <Button mt={6} colorScheme="blue" onClick={onClose}>
                No
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};

export default DeleteEventModal;