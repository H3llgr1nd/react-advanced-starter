import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Divider, Heading, HStack, Image, Text, Stack, Flex, useDisclosure } from "@chakra-ui/react"
import { getReadableDate } from './Modals/utils';
import EditEventModal from './Modals/EditEventModal';
import DeleteEventModal from './Modals/DeleteEventModal';

const EventCard = ({event: eventProp, isFromEventClick = false}) => {
  const navigate = useNavigate();
  const [event, setEvent] = useState(eventProp);
  const { 
    isOpen: isEditModalOpen, 
    onOpen: openEditModal, 
    onClose: closeEditModal, 
  } = useDisclosure()
  const { 
    isOpen: isDeleteModalOpen, 
    onOpen: openDeleteModal, 
    onClose: closeDeleteModal 
  } = useDisclosure()

  const { description, title, id, image, location, startTime, endTime, categories } = event;

  const navigateToEvent = () => {
    if (isFromEventClick === true) return;
    navigate(`/event/${id}`, { state: { event, isFromEventClick: true } });
  }

  return (
    <Card maxW={isFromEventClick ? 'lg': 'sm'} onClick={navigateToEvent}>
      <CardHeader>
        <Heading size='md'>{title}</Heading>
      </CardHeader> 
      <CardBody>
        <Image
          src={image}
          borderRadius='lg'
          boxSize={isFromEventClick ? '500px': '350px'}
        />
        <HStack>
          <Text as='b'> Categories:</Text>
          {categories.map((category, index) => (
            <Text key={category} display="inline">
              {category}
              {index < categories.length - 1 && ', '}
            </Text>
          ))}
        </HStack>
        <HStack>
          <Text as='b'> Description:</Text>
          <Text> {description} </Text>
        </HStack>
          <HStack>
            <Text as='b'> Location:</Text>
            <Text color='blue.600'>{location}</Text>
          </HStack>
          <HStack>
            <Text as='b'> Time:</Text>
            <Text> {getReadableDate(new Date(startTime))} - {getReadableDate(new Date(endTime))} </Text>
          </HStack>
          {isFromEventClick && 
            <Flex justifyContent="space-between" alignItems="flex-start" width="100%">
              <Stack marginTop="10px" spacing="10px">
                <Image 
                  src={event.user.image} 
                  borderRadius="lg" 
                  boxSize="100px" 
                />
                <Text as="b">{event.user.name}</Text>
              </Stack>
              <Flex alignSelf="flex-end">
                <Button onClick={openEditModal} marginRight="10px">Edit</Button>
                <Button onClick={openDeleteModal}>Delete</Button>
              </Flex>
            </Flex>
          }
          {isFromEventClick && 
            <EditEventModal 
              isOpen={isEditModalOpen}
              onClose={closeEditModal} 
              event={event}
              setEvent={setEvent}
            />
          }
          {isFromEventClick && 
            <DeleteEventModal 
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal} 
              event={event}
            />
          }
      </CardBody>
      <Divider />
    </Card>
  )
};

export default EventCard;