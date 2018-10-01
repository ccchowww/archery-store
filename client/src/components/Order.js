import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders, addOrder, updateOrder, deleteOrder } from '../actions/orderActions';
import "../App.css";


class Order extends Component {
    state = {
        activeTab: ""
    }


    handleAddOrder = e => {
        e.preventDefault();
        const pinNumber = parseInt(this.props.orderUserPin);
        const quantityNumber = parseInt(this.props.orderQuantity);
        const newOrder = {
            bowitem_id: this.props.selectedProductId,
            quantity: quantityNumber,
            message: this.props.orderMessage,
            pin: pinNumber
        }
        this.props.addOrder(newOrder);
    }

    handleUpdateOrder = e => {
        e.preventDefault();
        const pinNumber = parseInt(this.props.orderPin);
        const quantityNumber = parseInt(this.props.orderQuantity);
        const updatedOrder = {
            _id: this.props.orderId,
            bowitem_id: this.props.orderProductId,
            quantity: quantityNumber,
            message: this.props.orderMessage,
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
        this.props.getOrders(orderUserPin);
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

        return (
            <div>
                <div className="order-view-selector">
                    <span className="order-view-selector-item">Get</span>
                    <span className="order-view-selector-item">Add</span>
                    <span className="order-view-selector-item">Edit</span>
                    <span className="order-view-selector-item">Delete</span>
                </div>
                <div>
                    <div className="selected-thing-card">
                        <img className="selected-thing-card-img" src="https://picsum.photos/100/200" />
                        <div className="selected-thing-card-info">
                            Selected Product: {selectedProductName}
                        </div>
                    </div>
                    {loading === true ? <h1>LOADING ORDERS AHH HH</h1> : null}
                    <ul>
                        {
                            orders.map(({ pin, bowItem, quantity, message, _id }) => (
                            <li key={_id}>
                                {"order id: "+ _id + " " + bowItem.name + " " + bowItem._id + " number: " + quantity + " "+ pin + " " + message}
                                <input
                                    onClick={orderSelectHandler.bind(this, _id, pin, bowItem.name, bowItem._id)}
                                    type="button"
                                    value="Select"/>
                            </li>
                            ))
                        }
                    </ul>
                </div>
                    {
                        this.state.activeTab === "get" ?
                            <div>
                                <form onSubmit={this.retrieveOrders}>
                                    <label>
                                        Retrieve Orders with This Pin:
                                        <input type="number" placeholder="Pin between 1 - 9999"
                                            name="orderUserPin"
                                            onChange={orderFormChangeHandler}
                                            value={orderUserPin}
                                            />
                                    </label>
                                </form>
                            </div>
                            : null
                    }
                    {
                        this.state.activeTab === "add" ?
                            <div>
                                <form onSubmit={this.handleAddOrder}>
                                    <label>
                                        Pin:
                                        <input name="orderUserPin" type="number" value={orderUserPin} onChange={orderFormChangeHandler}/>
                                    </label>
                                    <label>
                                        Quantity:
                                        <input name="orderQuantity" type="number" value={orderQuantity} onChange={orderFormChangeHandler}/>
                                    </label>
                                    <label>
                                        Message:
                                        <textarea name="orderMessage" value={orderMessage} onChange={orderFormChangeHandler}/>
                                    </label>
                                    <input type="submit" value="Add Order"/>
                                </form>
                            </div>
                            : null
                            
                    }
                    {
                        this.state.activeTab === "update" ?
                        <div>
                            <form onSubmit={this.handleUpdateOrder}>
                                <label>
                                    Pin:
                                    <input name="orderPin" type="number" value={orderPin} onChange={orderFormChangeHandler}/>
                                </label>
                                <label>
                                    Quantity:
                                    <input name="orderQuantity" type="number" value={orderQuantity} onChange={orderFormChangeHandler}/>
                                </label>
                                <label>
                                    Message:
                                    <textarea name="orderMessage" value={orderMessage} onChange={orderFormChangeHandler}/>
                                </label>
                                <input type="submit" value="Update Order"/>
                            </form>
                        </div>
                            : null
                    }
                    {
                        this.state.activeTab === "delete" ?
                            <div>
                                <form onSubmit={this.handleDeleteOrder}>
                                    <label>
                                        Pin:
                                        <input name="orderUserPin" type="number" value={orderUserPin} onChange={orderFormChangeHandler}/>
                                    </label>
                                    <input type="submit" value="Delete Order"/>
                                </form>
                            </div>
                            : null
                    }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orders: state.orders
})


export default connect(mapStateToProps, { getOrders, addOrder, updateOrder, deleteOrder })(Order);