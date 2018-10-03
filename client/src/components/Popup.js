import React, { Component } from 'react';
import '../App.css';


class Popup extends Component {
    render () {
        return (
            <h1
                onClick={this.props.openPopup}
                >
                setpopupactive?
            </h1>
        )
    }
}

export default Popup