import React, { Component } from 'react'
import { connect } from 'react-redux';
import { openPopup } from '../actions/bowItemActions';

import Landing from './Landing';
import Topbar from './Topbar';
import Toolbar from './Toolbar';
import AllProducts from './AllProducts';
import Order from './Order';


import '../App.css';



class Root extends Component {
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
        const pinNumber = parseInt(pin, 10);
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

    clearOrderSelection = () => {
      this.setState({
        orderId: "",
        orderPin: "",
        orderQuantity: "",
        orderMessage: "",
        selectedProductId: "",
        selectedProductName: ""
      })
    }
      
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
            <div>
      <Topbar locale={this.state.locale} handleLocaleChange={this.localeChange}/>
      <Toolbar
        viewProducts={this.viewProducts}
        viewOrder={this.viewOrder}
        viewProductsToggleState={this.state.viewProductsToggle}
        viewOrdersToggleState={this.state.viewOrderToggle}
        allProductsSearchHandler={this.toolbarSearchOnChange}
        allProductsSearchValue={this.state.toolbarSearchInput}
        productsLoadingState={this.props.bowItems.loading}
        />
      <div className="main-card">
      {
        this.state.activeContent === "" ? <Landing /> : null
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
            clearOrderSelection={this.clearOrderSelection}
            />
          : null
      }
      </div>
      {
            this.props.bowItems.popupState === true ?
            <span className="selected-popup-container">
                    <input 
                        className="selected-popup-item"
                        disabled={true}
                        type="text"
                        value={
                            this.state.selectedProductName !== "" ?
                            "Selected Product: "+this.state.selectedProductName
                            : "Selected Product: None"
                        }
                        />
            </span>
            : null
        }
      </div>
        );
    }
}

const mapStateToProps = (state) => ({
    bowItems: state.bowItems
})


export default connect(mapStateToProps, { openPopup })(Root);

