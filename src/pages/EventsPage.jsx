import React,  { useState, useEffect, useContext } from 'react';
import { Button, Flex, Grid, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import EventsList from '../components/Events/EventsList';
import AddEventModal from '../components/Events/Modals/AddEventModal';
import FilterByCategory from '../components/Events/FilterByCategory'
import SearchBar from '../components/Events/SearchBar';
import { EventContext } from '../components/EventProvider';

export const EventsPage = () => {
  const { events, setEvents, setCategories, setUsers } = useContext(EventContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchEvent, setSearchEvent] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const fetchData = async () => {
      const usersObject = await fetchUsers();
      const categoriesObject = await fetchCategories();
      fetchEvents(usersObject, categoriesObject);
    };
    fetchData();
  }, [])
  
  const fetchEvents = async (usersObject, categoriesObject) => {
      const events = await fetch('http://localhost:3000/events').then(response => response.json());
      const eventsArray = events.map(event => {
        const categoriesArray = event.categoryIds.map(categoryId => categoriesObject[categoryId]);
        return {
          ...event,
          categories: categoriesArray, 
          user: usersObject[event.createdBy]
        }
      });
      setEvents(eventsArray);
  }

  const fetchUsers = async () => {
    const users = await fetch('http://localhost:3000/users').then(response => response.json());
    const userObject = {}
    users.forEach(user => {
      const {id, name, image} = user;
      userObject[id] = {name, image, id};
    })
    setUsers(userObject);
    return userObject;
  }

  const fetchCategories = async () => {
    const categories = await fetch('http://localhost:3000/categories').then(response => response.json());
    const categoriesObject = {}
    categories.forEach(category => {
      const {id, name} = category;
      categoriesObject[id] = name;
    })
    setCategories(categoriesObject)
    return categoriesObject;
  }

  const filteredEventsBySearchText = (events) => {
    return events.filter(event => 
      event.title.toLowerCase().includes(searchEvent.toLowerCase()) ||
      event.description.toLowerCase().includes(searchEvent.toLowerCase())
    )  
  }

  const filteredEvents = () => {
    if (selectedCategories.length === 0) return filteredEventsBySearchText(events)

    const filteredEventsByCategory = events.filter((event) =>
      event.categories.some((category) => selectedCategories.includes(category))
    );

    return filteredEventsBySearchText(filteredEventsByCategory);
  }

  return (
    <>
      <Stack>
        <Heading alignSelf='center'>List of events</Heading>
      </Stack>
      <Flex justifyContent="space-between" alignItems="center" m={4}>
        <Button onClick={onOpen}>Add Event </Button>
        <FilterByCategory 
          selectedCategories={selectedCategories} 
          setSelectedCategories={setSelectedCategories}
        />
      </Flex>
      <SearchBar searchEvent={searchEvent} setSearchEvent={setSearchEvent}/>
      {events.length > 0 && (
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap="4" 
          p="4"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
        >
          <EventsList events={filteredEvents()} />
        </Grid>
      )}
      <AddEventModal 
        isOpen={isOpen}
        onClose={onClose} 
      />
    </>
  )
};
