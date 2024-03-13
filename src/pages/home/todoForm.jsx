import React, { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useTodo } from '../../context/todoContext';

function TodoForm() {
  const { addTodo, inputRef, loading } = useTodo();
  return (
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
        disabled={loading}
      >
        Add Todo
      </Button>
    </form>
  );
}

export default memo(TodoForm);
