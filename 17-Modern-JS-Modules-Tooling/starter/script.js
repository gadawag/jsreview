// Importing module

console.log('Importing module');

// named imports
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);
// console.log(ShoppingCart);

// console.log(shippingCost);

// import all
// import * as ShoppingCart from './shoppingCart.js';
// console.log(ShoppingCart);
// ShoppingCart.addToCart('bread', 5);

// default import
// import add from './shoppingCart.js';
// add('Pizza', 2);

// default with named exports
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// modules are live connection
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 3);
add('apple', 5);
console.log(cart);

// TOP LEVEL AWAIT ES2022 ONLY WORKS ON MODULES!
// BUT WILL BLOCK THE EXECUTION OF THE ENTIRE MODULE
// SO THE IMPORTING MODULE WILL ALSO WAIT
// console.log('Start fetching');
// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// const data = await res.json();
// console.log(data);

// const getLastPost = async function () {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const data = await res.json();
//   console.log(data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = await getLastPost();
// console.log(lastPost);

// console.log('End fetching');

// PARCEL: no need to include the full path when using parcel
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateClone);
console.log(stateDeepClone);

/////////////////////////////////////
// PARCEL
// Parcel is a bundler, meaning it will create a dist folder (for production), bundled with all of our modules into 1 js file and minified versions
// Parcel automatically use babel to transpile our code, parcel are using good defaults for this
// Parcel default preset is @babel/preset-typescript, so we need to install the manually the @babel/preset-env, and create a .babelrc file to set the preset
// Only parcel will understand this.
// This will not reload our page whenever we have changes in one of our modules. this is important if we want to keep our current state
if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting} ${this.name}`);
  }
}

const jonas = new Person('Jonas');
console.log('Jonas' ?? null);
console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable'; // FOR POLYFILLING (like Promise, of array.find are not reverted back to ES5 by babel)
// import 'core-js/stable/array/find'; // if we want to just polyfill specific methods / ES6 features
// import 'core-js/stable/promise';

// FOR POLYFILLING ASYNC FUNCTIONS
import 'regenerator-runtime/runtime';
