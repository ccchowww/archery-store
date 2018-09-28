import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/TopBar';
import { Container } from 'reactstrap';
import AppNavbar from './components/TopBar';
import BowItemList from './components/BowItemList';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import TopBar from './components/TopBar';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div>
        <TopBar />
        {/* <Container> */}
        <Home />
        {/* </Container> */}
      </div>
      </Provider>
    );
  }
}

export default App;
