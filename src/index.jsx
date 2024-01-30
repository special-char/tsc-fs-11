import React from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';
import './style.css';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

const bgColor = 'red';
const color = 'white';

// first letter of the component should be capital
// return only single element
// insted of class use classname
// apply inline css as object instead of string
// instead of kabab case use camelcase
function App() {
  return (
    <>
      <h1
        style={{
          backgroundColor: true ? bgColor : 'green',
          color,
        }}
      >
        Hello world
      </h1>
      <h2>Hello Wolrd from h2</h2>
    </>
  );
}

function Test({ title, desc }) {
  return (
    <div>
      <h1 className="bg-red-300">{title}</h1>
      <h2>{desc}</h2>
    </div>
  );
}

Test.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(
  <div>
    <input type="text" />
    <App />
    <Test title="hello test1" desc="lorem 1" />
    <Test title="hello test2" desc="lorem 2" />
    <Test title="hello test3" desc="lorem 3" />
    <Test title="hello test4" desc="lorem 4" />
    <Test title="hello test5" desc="lorem 5" />
    <Test title="hello test6" desc="lorem 6" />
  </div>,
);
