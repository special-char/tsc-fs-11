import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import {
  ADD_TODO,
  DELETE_TODO,
  FAIL,
  LOAD_TODO,
  REQUEST,
  SUCCESS,
  UPDATE_TODO,
} from '../constants/actions';

const TodoContext = createContext();

const todoInitialState = {
  todoList: [],
  filterType: 'all',
  action: [],
};

const loadingReducer = (state, { type, payload }) => {
  const match = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);
  if (!match) return state;
  const [, task, action] = match;

  if (action === 'REQUEST') {
    return [...state, { task, state: action, id: payload?.id || -1 }];
  }

  return state.filter(x => !(x.task === task));
};

const errorReducer = (state, { type, payload }) => {
  const match = /(.*)_(REQUEST|FAIL)/.exec(type);
  if (!match) return state;
  const [, task, action] = match;

  if (action === 'FAIL') {
    return state.map(x => {
      if (x.task === task && x.state === REQUEST && x.id === payload?.id) {
        return { ...x, state: action, ...payload };
      }
      return x;
    });
  }

  return state.filter(x => !(x.task === action));
};

const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case `${LOAD_TODO}_${REQUEST}`:
      return {
        ...state,
        action: [...state.action, { task: LOAD_TODO, state: REQUEST }],
      };

    case `${ADD_TODO}_${REQUEST}`:
      return {
        ...state,
        action: [...state.action, { task: ADD_TODO, state: REQUEST }],
      };

    case `${UPDATE_TODO}_${REQUEST}`:
      return {
        ...state,
        action: [
          ...state.action,
          { task: UPDATE_TODO, state: REQUEST, id: payload.id },
        ],
      };

    case `${DELETE_TODO}_${REQUEST}`:
      return {
        ...state,
        action: [
          ...state.action,
          { task: DELETE_TODO, state: REQUEST, id: payload.id },
        ],
      };

    case `${LOAD_TODO}_${SUCCESS}`:
      return {
        ...state,
        ...payload,
        action: state.action.filter(x => x.task !== LOAD_TODO),
      };

    case `${ADD_TODO}_${SUCCESS}`:
      return {
        ...state,
        action: state.action.filter(x => x.task !== ADD_TODO),
        todoList: [...state.todoList, payload],
      };

    case `${UPDATE_TODO}_${SUCCESS}`: {
      const index = state.todoList.findIndex(x => x.id === payload.id);
      return {
        ...state,
        action: state.action.filter(
          x => !(x.task === UPDATE_TODO && x.id === payload.id),
        ),
        todoList: [
          ...state.todoList.slice(0, index),
          payload,
          ...state.todoList.slice(index + 1),
        ],
      };
    }

    case `${DELETE_TODO}_${SUCCESS}`: {
      const index = state.todoList.findIndex(x => x.id === payload.id);
      return {
        ...state,
        action: state.action.filter(
          x => !(x.task === DELETE_TODO && x.id === payload.id),
        ),
        todoList: [
          ...state.todoList.slice(0, index),
          ...state.todoList.slice(index + 1),
        ],
      };
    }

    case `${LOAD_TODO}_${FAIL}`:
      return {
        ...state,
        loading: false,
        action: state.action.map(x => {
          if (x.task === LOAD_TODO && x.state === REQUEST) {
            return { ...x, state: FAIL, message: 'Load Todo Failed' };
          }
          return x;
        }),
      };

    case `${ADD_TODO}_${FAIL}`:
      return {
        ...state,
        loading: false,
        action: state.action.map(x => {
          if (x.task === ADD_TODO && x.state === REQUEST) {
            return { ...x, state: FAIL, message: 'Load Todo Failed' };
          }
          return x;
        }),
      };

    case `${UPDATE_TODO}_${FAIL}`:
      return {
        ...state,
        action: state.action.map(x => {
          if (
            (x.task === UPDATE_TODO && x.state === REQUEST, x.id === payload.id)
          ) {
            return { ...x, state: FAIL, message: 'Update Todo Failed' };
          }
          return x;
        }),
      };

    case `${DELETE_TODO}_${FAIL}`:
      return {
        ...state,
        action: state.action.map(x => {
          if (
            (x.task === DELETE_TODO && x.state === REQUEST, x.id === payload.id)
          ) {
            return { ...x, state: FAIL, message: 'DELETE Todo Failed' };
          }
          return x;
        }),
      };

    default:
      return state;
  }
};

export function TodoProvider({ children }) {
  const [todoState, dispatch] = useReducer(todoReducer, todoInitialState);

  console.log(todoState);

  const inputRef = useRef();

  const loadTodo = useCallback(async (ft = 'all') => {
    try {
      dispatch({ type: `${LOAD_TODO}_${REQUEST}` });
      let url = 'http://localhost:3000/todoList';
      if (ft !== 'all') {
        url += `?isDone=${ft === 'completed' ? 1 : 0}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      dispatch({
        type: `${LOAD_TODO}_${SUCCESS}`,
        payload: { todoList: json, filterType: ft },
      });
    } catch (error) {
      dispatch({ type: `${LOAD_TODO}_${FAIL}`, payload: error });
    }
  }, []);

  const addTodo = useCallback(async e => {
    try {
      dispatch({ type: `${ADD_TODO}_${REQUEST}` });
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
      dispatch({ type: `${ADD_TODO}_${SUCCESS}`, payload: json });
      inputRef.current.value = '';
    } catch (error) {
      dispatch({ type: `${ADD_TODO}_${FAIL}`, payload: error });
    }
  }, []);

  const updateTodo = useCallback(async item => {
    try {
      dispatch({ type: `${UPDATE_TODO}_${REQUEST}`, payload: item });
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...item, isDone: !item.isDone }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();
      dispatch({ type: `${UPDATE_TODO}_${SUCCESS}`, payload: json });
    } catch (error) {
      dispatch({ type: `${UPDATE_TODO}_${FAIL}`, payload: item });
    }
  }, []);

  const deleteTodo = useCallback(async item => {
    try {
      dispatch({ type: `${DELETE_TODO}_${REQUEST}`, payload: item });
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ ...item, isDone: !item.isDone }),
      });
      dispatch({ type: `${DELETE_TODO}_${SUCCESS}`, payload: item });
    } catch (error) {
      dispatch({ type: `${DELETE_TODO}_${FAIL}`, payload: item });
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
