import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/AppNavbar';
import AppNavbar from './components/AppNavbar';
// import BowItemList from './components/BowItemList';
import ShoppingList from './components/ShoppingList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <ShoppingList />
      </div>
    );
  }
}

export default App;
