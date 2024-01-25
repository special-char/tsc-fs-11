# steps to start any javascript project

- start npm project with following command `npm init`
- install webpack with `npm i -D webpack webpack-cli`
- create webpack.config.js file
- create entry and output section from [webpack website](https://webpack.js.org/concepts/)
- setup babel using webpack and do setup from [babel website](https://babeljs.io/setup#installation)
- create .babelrc file and add following comand ```json
  {
  "presets": ["@babel/preset-env"]
  }

````
- install  babel preset env with `npm i -D @babel/preset-env`
- install webpack html plugin using `npm i -D html-webpack-plugin` get setup from [html webpack plugin](https://webpack.js.org/plugins/html-webpack-plugin/#root) ```javascript
 <!-- example -->
 <!-- top of the file -->
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
````

- webpack setup for css install `npm i -D css-loader style-loader` and add rule as follow ```javascript
  {
  test: /\.css$/,
  exclude: /node_modules/,
  use: ['style-loader', 'css-loader'],
  },

````
- if you want to add post-css (if you want to use tailwind then follow this step) then install ```javascript
npm install --save-dev postcss-loader postcss
````

- follow instation steps from [postcss](https://github.com/webpack-contrib/postcss-loader)
