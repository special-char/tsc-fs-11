import React, { memo } from 'react';

function Child2({ count }) {
  console.log('Child 2 render');
  return (
    <div>
      <h1>Child2 component</h1>
      <p>{count}</p>
    </div>
  );
}

export default memo(Child2, (prevProps, nextProps) => {
  return false;
});
