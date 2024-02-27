import React, { Component, createRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import ConfirmDelete from '@/components/confirmDelete';
import { Toaster } from '@/components/ui/toaster';

const perPageItem = 5;

export default class Home extends Component {
  state = {
    todoList: [],
    filterType: 'all',
    editMode: 0,
    page: 1,
    totalPages: 0,
  };

  inputRef = createRef();

  editRef = createRef();

  async componentDidMount() {
    this.loadTodo(1, 'all');
  }

  loadTodo = async (currentPage, filterType = 'all') => {
    try {
      let url = `http://localhost:3000/todoList?_page=${currentPage}&_per_page=${perPageItem}`;

      if (filterType !== 'all') {
        url += `&isDone=${filterType === 'completed' ? 1 : 0}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      this.setState({
        todoList: json.data,
        totalPages: json.pages,
        page: currentPage,
        filterType,
      });
    } catch (error) {
      console.error(error);
    }
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
    } catch (error) {
      console.error(error);
    }
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
    } catch (error) {
      console.error(error);
    }
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
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { todoList, filterType, editMode, page, totalPages } = this.state;

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
          {todoList.map(x => (
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
                  onSubmit={e => {
                    e.preventDefault();
                    this.editTodo({
                      ...x,
                      text: this.editRef.current.value,
                    });
                  }}
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
                <p className={`flex-1 px-4${x.isDone ? ' line-through' : ''}`}>
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
          ))}
          <Button
            disabled={page >= totalPages}
            onClick={() => this.loadTodo(page + 1, filterType)}
          >
            Next
          </Button>
          <Button
            onClick={() => this.loadTodo(page - 1, filterType)}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <Toaster />
        </div>
        <div className="flex w-full">
          <Button
            className="flex-1 rounded-none"
            variant={filterType === 'all' ? 'destructive' : 'default'}
            onClick={() => this.loadTodo(page, 'all')}
          >
            All
          </Button>
          <Button
            className="flex-1 rounded-none"
            variant={filterType === 'pending' ? 'destructive' : 'default'}
            onClick={() => this.loadTodo(1, 'pending')}
          >
            Pending
          </Button>
          <Button
            className="flex-1 rounded-none"
            variant={filterType === 'completed' ? 'destructive' : 'default'}
            onClick={() => this.loadTodo(1, 'completed')}
          >
            Completed
          </Button>
        </div>
      </div>
    );
  }
}
