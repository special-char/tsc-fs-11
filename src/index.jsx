import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import Card from './card';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

const cards = [
  {
    title: 'Natural',
    imageUrl:
      'https://template.hasthemes.com/brancy/brancy/assets/images/shop/category/6.webp',
    className: 'bg-red-200 flex-grow flex-shrink-0 basis-44',
    badge: 'new',
  },
  {
    title: 'Hare Care',
    imageUrl:
      'https://template.hasthemes.com/brancy/brancy/assets/images/shop/category/1.webp',
    className: 'bg-blue-200 flex-grow flex-shrink-0 basis-44',
    badge: 'hot',
  },
  {
    title: 'Skin Care',
    imageUrl:
      'https://template.hasthemes.com/brancy/brancy/assets/images/shop/category/2.webp',
    className: 'bg-purple-200 flex-grow flex-shrink-0 basis-44',
  },
  {
    title: 'Test Care',
    imageUrl:
      'https://template.hasthemes.com/brancy/brancy/assets/images/shop/category/2.webp',
    className: 'bg-purple-200 flex-grow flex-shrink-0 basis-44',
  },
];

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(
  <div>
    <div className="flex gap-4 flex-wrap">
      {cards.map(x => (
        <Card
          title={x.title}
          imageUrl={x.imageUrl}
          className={x.className}
          badge={x.badge}
        />
      ))}
    </div>
  </div>,
);
