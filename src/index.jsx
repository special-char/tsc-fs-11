import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './style.css';
import Home from './pages/home';
import About from './pages/about';
import DashboardLayout from './layout/dashboardLayout';
import Products from './pages/products';
import ProductDetails from './pages/productDetails';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
        children: [
          {
            path: ':id',
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById('app'));
root.render(<RouterProvider router={router} />);
