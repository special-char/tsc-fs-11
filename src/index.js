import { number1, number2 } from './app';
import './style.css';
import './app.css';

const test = 'hello';

const greet = name => `Hello ${name}`;

greet('yagnesh');

console.log(test);

class App {
  static add(a, b) {
    return a + b;
  }
}

const app = new App();

console.log(app.add(number1, number2));
