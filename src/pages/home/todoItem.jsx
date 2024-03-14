import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import ConfirmDelete from '@/components/confirmDelete';
import { useTodo } from '../../context/todoContext';
import {
  DELETE_TODO,
  FAIL,
  REQUEST,
  UPDATE_TODO,
} from '../../constants/actions';

function TodoItem({ item }) {
  const { updateTodo, deleteTodo, action } = useTodo();

  const todoState = action.find(x => x.id === item.id);

  return (
    <>
      <div className="flex items-center m-4">
        <Checkbox
          className="disabled:bg-gray-300"
          onCheckedChange={() => updateTodo(item)}
          disabled={
            todoState?.task === UPDATE_TODO && todoState?.state === REQUEST
          }
          checked={item.isDone}
        />
        <p className="flex-1 px-4 line-clamp-1">{item.text}</p>

        <ConfirmDelete onClick={() => deleteTodo(item)}>
          <Button
            disabled={
              todoState?.task === DELETE_TODO && todoState?.state === REQUEST
            }
            className="disabled:bg-gray-300"
          >
            Delete
          </Button>
        </ConfirmDelete>
      </div>
      {todoState?.state === FAIL && (
        <p className="text-red-500 text-center">{todoState.message}</p>
      )}
    </>
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
