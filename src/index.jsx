import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import Card from './card';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(
  <div>
    <div className="flex gap-4 flex-wrap">
      <Card
        title="Natural"
        imageUrl="https://template.hasthemes.com/brancy/brancy/assets/images/shop/category/6.webp"
        className="bg-red-200 flex-grow flex-shrink-0 basis-44"
      />
      <Card
        title="Hare Care"
        imageUrl="https://template.hasthemes.com/brancy/brancy/assets/images/shop/category/1.webp"
        className="bg-blue-200 flex-grow flex-shrink-0 basis-44"
      />
      <Card
        title="Skin Care"
        imageUrl="https://template.hasthemes.com/brancy/brancy/assets/images/shop/category/2.webp"
        className="bg-purple-200 flex-grow flex-shrink-0 basis-44"
      />
    </div>
  </div>,
);
