import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import Header from './containers/Header';
import Banner from './containers/Banner';
import Categories from './containers/Categories';
import TopSales from './containers/TopSales';
import ProductsDivider from './containers/ProductsDivider';
import Blogs from './containers/Blogs';
import JoinUs from './containers/JoinUs';
import Footer from './containers/Footer';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// const cards = [
//   {
//     title: 'Natural',
//     imageUrl:
//       'https://template.hasthemes.com/brancy/brancy/assets/images/shop/category/6.webp',
//     className: 'bg-red-200 flex-grow flex-shrink-0 basis-44',
//     badge: 'new',
//   },
//   {
//     title: 'Hare Care',
//     imageUrl:
//       'https://template.hasthemes.com/brancy/brancy/assets/images/shop/category/1.webp',
//     className: 'bg-blue-200 flex-grow flex-shrink-0 basis-44',
//     badge: 'hot',
//   },
//   {
//     title: 'Skin Care',
//     imageUrl:
//       'https://template.hasthemes.com/brancy/brancy/assets/images/shop/category/2.webp',
//     className: 'bg-purple-200 flex-grow flex-shrink-0 basis-44',
//   },
//   {
//     title: 'Test Care',
//     imageUrl:
//       'https://template.hasthemes.com/brancy/brancy/assets/images/shop/category/2.webp',
//     className: 'bg-purple-200 flex-grow flex-shrink-0 basis-44',
//   },
// ];

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(
  <>
    <Header />
    <Banner />
    <Categories />
    <TopSales />
    <ProductsDivider />
    <Blogs />
    <JoinUs />
    <Footer />
  </>,
);
