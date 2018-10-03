import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import AllProducts from './components/AllProducts';
import Order from './components/Order';
import Topbar from './components/Topbar';
import Toolbar from './components/Toolbar';

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
    locale: "SG",
    activeContent: "",
    activeTab: "get",
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
    orderMessage: "",
    popupState: false
  }

  localeChange = (e) => {
    this.setState({
      locale: e.target.value
    })
  }

  handleOrderSelect = (_id, pin, orderProductName, orderProductId) => {
    const pinNumber = parseInt(pin);
    if (this.state.orderId === "") {
      this.setState({
        orderPin: pinNumber,
        orderId: _id,
        orderProductName: orderProductName,
        orderProductId: orderProductId
      });
    } else if (this.state.orderId === _id) {
      this.setState({
        orderPin: "",
        orderId: "",
        orderProductName: "",
        orderProductId: ""
      })
    } else {
      this.setState({
        orderPin: pinNumber,
        orderId: _id,
        orderProductName: orderProductName,
        orderProductId: orderProductId
      })
    }
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
        selectedProductPrice: price,
        popupCounter: this.state.popupCounter + 1
      });
    } else if (this.state.selectedProductId === _id) {
      this.setState({
        selectedProductId: "",
        selectedProductName: "",
        selectedProductManufacturer: "",
        selectedProductPrice: ""
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

  getOrderView = () => {
    this.setState({
        activeTab: "get"
    })
  }

  addOrderView = () => {
      this.setState({
          activeTab: "add"
      })
  }

  editOrderView = () => {
      this.setState({
          activeTab: "edit"
      })
  }

  deleteOrderView = () => {
      this.setState({
          activeTab: "delete"
      })
  }

  openPopup = () => {
    this.setState({
      popupState: true
    })
  }

  closePopup = () => {
    this.setState({
      popupState: false
    })
  }

  // selectAndOpenPopup = (_id, name, manufacturer, price) => {
  //   const popupState = this.props.bowItems.popupState;

  //   this.props.openPopup(popupState.toString());
  //   this.onProductSelect(_id, name, manufacturer, price)
  // }


  render() {
    const localeList = {
      MY: {
          string: 'en-MY',
          object: {style:'currency', currency:'MYR'}
      },
      SG: {
        string: 'en-SG',
        object: {style:'currency', currency:'SGD'}
      },
      US: {
        string: 'en-US',
        object: {style:'currency', currency:'USD'}
      },
      EU: {
        string: 'en-EU',
        object: {style:'currency', currency:'EUR'}
      },
      UK: {
        string: 'en-GB',
        object: {style:'currency', currency:'GBP'}
      }
    }

    const selectedLocale = this.state.locale;

    const currentLocale = localeList[selectedLocale];

    const { orderId, orderPin, orderUserPin, orderMessage, orderQuantity, orderProductId, orderProductName} = this.state;



    return (
      <Provider store={store}>
      <div>
      <Topbar locale={this.state.locale} handleLocaleChange={this.localeChange}/>
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
            currentLocale={currentLocale}
            toolbarSearchValue={this.state.toolbarSearchInput}
            toolbarSearchHandler={this.toolbarSearchOnChange}
            selectProductHandler={this.onProductSelect}
            // selectAndOpenPopup={this.selectAndOpenPopup}
            selectedProduct={this.state.selectedProductId}
            selectedProductName={this.state.selectedProductName}
            openPopup={this.openPopup}
            closePopup={this.closePopup}
            />
          : null
      }
      {
        this.state.activeContent === "viewOrder" ?
          <Order
            currentLocale={currentLocale}
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
            getOrderView={this.getOrderView}
            addOrderView={this.addOrderView}
            editOrderView={this.editOrderView}
            deleteOrderView={this.deleteOrderView}
            activeTab={this.state.activeTab}
            />
          : null
      }
      </div>
      {
                    this.state.popupState === true ?
                    <span className="selected-popup-container">
                            <input 
                                className="selected-popup-item"
                                readOnly={true}
                                autoFocus={true}
                                type="text"
                                value={
                                    this.props.selectedProductName !== "" ?
                                    "Selected Product: "+this.props.selectedProductName
                                    : "Selected Product: (None)"
                                }
                                />
                    </span>
                    : null
                }
      </div>
      </Provider>
    );
  }
}


// const mapStateToProps = (state) => ({
//   bowItems: state.bowItems
// })


// export default connect(mapStateToProps, { openPopup })(App);
export default App;