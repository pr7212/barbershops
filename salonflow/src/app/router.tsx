// Import React and router tools so we can manage different pages
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import our main page component
import App from './App';

// Set up our app's routes (matching web addresses to webpage components)
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

// This is our main Router component that powers the navigation of our app
export function AppRouter() {
  return <RouterProvider router={router} />;
}