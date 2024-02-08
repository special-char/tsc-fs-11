import React, { Component } from 'react';

// Mounting
// -> Constructor

// Updating

// Unmounting

// Error

export default class Home extends Component {
  // derive state based on props
  // bind method
  // analytics
  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      count: 0,
      name: 'yagnesh',
      data: null,
      // greet: `Hello from ${props.title}`,
    };

    console.log(document.getElementById('title'));
    // this.increment = this.increment.bind(this);
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log('getDerivedStateFromProps');
  //   console.log(document.getElementById('title'));
  //   return {
  //     greet: `Hello from ${props.title}`,
  //   };
  // }

  async componentDidMount() {
    document.addEventListener('copy', () => {
      console.log('coppied');
    });

    try {
      const res = await fetch('https://fakestoreapi.com/products/1');
      const json = await res.json();
      this.setState({ data: json });
    } catch (error) {}
  }

  descrement = () => {
    this.setState(({ count }) => ({ count: count - 1 }));
  };

  changeName = () => {
    this.setState({ name: 'Virat' }, () => {});
  };

  increment = () => {
    this.setState(
      ({ count }) => ({ count: count + 1 }),
      () => {
        console.log(this.state.count);
      },
    );
  };

  render() {
    console.log('render');
    const { name, count, greet, data } = this.state;
    console.log(document.getElementById('title'));
    // const { title } = this.props;

    // if (count > 3) {
    //   throw new Error('hello');
    // }

    return (
      <div>
        <h1 id="title">{greet}</h1>
        {data && <h2>{data.title}</h2>}

        <button
          type="button"
          onClick={() => {
            this.setState((state, props) => ({
              greet: `Bounjour from ${props.title}`,
            }));
          }}
        >
          Greet Me
        </button>
        <div className="flex items-center my-10">
          <button
            type="button"
            className="bg-red-400 text-4xl font-bold px-8 py-4 rounded-md text-white"
            onClick={this.increment}
          >
            +
          </button>
          <p className="px-10 text-4xl font-bold">{count}</p>
          <button
            type="button"
            className="bg-red-400 text-4xl font-bold px-8 py-4 rounded-md text-white"
            onClick={this.descrement}
          >
            -
          </button>
        </div>
        {count < 5 && (
          <div className="flex items-center">
            <p className="px-10 text-4xl font-bold">{name}</p>
            <button
              type="button"
              className="bg-red-400 text-4xl font-bold px-8 py-4 rounded-md text-white"
              onClick={this.changeName}
            >
              Change Name
            </button>
          </div>
        )}
      </div>
    );
  }
}

// import React, { Component } from 'react';

// import Banner from '../../containers/Banner';
// import Categories from '../../containers/Categories';
// import TopSales from '../../containers/TopSales';
// import ProductsDivider from '../../containers/ProductsDivider';
// import Blogs from '../../containers/Blogs';
// import JoinUs from '../../containers/JoinUs';

// class Home extends Component {
//   // state = {
//   //   count: 0,
//   // };

//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0,
//       name: 'Yagnesh',
//     };
//   }

//   render() {
//     const { name, count } = this.state;

//     return (
//       <>
//         <div className="flex items-center my-10">
//           <button
//             type="button"
//             className="bg-red-400 text-4xl font-bold px-8 py-4 rounded-md text-white"
//             onClick={() => {
//               // this.state.count += 1;
//               // this.setState({ count: 5 });
//               this.setState((state, props) => ({
//                 count: state.count + 1,
//               }));
//             }}
//           >
//             +
//           </button>
//           <p className="px-10 text-4xl font-bold">{count}</p>
//           <button
//             type="button"
//             className="bg-red-400 text-4xl font-bold px-8 py-4 rounded-md text-white"
//           >
//             -
//           </button>
//         </div>

//         <div className="flex items-center">
//           <p className="px-10 text-4xl font-bold">{name}</p>
//           <button
//             type="button"
//             className="bg-red-400 text-4xl font-bold px-8 py-4 rounded-md text-white"
//             onClick={() => {
//               this.setState({ name: 'virat' });
//             }}
//           >
//             Change Name
//           </button>
//         </div>
//       </>
//     );
//   }
// }

// // function Home() {
// //   return (
// //     <div>
// //       <button
// //         type="button"
// //         className="text-3xl font-bold"
// //         onClick={() => {
// //           count += 1;
// //           console.log(count);
// //         }}
// //       >
// //         {count}
// //       </button>

// //       <Banner />
// //       <Categories />
// //       <TopSales />
// //       <ProductsDivider />
// //       <Blogs />
// //       <JoinUs />
// //     </div>
// //   );
// // }

// export default Home;
