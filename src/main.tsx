import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import HomePage from "./pages/HomePage";
import {PropertyDetailPage} from "./pages/PropertyDetailPage";
import {BookingsPage} from "./pages/BookingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/property/:slug",
    element: <PropertyDetailPage />,
  },
  {
    path: "/bookings",
    element: <BookingsPage />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
