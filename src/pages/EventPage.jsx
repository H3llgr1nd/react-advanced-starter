import React from 'react';
import { useLocation } from 'react-router-dom';
import EventCard from '../components/Events/EventCard'
import { Box, Text } from "@chakra-ui/react";


export const EventPage = () => {
  const location = useLocation();
  const event = location.state?.event;
  const isFromEventClick = location.state?.isFromEventClick;

  if (!event) {
    return (
      <Text>
        No event data available. Please select an event from the Events page.
      </Text>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <EventCard event={event} isFromEventClick={isFromEventClick} />
    </Box>
  )
};
