import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders, getAllOrders, addOrder, updateOrder, deleteOrder } from '../actions/orderActions';
import "../App.css";


class Order extends Component {


    handleAddOrder = e => {
        e.preventDefault();
        const pinNumber = parseInt(this.props.orderUserPin);
        const quantityNumber = parseInt(this.props.orderQuantity);
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
        const pinNumber = parseInt(this.props.orderPin);
        const quantityNumber = parseInt(this.props.orderQuantity);
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
        const pinNumber = parseInt(this.props.orderPin);
        const userPinNumber = parseInt(this.props.orderUserPin);
        console.log(pinNumber, userPinNumber);
        if (pinNumber === userPinNumber) {
            const DeleteOrder = {
                _id: this.props.orderId
            };
            this.props.deleteOrder(DeleteOrder);
        } else {
            alert('Pin does not match order');
        }
    }

    retrieveOrders = e => {
        e.preventDefault();
        const orderUserPin = parseInt(this.props.orderUserPin);
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
            backgroundColor: 'rgb(252, 252, 252)',
            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.3)'
        }

        const orderValidStyle = {
            backgroundColor: 'rgb(252, 252, 252)',
            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.3)'
        }

        return (
            <div>
                <span className="order-view-selector-items">
                    <span className="order-view-selector-item" onClick={this.props.getOrderView}>Get</span>
                    <span className="order-view-selector-item" onClick={this.props.addOrderView}>Add</span>
                    <span className="order-view-selector-item" onClick={this.props.editOrderView}>Edit</span>
                    <span className="order-view-selector-item" onClick={this.props.deleteOrderView}>Delete</span>
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
                                                className="order-view-left-form-input" 
                                                type="number" placeholder="Pin between 1 - 9999"
                                                name="orderUserPin"
                                                onChange={orderFormChangeHandler}
                                                value={orderUserPin}
                                                />
                                        </span>
                                        <span className="order-view-left-form-input-note">
                                            *Leave empty to get ALL orders.
                                        </span>
                                        <span className="order-view-left-form-last">
                                            <input
                                                className="order-view-submit-button" type="submit" value="Retrieve Order(s)" />
                                        </span>
                                    </form>
                                    {loading === true ? <h1>LOADING ORDERS AHH HH</h1> : null}
                                </span>
                                : null
                        }
                        {
                        this.props.activeTab === "add" ?
                            <span style={
                                (orderUserPin && orderQuantity && orderMessage && selectedProductName !== "") ? orderValidStyle : null
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
                                        <input placeholder="Pin between 1 - 9999"
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
                                            rows="6"
                                            placeholder="140 Character Limit"
                                            className="order-view-left-form-item-textarea" 
                                            name="orderMessage" value={orderMessage} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span className="order-view-left-form-last">
                                        <span style={selectedProductName === "" ? {color: 'red'} : null}
                                            className="order-view-left-form-last-item"
                                            >
                                                Selected Product:
                                        </span>
                                        <span className="order-view-left-form-last-item order-view-left-form-last-item-value">
                                            {selectedProductName === "" ? <span style={{marginLeft: 0}} className="order-view-left-form-input-note">*Select a product from View Products</span> : selectedProductName}
                                        </span>
                                        <input disabled={
                                            (orderUserPin && orderQuantity && orderMessage && selectedProductName !== "") ? null : true
                                            }
                                            className="order-view-submit-button" type="submit" value="Add Order"/>
                                    </span>
                                </form>
                            </span>
                            : null
                        }
                        {
                        this.props.activeTab === "edit" ?
                            <span className="order-view-left-card">
                                <form className="order-view-left-form"
                                    onSubmit={this.handleUpdateOrder}
                                    >
                                    <span style={(orderPin === "" || isNaN(orderPin)) ? {color: 'red'} : null }
                                        className="order-view-left-form-item">
                                        Selected Order Pin:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input className="order-view-left-form-input"
                                            placeholder="Pin from Selected Order (if present)"
                                            name="orderPin" type="number" value={orderPin} readOnly/>
                                    </span>
                                    <span style={orderQuantity === "" ? {color: 'red'} : null}
                                        className="order-view-left-form-item">
                                        Quantity:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input 
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
                                            rows="6"
                                            placeholder="140 Character Limit"
                                            className="order-view-left-form-item-textarea"
                                            name="orderMessage" value={orderMessage} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span className="order-view-left-form-last">
                                        <span style={selectedProductName === "" ? {color: 'red'} : null} className="order-view-left-form-last-item">
                                            Selected Product:
                                        </span>
                                        <span className="order-view-left-form-last-item order-view-left-form-last-item-value">
                                            {selectedProductName === "" ? <span style={{marginLeft: 0}} className="order-view-left-form-input-note">*Select a product from View Products</span> : selectedProductName}
                                        </span>
                                        <input disabled={
                                            (orderPin && orderQuantity && orderMessage && selectedProductName !== "") ? null : true
                                        }
                                            className="order-view-submit-button" type="submit" value="Update Order"/>
                                    </span>
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
                                    <span style={(orderPin === "" || isNaN(orderPin)) ? {color: 'red'} : null }
                                        className="order-view-left-form-item">
                                        Selected Order Pin:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input
                                            placeholder="Pin from Selected Order (if present)"
                                            className="order-view-left-form-input"
                                            name="orderUserPin" type="number" value={orderPin} readOnly/>
                                    </span>
                                    <span className="order-view-left-form-input-note">
                                        *Delete selected order. Requires Pin.
                                    </span>
                                    <span className="order-view-left-form-last">
                                        <input
                                            disabled={
                                                (orderPin === "" || isNaN(orderPin)) ? null : true
                                            }
                                            className="order-view-submit-button" type="submit" value="Delete Order"/>
                                    </span>
                                </form>
                            </span>
                            : null
                        }
                    </div>
                    <div className="order-right-container">
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
                                            <span className="order-list-item">
                                                Order Pin:
                                            </span>
                                            : null
                                    }
                                    {
                                        pin !== undefined ?
                                            <span className="order-list-item order-list-item-text">
                                                {pin}
                                            </span>
                                            : null
                                    }
                                        <span className="order-list-item">
                                            Product:
                                        </span>
                                        <span className="order-list-item order-list-item-text">
                                            {bowItem.name}
                                        </span>
                                        <span className="order-list-item">
                                            Quantity:
                                        </span>
                                        <span className="order-list-item order-list-item-text">
                                            {quantity}
                                        </span>
                                        <span className="order-list-item">
                                            Message:
                                        </span>
                                        <span className="order-list-item order-list-item-text">
                                            {message}
                                        </span>
                                        <span className="order-list-item-last">
                                            <input disabled={
                                                (pin === "" || isNaN(pin)) ? true : null
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