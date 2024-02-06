import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <a href="#">Logo</a>
      <nav>
        <ul>
          <li>
            <Link to="/">Item 1</Link>
          </li>
          <li>
            <Link to="about">Item 2</Link>
          </li>
          <li>
            <Link to="products">Products</Link>
          </li>
          <li>
            <a href="#item4">Item 4</a>
          </li>
          <li>
            <a href="#item5">Item 5</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
