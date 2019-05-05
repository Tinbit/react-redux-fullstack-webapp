import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';//arbitrary component can  access the global data reaching that store directly ,is gloabl state of  app
import {createStore, applyMiddleware } from 'redux'; // applyMiddleware helpers
//createStore to create  new instanse on redux store
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers'; // pass this to create first argument
//for setting up reducer

import axios from 'axios';
window.axios = axios; // temporary /for testing backend routes / postman kemetekem

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}> <App /></Provider>,
  document.querySelector('#root')
);

console.log('Stripe key is ', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is ', process.env.NODE_ENV);
