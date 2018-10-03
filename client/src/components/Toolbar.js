import React, { Component } from 'react';
import '../App.css';



class Toolbar extends Component {
    render() {
        let productsStyle = null;
        let ordersStyle = {};

        let productsCrossStyle = {};
        let ordersCrossStyle = {};
  
        if (this.props.viewProductsToggleState === true) {
          productsStyle = {
            color: 'rgb(49, 100, 133)',
            textShadow: '0px 1px 2px rgba(0,0,0,0.3)'
          }
          productsCrossStyle = {
              visibility: 'visible',
              color: 'rgb(49, 100, 133)',
              textShadow: '0px 1px 2px rgba(0,0,0,0.3)'
          }

        } else {
            productsStyle = null;
            productsCrossStyle = {
                visibility: 'hidden'
            }
        }
        
        if (this.props.viewOrdersToggleState === true) {
          ordersStyle = {
            color: 'rgb(49, 100, 133)',
            textShadow: '0px 1px 2px rgba(0,0,0,0.3)'
          }
          ordersCrossStyle = {
              visibility: 'visible',
              color: 'rgb(49, 100, 133)',
              textShadow: '0px 1px 2px rgba(0,0,0,0.3)'
          }
        } else {
          ordersStyle = null;
          ordersCrossStyle = {
              visibility: 'hidden'
          }
        }
  
        
        
        return (
            <div className="toolbar">
                <span className="toolbar-items-left">
                <span onClick={this.props.viewProducts}
                        style={productsCrossStyle} className="products-tab-cross"
                        >
                            x
                    </span>
                    <span className="toolbar-item-left"
                        style={productsStyle}
                        onClick={this.props.viewProducts}
                        >
                            View Products
                    </span>
                    <span onClick={this.props.viewOrder}
                        style={ordersCrossStyle} className="orders-tab-cross">x</span>
                    <span className="toolbar-item-left toolbar-item-left-order"
                        style={ordersStyle}
                        onClick={this.props.viewOrder}
                        >
                            Leave an Order
                    </span>
                    
                </span>
                <span className="toolbar-items-right">
                {
                  this.props.viewProductsToggleState === true ?
                    <input type="text" className="toolbar-item-right searchbar"
                    name="toolbarSearchInput"
                    onChange={this.props.allProductsSearchHandler}
                    value={this.props.allProductsSearchValue}
                    placeholder={
                        (this.props.productsLoadingState === true) ?
                        "Loading..."
                        : "Search..."
                    }
                    />
                    : <span className="toolbar-item-right"></span>
                }
  
                </span>
            </div>
        );
    }
}

export default Toolbar;