import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/AppNavbar';
import { Container } from 'reactstrap';
import AppNavbar from './components/AppNavbar';
import BowItemList from './components/BowItemList';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
        <BowItemList />
        </Container>
      </div>
      </Provider>
    );
  }
}

export default App;
