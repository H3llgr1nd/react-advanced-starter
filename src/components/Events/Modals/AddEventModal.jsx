import React, { useContext } from 'react';
import {
  Box,
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalBody, 
  ModalCloseButton, 
  ModalHeader,
  FormControl,
  FormLabel,
  Select,
  Input,
  FormErrorMessage,
  Stack,
  Checkbox,
  CheckboxGroup,
  HStack
} from "@chakra-ui/react"
import { useFormik } from 'formik';
import { validateForm } from './utils';
import { EventContext } from '../../EventProvider';
const AddEventModal = ({isOpen, onClose}) => {
  const { categories, users, setEvents } = useContext(EventContext);

  const formik = useFormik({
    initialValues: {
      user: '',
      title: '',
      description: '',
      imageUrl: '',
      categories: [],
      location: '',
      startTime: '',
      endTime: '',
    },
    validate: (values) => {
      return validateForm(values)
    },
    onSubmit: (values) => {
      const {
        user, 
        title, 
        description, 
        imageUrl, 
        categories: categoriesFromForm, 
        location,
        startTime, 
        endTime 
      } = values;

      fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },    
        body: JSON.stringify({
          "createdBy": parseInt(user),
          "title": title,
          "description": description,
          "image": imageUrl,
          "categoryIds": categoriesFromForm.map(category => parseInt(category)),
          "location": location,
          "startTime": (new Date(startTime)).toISOString().slice(0, 16),
          "endTime": (new Date(endTime)).toISOString().slice(0, 16)
        })
      })
      .then(response => response.json())
      .then(resp => {
        const addedEvent = {
          ...resp,
          categories: resp.categoryIds.map(categoryId => categories[categoryId]),
          user: users[resp.createdBy]
        }
        setEvents((prevEvents) => [...prevEvents, addedEvent]);
        formik.resetForm()
        onClose()
      })
    }
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box as="form" onSubmit={formik.handleSubmit} maxWidth="500px" mx="auto">
              <FormControl isInvalid={formik.errors.user && formik.touched.user} isRequired>
                <FormLabel>User</FormLabel>
                <Select
                  name="user"
                  placeholder="Select a user"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.user}
                >
                  {Object.values(users).map((user) => (
                    <option key={`${user.id} - ${user.name}`} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{formik.errors.user}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.title && formik.touched.title} mt={4} isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  placeholder="Add a title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
                <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.description && formik.touched.description}
                mt={4}
                isRequired
              >
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  placeholder="Add a description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.imageUrl && formik.touched.imageUrl}
                mt={4}
                isRequired
              >
                <FormLabel>Image URL</FormLabel>
                <Input
                  name="imageUrl"
                  placeholder="Add an image URL"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.imageUrl}
                />
                <FormErrorMessage>{formik.errors.imageUrl}</FormErrorMessage>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Categories</FormLabel>
                <CheckboxGroup
                  name="categories" // Name matches the formik field
                  value={formik.values.categories} // Bind formik's categories value
                  onChange={(values) => formik.setFieldValue("categories", values)} // Update formik
                >
                  <HStack spacing='24px'>
                    {Object.entries(categories).map(([key, value]) => (
                      <Checkbox key={key} value={key}>
                        {value}
                      </Checkbox>
                    ))}
                  </HStack>
                </CheckboxGroup>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.location && formik.touched.location}
                mt={4}
                isRequired
              >
                <FormLabel>Location</FormLabel>
                <Input
                  name="location"
                  placeholder="Add a location"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                />
                <FormErrorMessage>{formik.errors.location}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.startTime && formik.touched.startTime}
                mt={4}
                isRequired
              >
                <FormLabel>Start Time</FormLabel>
                <Input
                  type="datetime-local"
                  name="startTime"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startTime}
                />
                <FormErrorMessage>{formik.errors.startTime}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.endTime && formik.touched.endTime}
                mt={4}
                isRequired
              >
                <FormLabel>End Time</FormLabel>
                <Input
                  type="datetime-local"
                  name="endTime"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.endTime}
                />
                <FormErrorMessage>{formik.errors.endTime}</FormErrorMessage>
              </FormControl>
              <Stack direction='row-reverse' spacing={4}>
                <Button mt={6} colorScheme="blue" onClick={onClose}>
                  Close
                </Button>
                <Button mt={6} colorScheme="blue" type="submit">
                  Submit
                </Button>
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};

export default AddEventModal;