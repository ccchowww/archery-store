import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders, getAllOrders, addOrder, updateOrder, deleteOrder } from '../actions/orderActions';
import "../App.css";


class Order extends Component {


    handleAddOrder = e => {
        e.preventDefault();
        const pinNumber = parseInt(this.props.orderUserPin, 10);
        const quantityNumber = parseInt(this.props.orderQuantity, 10);
        const trimMessage = this.props.orderMessage.trim();
        const newOrder = {
            bowitem_id: this.props.selectedProductId,
            quantity: quantityNumber,
            message: trimMessage,
            pin: pinNumber
        }
        this.props.addOrder(newOrder);
    }

    handleUpdateOrder = e => {
        e.preventDefault();
        const pinNumber = parseInt(this.props.orderPin, 10);
        const quantityNumber = parseInt(this.props.orderQuantity, 10);
        const trimMessage = this.props.orderMessage.trim();
        const updatedOrder = {
            _id: this.props.orderId,
            bowitem_id: this.props.selectedProductId,
            quantity: quantityNumber,
            message: trimMessage,
            pin: pinNumber
        }
        this.props.updateOrder(updatedOrder);
    }

    handleDeleteOrder = e => {
        e.preventDefault();
        // const pinNumber = parseInt(this.props.orderPin);
        // const userPinNumber = parseInt(this.props.orderUserPin);
        const DeleteOrder = {
            _id: this.props.orderId
        };
        this.props.deleteOrder(DeleteOrder);
    }

    retrieveOrders = e => {
        e.preventDefault();
        const orderUserPin = parseInt(this.props.orderUserPin, 10);
        if (this.props.orderUserPin === "") {
            this.props.getAllOrders();
        } else {
            this.props.getOrders(orderUserPin);
        }
    }


    render() {
        const { orders, loading } = this.props.orders;

        const { orderFormChangeHandler, orderSelectHandler } = this.props;

        const {
            orderId,
            orderPin,
            orderUserPin,
            orderMessage,
            orderQuantity,
            orderProductId,
            orderProductName
        } = this.props;

        const {
            selectedProductId,
            selectedProductName,
            selectedProductManufacturer,
            selectedProductPrice
        } = this.props;

        const selectedStyle = {
            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.3)'
        }

        const selectedStylePin = {
            webkitTransition: 'color 0.4s ease-in-out',
            transition: 'color 0.4s ease-in-out',
            borderBottom: '1px solid rgba(68, 0, 255, 0.9)'
        }

        const orderValidStyle = {
            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.3)'
        }

        const orderValidTitleStyle = {
            color: 'rgb(0, 200, 255)'
        }
        const orderValidTextStyle = {
            borderBottom: '1px solid rgb(0, 200, 255)',
            textShadow: '0px 1px 2px rgba(0,0,0,0.2)',
            width: '100%'
        }

        const tabSelectedStyle = {
            backgroundColor: 'rgb(0, 200, 255)',
            boxShadow: '0 2px 14px 0 rgba(0,0,0,0.4)',
            textShadow: '0px 2px 3px rgba(0,0,0,0.3)',
            color: 'rgb(247, 247, 247)'
        }

        return (
            <div>
                <span className="order-view-selector-items">
                    <span style={
                        this.props.activeTab === "get" ?
                        tabSelectedStyle
                        : null
                    }
                        className="order-view-selector-item" onClick={this.props.getOrderView}
                        >
                        Get
                    </span>
                    <span style={
                        this.props.activeTab === "add" ?
                        tabSelectedStyle
                        : null
                    }
                        className="order-view-selector-item" onClick={this.props.addOrderView}
                        >
                        Add
                    </span>
                    <span style={
                        this.props.activeTab === "edit" ?
                        tabSelectedStyle
                        : null
                    }
                        className="order-view-selector-item" onClick={this.props.editOrderView}
                        >
                        Edit
                    </span>
                    <span style={
                        this.props.activeTab === "delete" ?
                        tabSelectedStyle
                        : null
                    }
                        className="order-view-selector-item" onClick={this.props.deleteOrderView}
                        >
                        Delete
                    </span>
                </span>
                <div className="order-view-main-container">
                    <div className="order-view-left-container">
                        {
                            this.props.activeTab === "get" ?
                                <span className="order-view-left-card">
                                    <form className="order-view-left-form" 
                                        onSubmit={this.retrieveOrders}
                                        >
                                        <span
                                            className="order-view-left-form-item">
                                            Enter your Order Pin:
                                        </span>
                                        <span className="order-view-left-form-item">
                                            <input
                                                style={
                                                    (orderUserPin !== "") ?
                                                    orderValidTextStyle
                                                    : null
                                                }
                                                className="order-view-left-form-input" 
                                                type="number" placeholder="1 - 9999"
                                                name="orderUserPin"
                                                onChange={orderFormChangeHandler}
                                                value={orderUserPin}
                                                />
                                        </span>
                                        <span className="order-view-left-form-input-note order-view-left-form-last-item-value">
                                            *Leave empty to get ALL orders.
                                        </span>
                                        <span className="order-view-left-form-last">
                                            <input
                                                style={
                                                    (orderUserPin !== "") ?
                                                    {width: '110%'}
                                                    : null
                                                }
                                                className="order-view-submit-button"
                                                type="submit"
                                                value={
                                                    (loading === true) ?
                                                    "Retrieving..."
                                                    : "Retrieve Order(s)"
                                                }
                                                />
                                        </span>
                                    </form>
                                </span>
                                : null
                        }
                        {
                        this.props.activeTab === "add" ?
                            <span style={
                                (orderUserPin && orderQuantity && orderMessage && selectedProductName !== "") ?
                                orderValidStyle
                                : null
                                }
                                className="order-view-left-card">
                                <form
                                    className="order-view-left-form"
                                    onSubmit={this.handleAddOrder}
                                    >
                                    <span style={orderUserPin === "" ? {color: 'red'} : null}
                                        className="order-view-left-form-item">
                                        Pin:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input placeholder="1 - 9999"
                                            style={
                                                (orderUserPin && orderQuantity && orderMessage && selectedProductName !== "") ?
                                                orderValidTextStyle
                                                : null
                                            }
                                            className="order-view-left-form-input" 
                                            name="orderUserPin" type="number"
                                            value={orderUserPin} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span style={orderQuantity === "" ? {color: 'red'} : null}
                                        className="order-view-left-form-item">
                                        Quantity:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input placeholder="1 - 100"
                                            style={
                                                (orderUserPin && orderQuantity && orderMessage && selectedProductName !== "") ?
                                                orderValidTextStyle
                                                : null
                                            }
                                            className="order-view-left-form-input" 
                                            name="orderQuantity" type="number"
                                            value={orderQuantity} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span style={orderMessage === "" ? {color: 'red'} : null}
                                        className="order-view-left-form-item">
                                        Message:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <textarea 
                                            style={
                                                (orderUserPin && orderQuantity && orderMessage && selectedProductName !== "") ?
                                                orderValidTextStyle
                                                : null
                                            }
                                            rows="6"
                                            placeholder="140 Character Limit"
                                            className="order-view-left-form-item-textarea" 
                                            name="orderMessage" value={orderMessage} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span style={selectedProductName === "" ? {color: 'red'} : null}
                                        className="order-view-left-form-item"
                                        >
                                            Selected Product:
                                    </span>
                                    <span
                                        className="order-view-left-form-last-item order-view-left-form-last-item-value">
                                        {selectedProductName === "" ?
                                            <span 
                                                className="order-view-left-form-input-note"
                                                >
                                                    *Select a product from View Products
                                                </span>
                                            : selectedProductName}
                                    </span>
                                    <input disabled={
                                            (orderUserPin && orderQuantity && orderMessage && selectedProductName !== "") ? null : true
                                            }
                                        style={
                                            (orderUserPin && orderQuantity && orderMessage && selectedProductName !== "") ?
                                            {width: '102%'}
                                            : null
                                            }
                                        className="order-view-submit-button" type="submit"
                                        value={
                                            (loading === true) ?
                                            "Adding..."
                                            : "Add Order"
                                        }
                                        />
                                </form>
                            </span>
                            : null
                        }
                        {
                        this.props.activeTab === "edit" ?
                            <span style={
                                (orderPin && orderQuantity && orderMessage && selectedProductName !== "") ?
                                orderValidStyle
                                : null
                                }
                                className="order-view-left-card"
                                >
                                <form className="order-view-left-form"
                                    onSubmit={this.handleUpdateOrder}
                                    >
                                    <span style={(orderPin !== "" && !isNaN(orderPin)) ? null : {color: 'red'} }
                                        className="order-view-left-form-item">
                                        Selected Order Pin:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input 
                                            style={
                                                (orderPin && orderQuantity && orderMessage && selectedProductName !== "" && !isNaN(orderPin)) ?
                                                orderValidTextStyle
                                                : null
                                            }
                                            className="order-view-left-form-input"
                                            placeholder="Select your Order"
                                            name="orderPin" type="number" value={orderPin} disabled={true}/>
                                    </span>
                                    <span style={orderQuantity === "" ? {color: 'red'} : null}
                                        className="order-view-left-form-item">
                                        Quantity:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input
                                            style={
                                                (orderPin && orderQuantity && orderMessage && selectedProductName !== "") ?
                                                orderValidTextStyle
                                                : null
                                            }
                                            className="order-view-left-form-input"
                                            placeholder="1 - 100"
                                            name="orderQuantity" type="number" value={orderQuantity} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span style={orderMessage === "" ? {color: 'red'} : null}
                                        className="order-view-left-form-item">
                                        Message:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <textarea
                                            style={
                                                (orderPin && orderQuantity && orderMessage && selectedProductName !== "") ?
                                                orderValidTextStyle
                                                : null
                                            }
                                            rows="6"
                                            placeholder="140 Character Limit"
                                            className="order-view-left-form-item-textarea"
                                            name="orderMessage" value={orderMessage} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span
                                        style={selectedProductName === "" ? {color: 'red'} : null}
                                        className="order-view-left-form-item">
                                        Selected Product:
                                    </span>
                                    <span
                                        className="order-view-left-form-last-item order-view-left-form-last-item-value">
                                        {
                                            selectedProductName === "" ?
                                            <span className="order-view-left-form-input-note">
                                                *Select a product from View Products
                                            </span>
                                            : selectedProductName
                                        }
                                    </span>
                                    <input disabled={
                                            (orderPin && orderQuantity && orderMessage && selectedProductName !== "") ?
                                            null
                                            : true
                                            }
                                            style={
                                                (orderPin && orderQuantity && orderMessage && selectedProductName !== "") ?
                                                {width: '110%'}
                                                : null
                                            }
                                            className="order-view-submit-button"
                                            type="submit"
                                            value={
                                                (loading === true) ?
                                                "Updating"
                                                : "Update Order"
                                            }
                                        />
                                </form>
                            </span>
                            : null
                        }
                        {
                        this.props.activeTab === "delete" ?
                            <span className="order-view-left-card">
                                <form className="order-view-left-form"
                                    onSubmit={this.handleDeleteOrder}
                                    >
                                    <span style={(orderPin !== "" && !isNaN(orderPin)) ? null : {color: 'red'} }
                                        className="order-view-left-form-item">
                                        Selected Order Pin:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input
                                            style={
                                                (orderPin !== "" && !isNaN(orderPin)) ?
                                                orderValidTextStyle
                                                : null
                                            }
                                            placeholder="Select your Order"
                                            className="order-view-left-form-input"
                                            name="orderUserPin" type="number" value={orderPin} disabled={true}/>
                                    </span>
                                    <span className="order-view-left-form-last-item order-view-left-form-last-item-value order-view-left-form-input-note">
                                        *Delete selected order. Requires Pin.
                                    </span>
                                    <span className="order-view-left-form-last">
                                        <input
                                            disabled={
                                                (orderPin !== "" && !isNaN(orderPin)) ? null : true
                                            }
                                            style={
                                                (orderPin !== "" && !isNaN(orderPin)) ?
                                                {width: '110%'}
                                                : null
                                            }
                                            className="order-view-submit-button"
                                            type="submit"
                                            value={
                                                (loading === true) ?
                                                "Deleting..."
                                                : "Delete Order"
                                            }
                                            />
                                    </span>
                                </form>
                            </span>
                            : null
                        }
                    </div>
                    <div className="order-right-container">
                    {/* <span className="order-view-right-card-indicator"> */}
                    {/* </span> */}
                            {
                                orders.map(({ pin, bowItem, quantity, message, _id }) => (
                                    <div style={
                                        _id === orderId ?
                                            selectedStyle
                                            : null
                                        }
                                    
                                        className="order-list-card" key={_id}>
                                    {
                                        pin !== undefined ?
                                            <span 
                                                className="order-list-item">
                                                Order Pin:
                                            </span>
                                            : null
                                    }
                                    {
                                        pin !== undefined ?
                                            <span style={
                                                _id === orderId ?
                                                    selectedStylePin
                                                    : null
                                                }
                                                className="order-list-item order-list-item-text">
                                                {pin}
                                            </span>
                                            : null
                                    }
                                        <span className="order-list-item">
                                            Product:
                                        </span>
                                        <span style={
                                                _id === orderId ?
                                                    selectedStylePin
                                                    : null
                                                }
                                            className="order-list-item order-list-item-text">
                                            {bowItem.name}
                                        </span>
                                        <span className="order-list-item">
                                            Quantity:
                                        </span>
                                        <span style={
                                                _id === orderId ?
                                                    selectedStylePin
                                                    : null
                                                }
                                            className="order-list-item order-list-item-text">
                                            {quantity}
                                        </span>
                                        <span className="order-list-item">
                                            Message:
                                        </span>
                                        <span style={
                                                _id === orderId ?
                                                    selectedStylePin
                                                    : null
                                                }
                                            className="order-list-item order-list-item-text">
                                            {message}
                                        </span>
                                        <span className="order-list-item-last">
                                            <input disabled={
                                                (pin === "" || isNaN(pin)) ? true : null
                                            }
                                                style={
                                                    _id === orderId ?
                                                    {width: '110%'}
                                                    : null
                                                }
                                                className="order-list-item-button"
                                                type="button" value="Select"
                                                onClick={orderSelectHandler.bind(this, _id, pin, bowItem.name, bowItem._id)}
                                                />
                                        </span>
                                    </div>
                                    )
                                )
                            }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orders: state.orders
})


export default connect(mapStateToProps, { getOrders, getAllOrders, addOrder, updateOrder, deleteOrder })(Order);