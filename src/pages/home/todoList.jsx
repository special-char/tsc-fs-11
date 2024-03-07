import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoItem';

function TodoList({ todoList, editTodo, deleteTodo }) {
  console.log('TodoList render');
  return (
    <div className="flex flex-col gap-6 w-full p-6 flex-1">
      {todoList.map(x => (
        <TodoItem
          key={x.id}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          todoItem={x}
        />
      ))}
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoList);
