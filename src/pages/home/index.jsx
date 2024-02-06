import React from 'react';

import Banner from '../../containers/Banner';
import Categories from '../../containers/Categories';
import TopSales from '../../containers/TopSales';
import ProductsDivider from '../../containers/ProductsDivider';
import Blogs from '../../containers/Blogs';
import JoinUs from '../../containers/JoinUs';

function Home() {
  return (
    <div>
      <Banner />
      <Categories />
      <TopSales />
      <ProductsDivider />
      <Blogs />
      <JoinUs />
    </div>
  );
}

export default Home;
