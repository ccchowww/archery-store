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
                  <span>Github</span>
              </span>
              </a>
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
              <span className="toolbar-items-right">
              {
                this.props.viewProductsToggleState === true ?
                  <input type="text" className="toolbar-item-right searchbar"
                  name="toolbarSearchInput"
                  onChange={this.props.allProductsSearchHandler}
                  value={this.props.allProductsSearchValue}
                  placeholder="Search..."
                  />
                  : <span className="toolbar-item-right"></span>
              }

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
    viewOrderToggle: false,
    toolbarSearchInput: "",
    selectedProductName: '',
    selectedProductId: '',
    selectedProductManufacturer: '',
    selectedProductPrice: '',
    orderId: "",
    orderPin: "",
    orderUserPin: "",
    orderProductId: "",
    orderProductName: "",
    orderQuantity: "",
    orderMessage: ""
  }

  handleOrderSelect = (_id, pin, orderProductName, orderProductId) => {
    const pinNumber = parseInt(pin);
    this.setState({
        orderPin: pinNumber,
        orderId: _id,
        orderProductName: orderProductName,
        orderProductId: orderProductId
    });
  }

  handleOrderFormChange = (e) => {
    switch(e.target.name) {
        case 'orderUserPin':
            if (e.target.value > 9999 || e.target.value < 0) {
                this.setState({
                    [e.target.name]: ""
                })
                return (
                    alert("Min-Max: 1-9999")   
                );
            }
            this.setState({
                [e.target.name]: e.target.value
            });
            return;
        case 'userPin':
            if (e.target.value > 9999 || e.target.value < 0) {
                this.setState({
                    [e.target.name]: ""
                })
                return (
                    alert("Min-Max: 1-9999")   
                );
            }
            this.setState({
                [e.target.name]: e.target.value
            })
            return;
        case 'orderQuantity':
            if (e.target.value > 100 || e.target.value < 0) {
                this.setState({
                    [e.target.name]: ""
                })
                return ( alert("Min-Max: 1-100") )
            }
            this.setState({
                [e.target.name]: e.target.value
            })
            return;
        case 'orderMessage':
            if (e.target.value.length > 140) {
                const excessString = e.target.value;
                const trimmedString = excessString.substr(0,139);
                this.setState({
                    [e.target.name]: trimmedString
                })
                return;
            }
            this.setState({
                [e.target.name]: e.target.value
            })
            return;
        default:
            this.setState({
                [e.target.name]: e.target.value
            });
            return;
    }
    
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

  toolbarSearchOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onProductSelect = (_id, name, manufacturer, price) => {
    if (this.state.selectedProductId === "") {
      this.setState({
        selectedProductId: _id,
        selectedProductName: name,
        selectedProductManufacturer: manufacturer,
        selectedProductPrice: price
      })
    } else if (this.state.selectedProductId === _id) {
      this.setState({
        selectedProductId: "",
        selectedProductName: ""
      })
    } else {
      this.setState({
        selectedProductId: _id,
        selectedProductName: name,
        selectedProductManufacturer: manufacturer,
        selectedProductPrice: price
      })
    }
  }  

  render() {

    const { orderId, orderPin, orderUserPin, orderMessage, orderQuantity, orderProductId, orderProductName} = this.state;

    return (
      <Provider store={store}>
      <div>
      <Topbar />
      <Toolbar
        viewProducts={this.viewProducts}
        viewOrder={this.viewOrder}
        viewProductsToggleState={this.state.viewProductsToggle}
        viewOrdersToggleState={this.state.viewOrderToggle}
        allProductsSearchHandler={this.toolbarSearchOnChange}
        allProductsSearchValue={this.state.toolbarSearchInput}
        />
      <div className="main-card">
      {
        this.state.activeContent === "" ? <LandingCards /> : null
      }
      {
        this.state.activeContent === "viewProducts" ?
          <AllProducts
            toolbarSearchValue={this.state.toolbarSearchInput}
            toolbarSearchHandler={this.toolbarSearchOnChange}
            selectProductHandler={this.onProductSelect}
            selectedProduct={this.state.selectedProductId}
            />
          : null
      }
      {
        this.state.activeContent === "viewOrder" ?
          <Order 
            orderFormChangeHandler={this.handleOrderFormChange}
            orderSelectHandler={this.handleOrderSelect}
            orderId={orderId}
            orderPin={orderPin}
            orderUserPin={orderUserPin}
            orderMessage={orderMessage}
            orderQuantity={orderQuantity}
            orderProductId={orderProductId}
            orderProductName={orderProductName}
            selectedProductId={this.state.selectedProductId}
            selectedProductName={this.state.selectedProductName}
            selectedProductManufacturer={this.state.selectedProductManufacturer}
            selectedProductPrice={this.state.selectedProductPrice}
            />
          : null
      }
      </div>
        
        
        {/* <Landing /> */}
      </div>
      </Provider>
    );
  }
}

export default App;
