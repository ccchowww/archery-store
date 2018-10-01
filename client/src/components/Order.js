import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders, addOrder, updateOrder, deleteOrder } from '../actions/orderActions';
import "../App.css";


class Order extends Component {


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
            bowitem_id: this.props.selectedProductId,
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
        if (this.props.orderUserPin === "") {
            return null
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

        return (
            <div>
                <div className="order-view-selector">
                    <span className="order-view-selector-item" onClick={this.props.getOrderView}>Get</span>
                    <span className="order-view-selector-item" onClick={this.props.addOrderView}>Add</span>
                    <span className="order-view-selector-item" onClick={this.props.editOrderView}>Edit</span>
                    <span className="order-view-selector-item" onClick={this.props.deleteOrderView}>Delete</span>
                </div>
                <div className="order-view-main-container">
                    <div className="order-view-left-container">
                        {
                            this.props.activeTab === "get" ?
                                <span className="order-view-left-card">
                                    <form className="order-view-left-form" 
                                        onSubmit={this.retrieveOrders}
                                        >
                                        <span className="order-view-left-form-item">
                                            Enter Order Pin:
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
                                        <span className="order-view-left-form-item order-view-submit">
                                            <input className="order-view-submit-button" type="submit" value="Retrieve" />
                                        </span>
                                    </form>
                                    {loading === true ? <h1>LOADING ORDERS AHH HH</h1> : null}
                                </span>
                                : null
                        }
                        {
                        this.props.activeTab === "add" ?
                            <span className="order-view-left-card">
                                <form
                                    className="order-view-left-form"
                                    onSubmit={this.handleAddOrder}
                                    >
                                    <span className="order-view-left-form-item">
                                        Pin:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input className="order-view-left-form-input" 
                                            name="orderUserPin" type="number" value={orderUserPin} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span className="order-view-left-form-item">
                                        Quantity:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input className="order-view-left-form-input" 
                                            name="orderQuantity" type="number" value={orderQuantity} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span className="order-view-left-form-item">
                                        Message:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <textarea className="order-view-left-form-input" 
                                            name="orderMessage" value={orderMessage} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span className="order-view-left-form-item order-view-submit">
                                        <input className="order-view-submit-button" type="submit" value="Add Order"/>
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
                                    <span className="order-view-left-form-item">
                                        Pin:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input className="order-view-left-form-input"
                                            name="orderPin" type="number" value={orderPin} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span className="order-view-left-form-item">
                                        Quantity:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input className="order-view-left-form-input"
                                            name="orderQuantity" type="number" value={orderQuantity} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span className="order-view-left-form-item">
                                        Message:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <textarea className="order-view-left-form-input"
                                            name="orderMessage" value={orderMessage} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span className="order-view-left-form-item order-view-submit">
                                        <input className="order-view-submit-button" type="submit" value="Update Order"/>
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
                                    <span className="order-view-left-form-item">
                                        Pin:
                                    </span>
                                    <span className="order-view-left-form-item">
                                        <input className="order-view-left-form-input"
                                            name="orderUserPin" type="number" value={orderUserPin} onChange={orderFormChangeHandler}/>
                                    </span>
                                    <span className="order-view-left-form-item order-view-submit">
                                        <input className="order-view-submit-button" type="submit" value="Delete Order"/>
                                    </span>
                                </form>
                            </span>
                            : null
                        }
                        {/* {
                            selectedProductName === "" ? null :
                            <div className="order-view-left-selected-card">
                                <span className="order-view-left-selected-item">Selected Product:</span>
                                <span className="order-view-left-selected-item">{selectedProductName}</span>
                                <span className="order-view-left-selected-item">{selectedProductManufacturer}</span>
                                <span className="order-view-left-selected-item">{selectedProductPrice}</span>
                            </div>
                            
                        }
                        {
                            orderId === "" ? null :
                            <div className="order-view-left-selected-card">
                                <span className="order-view-left-selected-item">Selected Order:</span>
                                <span className="order-view-left-selected-item">Order Pin: {orderPin}</span>
                            </div>
                        } */}
                    </div>
                    <div className="order-right-container">
                        <div className="order-list-container">
                            {
                                orders.map(({ pin, bowItem, quantity, message, _id }) => (
                                    <div className="order-list-card" key={_id}>
                                        <span className="order-list-item">
                                            Order Pin:
                                        </span>
                                        <span className="order-list-item">
                                            {pin}
                                        </span>
                                        <span className="order-list-item">
                                            Product:
                                        </span>
                                        <span className="order-list-item">
                                            {bowItem.name}
                                        </span>
                                        <span className="order-list-item">
                                            Quantity:
                                        </span>
                                        <span className="order-list-item">
                                            {quantity}
                                        </span>
                                        <span className="order-list-item">
                                            Message:
                                        </span>
                                        <span className="order-list-item">
                                            {message}
                                        </span>
                                        <span className="order-list-item">
                                            <input className="order-list-item-button"
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orders: state.orders
})


export default connect(mapStateToProps, { getOrders, addOrder, updateOrder, deleteOrder })(Order);