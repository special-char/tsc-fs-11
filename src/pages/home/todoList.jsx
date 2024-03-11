import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoItem';

function TodoList({ data, onUpdateTodo, onDeleteTodo }) {
  console.log('TodoList render');
  return (
    <div className="flex-1">
      {data.map(item => (
        <TodoItem
          key={item.id}
          item={item}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}

TodoList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoList);
