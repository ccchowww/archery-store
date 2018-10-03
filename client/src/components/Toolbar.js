import React, { Component } from 'react';
import '../App.css';



class Toolbar extends Component {
    render() {
        let productsStyle = null;
        let ordersStyle = {
          borderBottom: '2px solid rgb(0, 255, 255)'
        };

        let productsCrossStyle = {};
        let ordersCrossStyle = {};
  
        if (this.props.viewProductsToggleState === true) {
          productsStyle = {
            color: 'rgb(71, 104, 126)'
          }
          productsCrossStyle = {
              visibility: 'visible',
              color: 'rgb(23, 48, 65)'
          }

        } else {
            productsStyle = null;
            productsCrossStyle = {
                visibility: 'hidden'
            }
        }
        
        if (this.props.viewOrdersToggleState === true) {
          ordersStyle = {
            // fontWeight: 600,
            color: 'rgb(71, 104, 126)'
          }
          ordersCrossStyle = {
              visibility: 'visible',
              color: 'rgb(23, 48, 65)'
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
                    placeholder="Search..."
                    />
                    : <span className="toolbar-item-right"></span>
                }
  
                </span>
            </div>
        );
    }
}

export default Toolbar;