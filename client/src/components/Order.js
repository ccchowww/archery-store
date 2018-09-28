import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders, addOrder, updateOrder, deleteOrder } from '../actions/orderActions';


class Order extends Component {
    state = {
        pin: "",
        bowItemId: "",
        quantity: "",
        message: "",
        orderId: "",
    }

    handleChange = (e) => {
        switch(e.target.name) {
            case 'pin':
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
            case 'quantity':
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
            case 'message':
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

    handleAddOrder = e => {
        e.preventDefault();
        const pinNumber = parseInt(this.state.pin);
        const quantityNumber = parseInt(this.state.quantity);
        const newOrder = {
            bowitem_id: this.state.bowItemId,
            quantity: quantityNumber,
            message: this.state.message,
            pin: pinNumber
        }
        this.props.addOrder(newOrder);
        // Add item via addItem action
    }

    handleUpdateOrder = e => {
        e.preventDefault();
        const pinNumber = parseInt(this.state.pin);
        const quantityNumber = parseInt(this.state.quantity);
        const updatedOrder = {
            _id: this.state.orderId,
            bowitem_id: this.state.bowItemId,
            quantity: quantityNumber,
            message: this.state.message,
            pin: pinNumber
        }
        this.props.updateOrder(updatedOrder);
    }

    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        const { orders, loading } = this.props.orders;
        return (
            <div>
                <div>
                    {loading === true ? <h1>LOADING ORDERS AHH HH</h1> : null}
                    <ul>
                        {
                            orders.map(({ pin, bowItem, quantity, message, _id }) => (
                            <li key={_id}>{"order id: "+ _id + " " + bowItem.name + " " + bowItem._id + " number: " + quantity + " "+ pin + " " + message}</li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <form onSubmit={this.handleAddOrder}>
                        <label>
                            Pin:
                            <input name="pin" type="number" value={this.state.pin} onChange={this.handleChange}/>
                        </label>
                        <label>
                            Quantity:
                            <input name="quantity" type="number" value={this.state.quantity} onChange={this.handleChange}/>
                        </label>
                        <label>
                            Message:
                            <textarea name="message" value={this.state.message} onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Add Order"/>
                    </form>
                </div>
                <div>
                    <form onSubmit={this.handleUpdateOrder}>
                        <label>
                            Pin:
                            <input name="pin" type="number" value={this.state.pin} onChange={this.handleChange}/>
                        </label>
                        <label>
                            Quantity:
                            <input name="quantity" type="number" value={this.state.quantity} onChange={this.handleChange}/>
                        </label>
                        <label>
                            Message:
                            <textarea name="message" value={this.state.message} onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Update Order"/>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orders: state.orders
})


export default connect(mapStateToProps, { getOrders, addOrder, updateOrder, deleteOrder })(Order);