import React, { Component } from 'react';


class Toolbar extends Component {

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <span>
                    {this.props.description}
                </span>
            </div>
        );
    }
}

class Landing extends Component {

    handleClick = (e) => {
        console.log("sex");
        console.log(e.target.name);
    }

    render() {
        const description = "Archery store - add, edit, delete or retrieve your orders!"
        return (
            <div>
                <Toolbar description={description}/>
                <div style={{display: 'flex'}}>
                    <span onClick={this.handleAllClick}>
                        <a>
                        <img src='https://picsum.photos/300/100' />
'                       <p>All Products</p>
                        </a>
                    </span>
                    <span onClick={this.handleArcheryStyleClick}>
                        <a>
                        <img src='https://picsum.photos/300/100' />
'                       <p>Products sorted by Archery Style</p>
                        </a>
                    </span>
                    <span onClick={this.handleManufacturerClick}>
                        <a>
                        <img src='https://picsum.photos/300/100' />
'                       <p>Products sorted by Manufacturer</p>
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}

export default Landing;