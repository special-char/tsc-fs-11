import { Button } from '@/components/ui/button';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

function Pagination({ page, totalPages, loadTodo, filterType }) {
  console.log('Pagination render');
  return (
    <div>
      <Button
        disabled={page >= totalPages}
        onClick={() => loadTodo(page + 1, filterType)}
      >
        Next
      </Button>
      <Button
        onClick={() => loadTodo(page - 1, filterType)}
        disabled={page <= 1}
      >
        Previous
      </Button>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  loadTodo: PropTypes.func.isRequired,
  filterType: PropTypes.oneOf(['all', 'pending', 'completed']).isRequired,
};

export default memo(Pagination);
