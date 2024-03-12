import React, { PureComponent } from 'react';
import { Button } from '@/components/ui/button';
import TodoContext from '../../context/todoContext';

export default class TickTack extends PureComponent {
  state = {
    isStarted: false,
    currentPlayer: null,
    data: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
  };

  render() {
    const { isStarted, data } = this.state;
    return (
      <div>
        <TodoContext.Consumer>
          {data => <h1>{data?.theme}</h1>}
        </TodoContext.Consumer>
        {isStarted ? (
          <div>
            <h1>Tick Tack Toe started</h1>
            <div className="w-80 aspect-square grid grid-rows-3 grid-cols-3 gap-2">
              {data.map((x, i1) =>
                x.map((y, i2) => (
                  <button
                    type="button"
                    className="bg-red-200"
                    key={`${i1}_${i2}`}
                    onClick={() => {
                      // winner

                      this.setState(
                        ({ data, currentPlayer }) => ({
                          data: [
                            ...data.slice(0, i1),
                            [
                              ...data[i1].slice(0, i2),
                              currentPlayer === 'O' ? 'O' : 'X',
                              ...data[i1].slice(i2 + 1),
                            ],
                            ...data.slice(i1 + 1),
                          ],
                        }),
                        () => {
                          const { data, currentPlayer } = this.state;

                          let winner = undefined;

                          for (let i = 0; i < 3; i++) {
                            if (
                              (data[i][0] === currentPlayer &&
                                data[i][1] === currentPlayer &&
                                data[i][2] === currentPlayer) ||
                              (data[0][i] === currentPlayer &&
                                data[1][i] === currentPlayer &&
                                data[2][i] === currentPlayer)
                            ) {
                              winner = currentPlayer;
                              break;
                            }
                          }

                          // Check diagonals
                          if (
                            !winner &&
                            ((data[0][0] === currentPlayer &&
                              data[1][1] === currentPlayer &&
                              data[2][2] === currentPlayer) ||
                              (data[0][2] === currentPlayer &&
                                data[1][1] === currentPlayer &&
                                data[2][0] === currentPlayer))
                          ) {
                            winner = currentPlayer;
                          }

                          // Display winner if found
                          if (winner) {
                            alert(`Winner is ${winner}`);
                            return;
                          }

                          this.setState({
                            currentPlayer: currentPlayer === 'O' ? 'X' : 'O',
                          });
                        },
                      );
                    }}
                  >
                    {y}
                  </button>
                )),
              )}

              {/* {data.map((x, i) => (
                <button
                  type="button"
                  className="bg-red-200"
                  key={i}
                  onClick={() => {
                    this.setState(
                      ({ data, currentPlayer }) => ({
                        data: [
                          ...data.slice(0, i),
                          currentPlayer,
                          ...data.slice(i + 1),
                        ],
                        currentPlayer: currentPlayer === 'O' ? 'X' : 'O',
                      }),
                      () => {},
                    );
                  }}
                >
                  {x}
                </button>
              ))} */}
            </div>
          </div>
        ) : (
          <Button
            onClick={() => {
              const randomNum = Math.floor(Math.random() * 2);
              this.setState({
                isStarted: true,
                currentPlayer: randomNum === 0 ? 'X' : 'O',
              });
            }}
          >
            Toss
          </Button>
        )}
      </div>
    );
  }
}
