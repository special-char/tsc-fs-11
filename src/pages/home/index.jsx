import React, { useCallback, useEffect, useState } from 'react';
import TodoForm from './todoForm';
import TodoList from './todoList';
import TodoFilter from './todoFilter';

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [filterType, setFilterType] = useState('all');

  const loadTodo = useCallback(async (ft = 'all') => {
    try {
      let url = 'http://localhost:3000/todoList';
      if (ft !== 'all') {
        url += `?isDone=${ft === 'completed' ? 1 : 0}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      setTodoList(json);
      setFilterType(ft);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onAddTodo = useCallback(
    todoItem => setTodoList(val => [...val, todoItem]),
    [],
  );

  const onUpdateTodo = useCallback(todoItem => {
    setTodoList(val => {
      const index = val.findIndex(x => x.id === todoItem.id);
      return [...val.slice(0, index), todoItem, ...val.slice(index + 1)];
    });
  }, []);

  const onDeleteTodo = useCallback(todoItem => {
    setTodoList(val => {
      const index = val.findIndex(x => x.id === todoItem.id);
      return [...val.slice(0, index), ...val.slice(index + 1)];
    });
  }, []);

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
