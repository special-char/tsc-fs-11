import React, { Component, createRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoFilter from '@/components/todoFilter';
import TodoForm from '@/components/todoForm';
import TodoList from '@/components/todoList';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import ConfirmDelete from '@/components/confirmDelete';

const perPageItem = 5;

export default class Home extends Component {
  state = {
    todoList: [],
    filterType: 'all',
    editMode: 0,
    page: 1,
  };

  inputRef = createRef();

  editRef = createRef();

  async componentDidMount() {
    this.loadTodo();
  }

  loadTodo = async () => {
    try {
      const res = await fetch('http://localhost:3000/todoList');
      const json = await res.json();
      this.setState({ todoList: json });
    } catch (error) {}
  };

  addTodo = async e => {
    try {
      e.preventDefault();
      const input = this.inputRef.current;

      const res = await fetch('http://localhost:3000/todoList', {
        method: 'POST',
        body: JSON.stringify({
          text: input.value,
          isDone: false,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const json = await res.json();

      this.setState(
        ({ todoList }) => ({
          todoList: [...todoList, json],
        }),
        () => {
          input.value = '';
        },
      );
    } catch (error) {}
  };

  editTodo = async item => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const json = await res.json();

      this.setState(({ todoList }) => {
        const index = todoList.findIndex(x => x.id === item.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
          editMode: 0,
        };
      });
    } catch (error) {}
  };

  deleteTodo = async item => {
    try {
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'DELETE',
      });

      this.setState(({ todoList }) => {
        const index = todoList.findIndex(x => x.id === item.id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
    } catch (error) {}
  };

  changeFilterType = filterType => {
    this.setState({ filterType });
  };

  render() {
    const { todoList, filterType, editMode, page } = this.state;

    return (
      <div className="flex flex-col items-center gap-4 h-screen">
        <h1>Todo App</h1>
        <form
          onSubmit={this.addTodo}
          className="flex w-full max-w-sm items-center"
        >
          <Input ref={this.inputRef} className="rounded-r-none" required />
          <Button type="submit" className="rounded-l-none">
            Button
          </Button>
        </form>
        <div className="flex flex-col gap-6 w-full p-6 flex-1">
          {todoList
            .slice((page - 1) * perPageItem, page * perPageItem)
            .map(x => {
              if (
                filterType === 'all' ||
                (filterType === 'pending' && x.isDone === false) ||
                (filterType === 'completed' && x.isDone === true)
              ) {
                return (
                  <div key={x.id} className="flex items-center">
                    <Checkbox
                      checked={x.isDone}
                      onCheckedChange={() =>
                        this.editTodo({ ...x, isDone: !x.isDone })
                      }
                    />
                    {editMode === x.id ? (
                      <form
                        className="flex-1 mx-4 flex gap-4"
                        onSubmit={() =>
                          this.editTodo({
                            ...x,
                            text: this.editRef.current.value,
                          })
                        }
                      >
                        <Input className="flex-1" ref={this.editRef} />
                        <Button
                          type="submit"
                          className="mx-4"
                          onClick={() => this.setState({ editMode: x.id })}
                        >
                          Submit
                        </Button>
                      </form>
                    ) : (
                      <p
                        className={`flex-1 px-4${x.isDone ? ' line-through' : ''}`}
                      >
                        {x.text}
                      </p>
                    )}

                    <Button
                      type="button"
                      className="mx-4"
                      onClick={() =>
                        this.setState({ editMode: x.id }, () => {
                          this.editRef.current.value = x.text;
                        })
                      }
                    >
                      Edit
                    </Button>
                    <ConfirmDelete onClick={() => this.deleteTodo(x)} />
                  </div>
                );
              }
              return null;
            })}
          <Button
            onClick={() => this.setState(({ page }) => ({ page: page + 1 }))}
            disabled={page >= Math.ceil(todoList.length / perPageItem)}
          >
            Next
          </Button>
          <Button
            onClick={() => this.setState(({ page }) => ({ page: page - 1 }))}
            disabled={page <= 1}
          >
            Previous
          </Button>
        </div>
        <div className="flex w-full">
          <Button
            className="flex-1 rounded-none"
            variant={filterType === 'all' ? 'destructive' : 'default'}
            onClick={() => this.changeFilterType('all')}
          >
            All
          </Button>
          <Button
            className="flex-1 rounded-none"
            variant={filterType === 'pending' ? 'destructive' : 'default'}
            onClick={() => this.changeFilterType('pending')}
          >
            Pending
          </Button>
          <Button
            className="flex-1 rounded-none"
            variant={filterType === 'completed' ? 'destructive' : 'default'}
            onClick={() => this.changeFilterType('completed')}
          >
            Completed
          </Button>
        </div>
        {/* <TodoList
          todoList={todoList}
          filterType={filterType}
          deleteTodo={this.deleteTodo}
          toggleComplete={this.toggleComplete}
        />
        <TodoFilter
          filterType={filterType}
          changeFilterType={this.changeFilterType}
        /> */}
      </div>
    );
  }
}
