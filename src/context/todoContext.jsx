import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { toast } from 'sonner';
import {
  ADD_TODO,
  DELETE_TODO,
  FAIL,
  LOAD_TODO,
  REQUEST,
  SUCCESS,
  UPDATE_TODO,
} from '../constants/actions';
import crudReducer from '../reducers/crudReducer';
import loadingReducer from '../reducers/loadingReducer';
import errorReducer from '../reducers/errorReducer';

const TodoContext = createContext();

const todoInitialState = {
  todoList: [],
  filterType: 'all',
  loading: [],
  error: [],
};

const todoReducer = (
  state,
  {
    type,
    payload: {
      todoListPayload,
      loadingPayload,
      errorPayload,
      filterTypePayload,
    },
  },
) => ({
  todoList: crudReducer(state.todoList, { type, payload: todoListPayload }),
  filterType: filterTypePayload || state.filterType,
  loading: loadingReducer(state.loading, { type, payload: loadingPayload }),
  error: errorReducer(state.error, { type, payload: errorPayload }),
});

export function TodoProvider({ children }) {
  const [todoState, dispatch] = useReducer(todoReducer, todoInitialState);

  const inputRef = useRef();

  const loadTodo = useCallback(async (ft = 'all') => {
    try {
      dispatch({ type: `${LOAD_TODO}_${REQUEST}`, payload: {} });
      let url = 'http://localhost:3000/todoList';
      if (ft !== 'all') {
        url += `?isDone=${ft === 'completed' ? 1 : 0}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      dispatch({
        type: `${LOAD_TODO}_${SUCCESS}`,
        payload: {
          todoListPayload: json,
          filterTypePayload: ft,
        },
      });
    } catch (error) {
      toast('Event has been created.');

      dispatch({
        type: `${LOAD_TODO}_${FAIL}`,
        payload: {
          errorPayload: error,
        },
      });
    }
  }, []);

  const addTodo = useCallback(async e => {
    try {
      dispatch({ type: `${ADD_TODO}_${REQUEST}`, payload: {} });
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
      dispatch({
        type: `${ADD_TODO}_${SUCCESS}`,
        payload: { todoListPayload: json },
      });
      inputRef.current.value = '';
    } catch (error) {
      toast('Add Todo List Fail');
      dispatch({
        type: `${ADD_TODO}_${FAIL}`,
        payload: { errorPayload: error },
      });
    }
  }, []);

  const updateTodo = useCallback(async item => {
    try {
      dispatch({
        type: `${UPDATE_TODO}_${REQUEST}`,
        payload: { loadingPayload: item },
      });
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...item, isDone: !item.isDone }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();
      dispatch({
        type: `${UPDATE_TODO}_${SUCCESS}`,
        payload: { todoListPayload: json },
      });
    } catch (error) {
      dispatch({
        type: `${UPDATE_TODO}_${FAIL}`,
        payload: { errorPayload: item },
      });
    }
  }, []);

  const deleteTodo = useCallback(async item => {
    try {
      dispatch({
        type: `${DELETE_TODO}_${REQUEST}`,
        payload: { loadingPayload: item },
      });
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ ...item, isDone: !item.isDone }),
      });
      dispatch({
        type: `${DELETE_TODO}_${SUCCESS}`,
        payload: { todoListPayload: item },
      });
    } catch (error) {
      dispatch({
        type: `${DELETE_TODO}_${FAIL}`,
        payload: { errorPayload: item },
      });
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

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTodo = () => useContext(TodoContext);
