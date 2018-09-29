import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/TopBar';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import TopBar from './components/TopBar';
import Order from './components/Order';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div>
      <TopBar />
        <Order />
        <Home />
      </div>
      </Provider>
    );
  }
}

export default App;
