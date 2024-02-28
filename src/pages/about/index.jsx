import React, { PureComponent, createRef } from 'react';

class About extends PureComponent {
  state = {
    data: [
      {
        id: 1,
        city: 'ahmedabad',
        temp: 24,
      },
      {
        id: 2,
        city: 'mumbai',
        temp: 26,
      },
    ],
    selectedItem: null,
  };

  selectRef = createRef();

  submitForm = e => {
    e.preventDefault();
    console.log(this.selectRef.current.value);
    this.setState(({ data }) => ({
      selectedItem: data.find(
        x => x.id === Number(this.selectRef.current.value),
      ),
    }));
  };

  render() {
    const { data, selectedItem } = this.state;
    return (
      <div className="grid place-content-center h-screen">
        <form className="flex" onSubmit={this.submitForm}>
          <select
            ref={this.selectRef}
            className="block w-full rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Please Select City</option>
            {data.map(x => (
              <option value={x.id} key={x.id}>
                {x.city}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-r-md min-w-24 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get Info
          </button>
        </form>
        {selectedItem && (
          <p>{`temprateture of ${selectedItem.city} is ${selectedItem.temp}`}</p>
        )}
      </div>
    );
  }
}

export default About;
