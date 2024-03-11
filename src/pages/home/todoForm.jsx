import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function TodoForm({ onAddTodo }) {
  console.log('TodoForm render');
  const inputRef = useRef();

  const addTodo = async e => {
    try {
      e.preventDefault();
      const res = await fetch('http://localhost:3000/todoList', {
        method: 'POST',
        body: JSON.stringify({
          isDone: false,
          text: inputRef.current.value,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();
      onAddTodo(json);
    } catch (error) {
      console.log(error);
    }
  };

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
      <Button type="submit" className="rounded-l-none">
        Add Todo
      </Button>
    </form>
  );
}

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default memo(TodoForm);
