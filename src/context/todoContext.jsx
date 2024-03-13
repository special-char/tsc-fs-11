import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

const TodoContext = createContext();

const todoInitialState = {
  todoList: [],
  filterType: 'all',
  loading: false,
  error: null,
};

const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOAD_TODO_REQUEST':
    case 'ADD_TODO_REQUEST':
    case 'UPDATE_TODO_REQUEST':
    case 'DELETE_TODO_REQUEST':
      return { ...state, loading: true };

    case 'LOAD_TODO_SUCCESS':
      return { ...state, loading: false, ...payload };

    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        loading: false,
        todoList: [...state.todoList, payload],
      };

    case 'UPDATE_TODO_SUCCESS': {
      const index = state.todoList.findIndex(x => x.id === payload.id);
      return {
        ...state,
        loading: false,
        todoList: [
          ...state.todoList.slice(0, index),
          payload,
          ...state.todoList.slice(index + 1),
        ],
      };
    }

    case 'DELETE_TODO_SUCCESS': {
      const index = state.todoList.findIndex(x => x.id === payload.id);
      return {
        ...state,
        loading: false,
        todoList: [
          ...state.todoList.slice(0, index),
          ...state.todoList.slice(index + 1),
        ],
      };
    }

    case 'LOAD_TODO_FAIL':
    case 'ADD_TODO_FAIL':
    case 'UPDATE_TODO_FAIL':
    case 'DELETE_TODO_FAIL':
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export function TodoProvider({ children }) {
  const [todoState, dispatch] = useReducer(todoReducer, todoInitialState);

  const inputRef = useRef();

  const loadTodo = useCallback(async (ft = 'all') => {
    try {
      dispatch({ type: 'LOAD_TODO_REQUEST' });
      let url = 'http://localhost:3000/todoList';
      if (ft !== 'all') {
        url += `?isDone=${ft === 'completed' ? 1 : 0}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      dispatch({
        type: 'LOAD_TODO_SUCCESS',
        payload: { todoList: json, filterType: ft },
      });
    } catch (error) {
      dispatch({ type: 'LOAD_TODO_FAIL', payload: error });
    }
  }, []);

  const addTodo = useCallback(async e => {
    try {
      dispatch({ type: 'ADD_TODO_REQUEST' });
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
      dispatch({ type: 'ADD_TODO_SUCCESS', payload: json });
      inputRef.current.value = '';
    } catch (error) {
      dispatch({ type: 'ADD_TODO_FAIL', payload: error });
    }
  }, []);

  const updateTodo = useCallback(async item => {
    try {
      dispatch({ type: 'UPDATE_TODO_REQUEST' });
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...item, isDone: !item.isDone }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();
      dispatch({ type: 'UPDATE_TODO_SUCCESS', payload: json });
    } catch (error) {
      dispatch({ type: 'UPDATE_TODO_FAIL', payload: error });
    }
  }, []);

  const deleteTodo = useCallback(async item => {
    try {
      dispatch({ type: 'DELETE_TODO_REQUEST' });
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ ...item, isDone: !item.isDone }),
      });
      dispatch({ type: 'DELETE_TODO_SUCCESS', payload: item });
    } catch (error) {
      dispatch({ type: 'DELETE_TODO_FAIL', payload: item });
    }
  }, []);

  useEffect(() => {
    loadTodo();
  }, [loadTodo]);

  const value = useMemo(
    () => ({
      ...todoState,
      inputRef,
      loadTodo,
      addTodo,
      updateTodo,
      deleteTodo,
    }),
    [todoState, inputRef, loadTodo, addTodo, updateTodo, deleteTodo],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export const useTodo = () => useContext(TodoContext);
