import React, { useEffect } from 'react';
import TodoForm from './todoForm';
import TodoList from './todoList';
import TodoFilter from './todoFilter';
import useTodo from '../../hooks/useTodo';

function Todo() {
  const {
    todoList,
    filterType,
    loadTodo,
    onAddTodo,
    onUpdateTodo,
    onDeleteTodo,
  } = useTodo();

  useEffect(() => {
    loadTodo();
  }, [loadTodo]);

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-center m-10">Todo App</h1>
      <TodoForm onAddTodo={onAddTodo} />
      <TodoList
        data={todoList}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
      />
      <TodoFilter filterType={filterType} loadTodo={loadTodo} />
    </div>
  );
}

export default Todo;
