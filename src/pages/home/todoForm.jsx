import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

const TodoForm = forwardRef(({ addTodo }, ref) => {
  console.log('TodoForm render');
  return (
    <form onSubmit={addTodo} className="flex w-full max-w-sm items-center">
      <Input ref={ref} className="rounded-r-none" required />
      <Button type="submit" className="rounded-l-none">
        Button
      </Button>
    </form>
  );
});

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default memo(TodoForm);
