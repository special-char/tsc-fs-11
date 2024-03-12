import { useCallback, useState } from 'react';

const useTodo = () => {
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

  return {
    todoList,
    filterType,
    loadTodo,
    onAddTodo,
    onUpdateTodo,
    onDeleteTodo,
  };
};

export default useTodo;
