import React, { Component, createRef } from 'react';
import TodoFilter from '@/components/todoFilter';
import TodoForm from '@/components/todoForm';
import TodoList from '@/components/todoList';

export default class Home extends Component {
  state = {
    todoList: [],
    filterType: 'all',
  };

  inputRef = createRef();

  addTodo = event => {
    event.preventDefault();
    const inputText = this.inputRef.current;
    this.setState(
      ({ todoList }) => ({
        todoList: [
          ...todoList,
          {
            id: new Date().valueOf(),
            text: inputText.value,
            isDone: false,
          },
        ],
      }),
      () => {
        inputText.value = '';
      },
    );
  };

  toggleComplete = item => {
    console.log('toggleComplete');
    this.setState(({ todoList }) => {
      const index = todoList.findIndex(x => x.id === item.id);
      return {
        todoList: [
          ...todoList.slice(0, index),
          { ...item, isDone: !item.isDone },
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  deleteTodo = item => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex(x => x.id === item.id);
      return {
        todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
      };
    });
  };

  changeFilterType = filterType => {
    this.setState({ filterType });
  };

  render() {
    console.log('render');
    const { todoList, filterType } = this.state;

    return (
      <div className="flex flex-col items-center gap-4 h-screen">
        <h1>Todo App</h1>
        <TodoForm addTodo={this.addTodo} ref={this.inputRef} />
        <TodoList
          todoList={todoList}
          filterType={filterType}
          deleteTodo={this.deleteTodo}
          toggleComplete={this.toggleComplete}
        />
        <TodoFilter
          filterType={filterType}
          changeFilterType={this.changeFilterType}
        />
      </div>
    );
  }
}
