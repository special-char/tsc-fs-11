import React, { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useTodo } from '../../context/todoContext';
import { ADD_TODO } from '../../constants/actions';

function TodoForm() {
  const { addTodo, inputRef, action } = useTodo();

  const addTodoState = action.find(x => x.task === ADD_TODO);

  return (
    <>
      <form className="flex mx-auto my-4" onSubmit={addTodo}>
        <div>
          <Label htmlFor="todoText" className="sr-only">
            Email
          </Label>
          <Input
            ref={inputRef}
            id="todoText"
            placeholder="Add your todo here...."
            className="rounded-r-none"
          />
        </div>
        <Button
          type="submit"
          className="rounded-l-none disabled:bg-slate-300 disabled:cursor-wait"
          disabled={addTodoState?.state === 'LOADING'}
        >
          Add Todo
        </Button>
      </form>
      {addTodoState?.state === 'ERROR' && (
        <p className="text-red-500 text-center">{addTodoState.message}</p>
      )}
    </>
  );
}

export default memo(TodoForm);
