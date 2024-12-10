import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [categories, setCategories] = useState({});
    const [users, setUsers] = useState({});
    const [events, setEvents] = useState([]);

  return (
    <EventContext.Provider value={{ events, setEvents, users, setUsers, categories, setCategories }}>
      {children}
    </EventContext.Provider>
  );
};