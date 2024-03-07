import ConfirmDelete from '@/components/confirmDelete';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button as BorderButton } from '@/components/ui/moving-border';
import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function TodoItem({ editTodo, deleteTodo, todoItem }) {
  const [editMode, setEditMode] = useState('');
  const editRef = useRef();

  useEffect(() => {
    if (editMode && editRef.current) {
      editRef.current.value = todoItem.text;
    }
  }, [editMode]);

  return (
    <div className="flex items-center">
      <Checkbox
        checked={todoItem.isDone}
        onCheckedChange={() =>
          editTodo({ ...todoItem, isDone: !todoItem.isDone })
        }
      />
      {editMode === todoItem.id ? (
        <form
          className="flex-1 mx-4 flex gap-4"
          onSubmit={e => {
            e.preventDefault();
            editTodo({
              ...todoItem,
              text: editRef.current.value,
            });
            setEditMode('');
          }}
        >
          <Input className="flex-1" ref={editRef} />
          <BorderButton
            type="submit"
            borderRadius="1.75rem"
            className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Submit
          </BorderButton>
        </form>
      ) : (
        <p className={`flex-1 px-4${todoItem.isDone ? ' line-through' : ''}`}>
          {todoItem.text}
        </p>
      )}

      <Button
        type="button"
        className="mx-4"
        onClick={() => {
          setEditMode(todoItem.id);
        }}
      >
        Edit
      </Button>
      <ConfirmDelete onClick={() => deleteTodo(todoItem)}>
        <Button>Delete</Button>
      </ConfirmDelete>
    </div>
  );
}

TodoItem.propTypes = {
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todoItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
};

export default memo(TodoItem);
