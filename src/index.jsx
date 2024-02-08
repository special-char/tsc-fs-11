import React, { Component } from 'react';
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

Home.getDerivedStateFromProps = (props, state) => {
  console.log('getDerivedStateFromProps');
  console.log(document.getElementById('title'));
  return {
    greet: `Hello from ${props.title}`,
  };
};

class Test extends Component {
  state = {
    title: 'Home Page',
  };

  render() {
    const { title } = this.state;
    return (
      <>
        {/* <Home title={title} desc="home page description" />
        
        new Home({title: title, desc: "" })*/}
        <p>{title}</p>
        <button
          type="button"
          onClick={() => this.setState({ title: 'About Page' })}
        >
          Change Title
        </button>
      </>
    );
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Test />,
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
