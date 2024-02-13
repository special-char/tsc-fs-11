import React, { PureComponent } from 'react';
// import shallowCompare from 'react-addons-shallow-compare';

export default class Child1 extends PureComponent {
  state = {};

  //   shouldComponentUpdate(nextProps, nextState) {
  //     return shallowCompare(this, nextProps, nextState);
  //   }

  constructor(props) {
    super(props);

    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }

  async componentDidMount() {
    // document.addEventListener('mousemove', this.mousemove);
    // this.interval = setInterval(() => {
    //   console.log('interval');
    // }, 1000);
    // const res = await fetch('https://fakestoreapi.com/products', {
    //   signal: this.signal,
    // });
    // const json = await res.json();
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.mousemove);
    clearInterval(this.interval);

    this.controller.abort();
  }

  mousemove = () => {
    console.log('mouse move');
  };

  render() {
    console.log('Child 1 render');
    const { count } = this.props;

    if (count > 3) {
      throw new Error('something went wrong...');
    }

    return (
      <div>
        <h1>Child1 component</h1>
        <p>{count}</p>
      </div>
    );
  }
}
