import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import ConfirmDelete from '@/components/confirmDelete';

function TodoItem({ item, onDeleteTodo, onUpdateTodo }) {
  console.log('TodoItem render');

  const confirmDelete = useCallback(async () => {
    try {
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'DELETE',
      });
      onDeleteTodo(item);
    } catch (error) {
      console.log(error);
    }
  }, [item, onDeleteTodo]);

  const onUpdateItem = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...item, isDone: !item.isDone }),
      });
      const json = await res.json();
      onUpdateTodo(json);
    } catch (error) {
      console.log(error);
    }
  }, [onUpdateTodo]);

  return (
    <div className="flex items-center m-4">
      <Checkbox onCheckedChange={onUpdateItem} checked={item.isDone} />
      <p className="flex-1 px-4 line-clamp-1">{item.text}</p>
      <ConfirmDelete onClick={confirmDelete}>
        <Button>Delete</Button>
      </ConfirmDelete>
    </div>
  );
}

TodoItem.propTypes = {
  onDeleteTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
};

export default memo(TodoItem);
