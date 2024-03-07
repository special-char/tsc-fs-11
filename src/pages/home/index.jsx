import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import TodoForm from './todoForm';
import TodoFilter from './todoFilter';
import TodoList from './todoList';
import Pagination from './pagination';

const perPageItem = 5;

// export default class Home extends Component {
//   state = {
//     todoList: [],
//     filterType: 'all',
//     editMode: 0,
//     page: 1,
//     totalPages: 0,
//     apiStatus: [],
//   };

//   inputRef = createRef();

//   editRef = createRef();

//   async componentDidMount() {
//     this.loadTodo(1, 'all');
//   }

//   loadingAction = (action, id = -1) => {
//     this.setState(({ apiStatus }) => ({
//       apiStatus: [
//         ...apiStatus,
//         {
//           id,
//           action,
//           status: 'loading',
//         },
//       ],
//     }));
//   };

//   errorAction = (id, action, message) => {
//     this.setState(({ apiStatus }) => ({
//       apiStatus: apiStatus.map(x =>
//         (x.action === action, x.id === id)
//           ? { ...x, status: 'error', message }
//           : x,
//       ),
//     }));
//   };

//   successAction = (id, action) => {
//     this.setState(({ apiStatus }) => ({
//       apiStatus: apiStatus.filter(x => !(x.action === action && x.id === id)),
//     }));
//   };

//   loadTodo = async (currentPage, filterType = 'all') => {
//     const action = 'LOAD_TODO';
//     try {
//       this.loadingAction(action);
//       let url = `http://localhost:3000/todoList?_page=${currentPage}&_per_page=${perPageItem}`;

//       if (filterType !== 'all') {
//         url += `&isDone=${filterType === 'completed' ? 1 : 0}`;
//       }

//       const res = await fetch(url);
//       const json = await res.json();

//       this.setState(({ apiStatus }) => ({
//         todoList: json.data,
//         totalPages: json.pages,
//         page: currentPage,
//         filterType,
//         apiStatus: apiStatus.filter(x => x.action !== action),
//       }));
//     } catch (error) {
//       this.errorAction(action, error.message);
//     }
//   };

//   addTodo = async e => {
//     const action = 'ADD_TODO';
//     try {
//       this.loadingAction(action);

//       e.preventDefault();
//       const input = this.inputRef.current;

//       const res = await fetch('http://localhost:3000/todoList', {
//         method: 'POST',
//         body: JSON.stringify({
//           text: input.value,
//           isDone: false,
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//       });

//       const json = await res.json();

//       this.setState(
//         ({ todoList, apiStatus }) => ({
//           todoList: [...todoList, json],
//           apiStatus: apiStatus.filter(x => x.action !== action),
//         }),
//         () => {
//           input.value = '';
//         },
//       );
//     } catch (error) {
//       this.errorAction(action, error.message);
//     }
//   };

//   editTodo = async item => {
//     const action = 'EDIT_TODO';
//     try {
//       this.loadingAction(action, item.id);
//       const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
//         method: 'PUT',
//         body: JSON.stringify(item),
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//       });

//       const json = await res.json();

//       this.setState(({ todoList }) => {
//         const index = todoList.findIndex(x => x.id === item.id);
//         return {
//           todoList: [
//             ...todoList.slice(0, index),
//             json,
//             ...todoList.slice(index + 1),
//           ],
//           editMode: 0,
//         };
//       });
//       this.successAction(item.id, action);
//     } catch (error) {
//       this.errorAction(item.id, action, error.message);
//     }
//   };

//   deleteTodo = async item => {
//     const action = 'DELETE_TODO';
//     try {
//       this.loadingAction(action, item.id);
//       await fetch(`http://localhost:3000/todoList/${item.id}`, {
//         method: 'DELETE',
//       });

//       this.setState(({ todoList }) => {
//         const index = todoList.findIndex(x => x.id === item.id);
//         return {
//           todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
//         };
//       });
//       this.successAction(item.id, action);
//     } catch (error) {
//       this.errorAction(item.id, action, error.message);
//     }
//   };

//   render() {
//     const { todoList, filterType, editMode, page, totalPages, apiStatus } =
//       this.state;

//     console.log(apiStatus);

//     const loadTodoAction = apiStatus.find(x => x.action === 'LOAD_TODO');
//     const addTodoAction = apiStatus.find(x => x.action === 'ADD_TODO');

//     if (loadTodoAction?.status === 'loading') {
//       return <p>Loading....</p>;
//     }

//     if (loadTodoAction?.status === 'error') {
//       return <p>{loadTodoAction.message}</p>;
//     }

//     return (
//       <div className="flex flex-col items-center gap-4 h-screen">
//         <h1>Todo App</h1>
//         <form
//           onSubmit={this.addTodo}
//           className="flex w-full max-w-sm items-center"
//         >
//           <Input ref={this.inputRef} className="rounded-r-none" required />
//           <Button
//             type="submit"
//             className="rounded-l-none"
//             disabled={addTodoAction?.status === 'loading'}
//           >
//             {addTodoAction?.status === 'loading' && (
//               <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
//             )}
//             Button
//           </Button>
//         </form>
//         {addTodoAction?.status === 'error' && (
//           <p className="text-red-500">{addTodoAction?.message}</p>
//         )}
//         <div className="flex flex-col gap-6 w-full p-6 flex-1">
//           {todoList.map(x => (
//             <div key={x.id} className="flex items-center">
//               <Checkbox
//                 checked={x.isDone}
//                 disabled={apiStatus.some(
//                   y =>
//                     (y.action === 'EDIT_TODO' || y.action === 'DELETE_TODO') &&
//                     y.status === 'loading' &&
//                     y.id === x.id,
//                 )}
//                 onCheckedChange={() =>
//                   this.editTodo({ ...x, isDone: !x.isDone })
//                 }
//               />
//               {editMode === x.id ? (
//                 <form
//                   className="flex-1 mx-4 flex gap-4"
//                   onSubmit={e => {
//                     e.preventDefault();
//                     this.editTodo({
//                       ...x,
//                       text: this.editRef.current.value,
//                     });
//                   }}
//                 >
//                   <Input className="flex-1" ref={this.editRef} />
//                   <BorderButton
//                     type="submit"
//                     borderRadius="1.75rem"
//                     className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
//                     onClick={() => this.setState({ editMode: x.id })}
//                   >
//                     Submit
//                   </BorderButton>
//                 </form>
//               ) : (
//                 <p className={`flex-1 px-4${x.isDone ? ' line-through' : ''}`}>
//                   {x.text}
//                 </p>
//               )}

//               <Button
//                 type="button"
//                 className="mx-4"
//                 disabled={apiStatus.some(
//                   y =>
//                     (y.action === 'EDIT_TODO' || y.action === 'DELETE_TODO') &&
//                     y.status === 'loading' &&
//                     y.id === x.id,
//                 )}
//                 onClick={() =>
//                   this.setState({ editMode: x.id }, () => {
//                     this.editRef.current.value = x.text;
//                   })
//                 }
//               >
//                 Edit
//               </Button>
//               <ConfirmDelete onClick={() => this.deleteTodo(x)}>
//                 <Button
//                   disabled={apiStatus.some(
//                     y =>
//                       (y.action === 'EDIT_TODO' ||
//                         y.action === 'DELETE_TODO') &&
//                       y.status === 'loading' &&
//                       y.id === x.id,
//                   )}
//                 >
//                   Delete
//                 </Button>
//               </ConfirmDelete>
//             </div>
//           ))}
//           <Button
//             disabled={page >= totalPages}
//             onClick={() => this.loadTodo(page + 1, filterType)}
//           >
//             Next
//           </Button>
//           <Button
//             onClick={() => this.loadTodo(page - 1, filterType)}
//             disabled={page <= 1}
//           >
//             Previous
//           </Button>
//           <Toaster />
//         </div>
//         <div className="flex w-full">
//           <Button
//             className="flex-1 rounded-none"
//             variant={filterType === 'all' ? 'destructive' : 'default'}
//             onClick={() => this.loadTodo(page, 'all')}
//           >
//             All
//           </Button>
//           <Button
//             className="flex-1 rounded-none"
//             variant={filterType === 'pending' ? 'destructive' : 'default'}
//             onClick={() => this.loadTodo(1, 'pending')}
//           >
//             Pending
//           </Button>
//           <Button
//             className="flex-1 rounded-none"
//             variant={filterType === 'completed' ? 'destructive' : 'default'}
//             onClick={() => this.loadTodo(1, 'completed')}
//           >
//             Completed
//           </Button>
//         </div>
//         {/* {error && (
//           <div className="absolute top-4 right-4 bg-red-400 p-4 rounded-md text-white">
//             {error}
//           </div>
//         )} */}
//       </div>
//     );
//   }
// }

function Home() {
  const [todoList, setTodoList] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const inputRef = useRef();

  const loadTodo = useCallback(async (currentPage, ft = 'all') => {
    try {
      let url = `http://localhost:3000/todoList?_page=${currentPage}&_per_page=${perPageItem}`;

      if (ft !== 'all') {
        url += `&isDone=${ft === 'completed' ? 1 : 0}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      setTodoList(json.data);
      setTotalPages(json.pages);
      setPage(currentPage);
      setFilterType(ft);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addTodo = useCallback(async e => {
    try {
      e.preventDefault();
      const input = inputRef.current;

      const text = input.value;

      const res = await fetch('http://localhost:3000/todoList', {
        method: 'POST',
        body: JSON.stringify({
          text,
          isDone: false,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const json = await res.json();

      setTodoList(val => [...val, json]);

      input.value = '';
    } catch (error) {
      console.log(error);
    }
  }, []);

  const editTodo = useCallback(async item => {
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

      setTodoList(val => {
        const index = val.findIndex(x => x.id === item.id);
        return [...val.slice(0, index), json, ...val.slice(index + 1)];
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteTodo = useCallback(async item => {
    try {
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'DELETE',
      });

      setTodoList(val => {
        const index = val.findIndex(x => x.id === item.id);
        return [...val.slice(0, index), ...val.slice(index + 1)];
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadTodo(1, 'all');
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 h-screen">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} ref={inputRef} />
      <TodoList
        todoList={todoList}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        filterType={filterType}
        loadTodo={loadTodo}
      />
      <TodoFilter loadTodo={loadTodo} filterType={filterType} page={page} />
    </div>
  );
}

export default Home;
