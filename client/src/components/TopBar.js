import React, { Component } from 'react';

class TopBar extends Component {
    render() {
        return (
            <div>
            <nav style={{display: 'flex'}}>
            <div style={{flexGrow: '1'}}>
                Github
                Order
            </div>
            <div style={{}}>
                Search
            </div>
            </nav>
            </div>
        );
    }
}

export default TopBar;