import { number1, number2} from './app'
import './style.css'
import './app.css'


const test = "hello"

console.log(test);

class App {
    add(a, b) {
        return a + b
    }
}

const app = new App()

console.log(app.add(number1, number2));
