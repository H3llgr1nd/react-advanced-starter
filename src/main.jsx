import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EventPage } from './pages/EventPage';
import { EventsPage } from './pages/EventsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import { EventProvider } from './components/EventProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/events',
        element: <EventsPage />,
        // loader: postListLoader,
      },
      {
        path: '/event/:eventId',
        element: <EventPage />,
        // loader: postLoader,
        // action: addComment,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <EventProvider>
        <RouterProvider router={router} />
      </EventProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
