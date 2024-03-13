import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import ConfirmDelete from '@/components/confirmDelete';
import { useTodo } from '../../context/todoContext';

function TodoItem({ item }) {
  const { updateTodo, deleteTodo } = useTodo();

  return (
    <div className="flex items-center m-4">
      <Checkbox
        onCheckedChange={() => updateTodo(item)}
        checked={item.isDone}
      />
      <p className="flex-1 px-4 line-clamp-1">{item.text}</p>

      <ConfirmDelete onClick={() => deleteTodo(item)}>
        <Button>Delete</Button>
      </ConfirmDelete>
    </div>
  );
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
};

export default memo(TodoItem);
