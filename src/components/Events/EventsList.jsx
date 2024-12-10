import React from 'react';
import EventCard from "./EventCard"

const EventsList = ({events}) => {
  return ( events.map(event => <EventCard key={event.id} event={event} />));
};

export default EventsList;