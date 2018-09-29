import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import AllProducts from './components/AllProducts';
import Order from './components/Order';
import Landing from './components/Landing';


class Topbar extends Component {

  render() {
    return (
      <div>
          <span className="topbar">
            <a className="topbar-item-left-link" href="">
              <span className="topbar-item-left">
                  Github
              </span>
              </a>
              <span style={{}}>
                  
              </span>
          </span>
      </div>
    );
  }
}

class Toolbar extends Component {
  


  render() {
      let productsStyle = null
      let ordersStyle = {
        borderBottom: '2px solid rgb(0, 255, 255)'
      }

      if (this.props.viewProductsToggleState === true) {
        productsStyle = {
          borderBottom: '2px solid rgb(0, 255, 255)'
        }
      } else {
        productsStyle = null
      }
      
      if (this.props.viewOrdersToggleState === true) {
        ordersStyle = {
          borderBottom: '2px solid rgb(0, 255, 255)'
        }
      } else {
        ordersStyle = null
      }
      
      return (
          <div className="toolbar">
              <span className="toolbar-items-left">
                <span className="toolbar-item-left" style={productsStyle} onClick={this.props.viewProducts}>View Products</span>
                <span className="toolbar-item-left" style={ordersStyle} onClick={this.props.viewOrder}>Leave an Order</span>
              </span>
              <span className="toolbar-items-center">

              </span>
              <span className="toolbar-items-right">
                  
              </span>
          </div>
      );
  }
}

class LandingCards extends Component {

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div onClick={this.handleProductsClick} className="card" style={{width: '25%', height: '70%'}}>
          <img src="https://picsum.photos/300/100" alt="Avatar" style={{width: '100%'}} />
          <div className="container">
            <p>All Products</p> 
          </div>
        </div>
        <div onClick={this.handleOrderClick} className="card" style={{width: '25%', height: '70%'}}>
          <img src="https://picsum.photos/300/100" alt="Avatar" style={{width: '100%'}} />
          <div className="container">
            <p>Leave an Order</p> 
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  state = {
    activeContent: "",
    viewProductsToggle: false,
    viewOrderToggle: false
  }

  viewProducts = () => {
    const stateOfToggle = this.state.viewProductsToggle;
    if (stateOfToggle) {
      this.setState({
        activeContent: "",
        viewProductsToggle: false
      })
    } else {
      this.setState({
        activeContent: "viewProducts",
        viewProductsToggle: true,
        viewOrderToggle: false
      })
    }
  }

  viewOrder = () => {
    const stateOfToggle = this.state.viewOrderToggle;
    if (stateOfToggle) {
      this.setState({
        activeContent: "",
        viewOrderToggle: false
      })
    } else {
      this.setState({
        activeContent: "viewOrder",
        viewOrderToggle: true,
        viewProductsToggle: false
      })
    }
  }

  render() {
    return (
      <Provider store={store}>
      <div>
      <Topbar />
      <Toolbar
        viewProducts={this.viewProducts}
        viewOrder={this.viewOrder}
        viewProductsToggleState={this.state.viewProductsToggle}
        viewOrdersToggleState={this.state.viewOrderToggle}
        />
      <div className="main-card">
      {
        this.state.activeContent === "" ? <LandingCards /> : null
      }
      {
        this.state.activeContent === "viewProducts" ? <AllProducts /> : null
      }
      {
        this.state.activeContent === "viewOrder" ? <Order /> : null
      }
      </div>
        
        
        {/* <Landing /> */}
      </div>
      </Provider>
    );
  }
}

export default App;
