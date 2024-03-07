import { Button } from '@/components/ui/button';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

function TodoFilter({ filterType, loadTodo, page }) {
  console.log('TodoFilter render');
  return (
    <div className="flex w-full">
      <Button
        className="flex-1 rounded-none"
        variant={filterType === 'all' ? 'destructive' : 'default'}
        onClick={() => loadTodo(page, 'all')}
      >
        All
      </Button>
      <Button
        className="flex-1 rounded-none"
        variant={filterType === 'pending' ? 'destructive' : 'default'}
        onClick={() => loadTodo(1, 'pending')}
      >
        Pending
      </Button>
      <Button
        className="flex-1 rounded-none"
        variant={filterType === 'completed' ? 'destructive' : 'default'}
        onClick={() => loadTodo(1, 'completed')}
      >
        Completed
      </Button>
    </div>
  );
}

TodoFilter.propTypes = {
  loadTodo: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  filterType: PropTypes.oneOf(['all', 'pending', 'completed']).isRequired,
};

export default memo(TodoFilter);
