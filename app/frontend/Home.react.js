/**
 * Copyright (c) 2016, Galactic
*/

import ReactDOM from "react-dom";
import React from "react";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import homeApp from './reducers'
import Home from './containers/Home.react'

import thunkMiddleware from 'redux-thunk'
let store = createStore(
  homeApp,
  applyMiddleware(thunkMiddleware, createLogger())
)

ReactDOM.render(
  (<Provider store={store}>
    <Home />
  </Provider>),
  document.getElementById('app')
);
