import React, { Component } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default class Home extends Component {
  state = {
    todoText: '',
    todoList: [],
  };

  changeText = event => {
    console.log(event.target.value);
    this.setState({ todoText: event.target.value });
  };

  addTodo = event => {
    event.preventDefault();
    this.setState(({ todoText, todoList }) => ({
      todoList: [
        ...todoList,
        { id: new Date().valueOf(), text: todoText, isDone: false },
      ],
      todoText: '',
    }));
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

  render() {
    const { todoText, todoList } = this.state;

    return (
      <div className="flex flex-col items-center gap-4 h-screen">
        <h1>Todo App</h1>
        <form
          onSubmit={this.addTodo}
          className="flex w-full max-w-sm items-center"
        >
          <Input
            className="rounded-r-none"
            value={todoText}
            onChange={this.changeText}
            required
          />
          <Button type="submit" className="rounded-l-none">
            Button
          </Button>
        </form>
        <div className="flex flex-col gap-6 w-full p-6 flex-1">
          {todoList.map(item => (
            <div key={item.id} className="flex items-center">
              <Checkbox
                checked={item.isDone}
                onCheckedChange={() => this.toggleComplete(item)}
              />
              <p className="flex-1 px-4">{item.text}</p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => this.deleteTodo(item)}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
        <div className="flex w-full">
          <Button className="flex-1 rounded-none" variant="destructive">
            All
          </Button>
          <Button className="flex-1 rounded-none">Pending</Button>
          <Button className="flex-1 rounded-none">Completed</Button>
        </div>
      </div>
    );
  }
}
