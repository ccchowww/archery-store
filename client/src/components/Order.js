import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders, addOrder, updateOrder, deleteOrder } from '../actions/orderActions';

class Toolbar extends Component {

    render() {
        return (
            <div style={{display: 'flex'}}>
                <div style={{flexGrow: 1}}>
                </div>
                <div>
                    <div>Selected: {this.props.selectedName}</div>
                </div>
            </div>
        );
    }
}


class Order extends Component {
    state = {
        pin: "",
        userPin: "",
        bowItemId: "",
        quantity: "",
        message: "",
        orderId: "",
        orderName: ""
    }

    handleSelect = (_id, pin, orderName) => {
        const pinNumber = parseInt(pin);
        this.setState({
            pin: pinNumber,
            orderId: _id,
            orderName: orderName
        });
    }

    handleChange = (e) => {
        switch(e.target.name) {
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
                });
                return;
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

    handleDeleteOrder = e => {
        e.preventDefault();
        const pinNumber = parseInt(this.state.pin);
        const userPinNumber = parseInt(this.state.userPin);
        console.log(pinNumber, userPinNumber);
        if (pinNumber === userPinNumber) {
            const DeleteOrder = {
                _id: this.state.orderId
            };
            console.log(DeleteOrder);
            this.props.deleteOrder(DeleteOrder);
        } else {
            alert('Pin does not match order');
        }
    }

    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        const { orders, loading } = this.props.orders;
        return (
            <div>
                <Toolbar 
                    selectedName={this.state.orderName}
                    />
                <div>
                    {loading === true ? <h1>LOADING ORDERS AHH HH</h1> : null}
                    <ul>
                        {
                            orders.map(({ pin, bowItem, quantity, message, _id }) => (
                            <li key={_id}>
                                {"order id: "+ _id + " " + bowItem.name + " " + bowItem._id + " number: " + quantity + " "+ pin + " " + message}
                                <input
                                    onClick={this.handleSelect.bind(this, _id, pin, bowItem.name, bowItem._id, _id)}
                                    type="button"
                                    value="Select"/>
                            </li>
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
                <div>
                    <form onSubmit={this.handleDeleteOrder}>
                        <label>
                            Pin:
                            <input name="userPin" type="number" value={this.state.userPin} onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Delete Order"/>
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