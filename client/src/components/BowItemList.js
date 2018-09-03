import React, { Component } from 'react';
import uuid from 'uuid';

class BowItemList extends Component {
    state = {
        bowItems: [
            {id:uuid(), price: 111, name: "tiddies"},
            {id:uuid(), price: 111, name: "tiddies2"},
            {id:uuid(), price: 111, name: "tiddies3"},
            {id:uuid(), price: 111, name: "tiddies4"}
        ]
    }

    render() {
        const { bowItems } = this.state;
        return (
            <ul>
                {bowItems.map(({ id, price, name }) => (
                    <li key={id}>
                        {price}, {name}
                    </li>
                ))}
            </ul>
        );
    }
}

export default BowItemList;