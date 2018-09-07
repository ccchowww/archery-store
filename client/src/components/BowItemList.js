import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBowItems } from '../actions/bowItemActions';
import PropTypes from 'prop-types';

class BowItemList extends Component {
    
    componentDidMount() {
        this.props.getBowItems();
    }

    render() {
        const { bowItems } = this.props.bowItem;
        return (
            <div>
            <ul>
                
                {bowItems.map(({ _id, price, name, manufacturer }) => (
                    <li key={_id}>
                         {name}, {price}, {_id}, {manufacturer.name}
                         
                    </li>
                ))}
            </ul>
            </div>
        );
    }
}

BowItemList.propTypes = {
    getBowItems: PropTypes.func.isRequired,
    bowItem: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    bowItem: state.bowItem
})

export default connect(mapStateToProps, { getBowItems })(BowItemList);