/* eslint-disable max-classes-per-file */
import React from 'react';
import { createRoot } from 'react-dom/client';
// import { Toaster } from '@/components/ui/sonner';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './style.css';
import Home from './pages/home';
import About from './pages/about';
import DashboardLayout from './layout/dashboardLayout';
import Products from './pages/products';
import ProductDetails from './pages/productDetails';
import TickTack from './pages/tickTack';
import { TodoProvider } from './context/todoContext';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <TodoProvider>
            <Home />
          </TodoProvider>
        ),
      },
      {
        path: 'ticktock',
        element: <TickTack />,
      },
      {
        path: 'products',
        element: <Products />,
        children: [
          {
            path: ':id',
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

// const HOC = WrappedComponent => {
//   class HOCComponent extends Component {
//     state = {
//       counter: 0,
//     };

//     increment = () => {
//       this.setState(({ counter }) => ({
//         counter: counter + 1,
//       }));
//     };

//     render() {
//       const { counter } = this.state;
//       return <WrappedComponent counter={counter} increment={this.increment} />;
//     }
//   }

//   return HOCComponent;
// };

// class App extends Component {
//   render() {
//     const { counter, increment } = this.props;
//     return (
//       <div>
//         <h1>{counter}</h1>
//         <button type="button" onClick={increment}>
//           Increment
//         </button>
//       </div>
//     );
//   }
// }

// const WrappedApp = HOC(App);

// class Test extends Component {
//   render() {
//     const { counter, increment } = this.props;
//     return (
//       <div>
//         <h1>{counter}</h1>
//         <button type="button" onClick={increment}>
//           Increment
//         </button>
//       </div>
//     );
//   }
// }

// const WrappedTest = HOC(Test);

// getDerivedStateFromProps
// GetSnapshotbeforeupdate
// geDerivedStatefromError
// componentnDidMout

// function Test({ counter }) {
//   useEffect(() => {
//     const mouseMove = () => {
//       console.log('mouse move');
//     };

//     document.addEventListener('mousemove', mouseMove);

//     // componentWillUnmount
//     return () => {
//       document.removeEventListener('mousemove', mouseMove);
//     };
//   }, []);

//   return (
//     <div>
//       <h1>{counter}</h1>
//     </div>
//   );
// }

// function App({ number }) {
//   const [counter, setCounter] = useState(() => number * 10);
//   const [name, setName] = useState('');
//   const isMounted = useRef(false);

//   const increment = () => {
//     setCounter(val => val + 1);
//   };

//   const decrement = () => {
//     setCounter(val => val - 1);
//   };

//   // componentDidMount

//   // compoentnDidmount
//   // componentDidUpdate
//   useEffect(() => {
//     if (isMounted.current) {
//       console.log('use effect for name');
//     }
//   }, [name]);

//   useEffect(() => {
//     if (isMounted.current) {
//       console.log('use effect for name and counter');
//     }
//   }, [name, counter]);

//   useEffect(() => {
//     console.log('use effect');
//     isMounted.current = true;
//   }, []);

//   return (
//     <div>
//       <p> {counter}</p>
//       <button type="button" onClick={increment}>
//         Increment
//       </button>
//       <button type="button" onClick={decrement}>
//         Decrement
//       </button>
//       <p>{name}</p>
//       <button type="button" onClick={() => setName('yagnesh')}>
//         Change name
//       </button>
//       {counter < 15 && <Test counter={counter} />}
//     </div>
//   );
// }

// App.propTypes = {
//   number: PropTypes.number.isRequired,
// };

const root = createRoot(document.getElementById('app'));
root.render(
  <>
    {/* <WrappedApp /> */}
    {/* <WrappedTest /> */}
    <RouterProvider router={router} />
  </>,
);
