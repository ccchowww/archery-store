import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBowItems } from '../actions/bowItemActions';
import '../App.css';


class AllProducts extends Component {

    state = {
        filteredBowItems: [],
        manufacturer: '',
        archeryStyle: '',
        selectedName: '',
        selectedId: ''
    }
    

    onSelect = (_id, name) => {
        this.setState({
            selectedName: name,
            selectedId: _id
        });
    }

    
    componentDidMount() {
        this.props.getBowItems()
    }

    

    render() {
        const toolbarSearchValue = this.props.toolbarSearchValue;


        const { bowItems, loading } = this.props.bowItems;
        const filteredbowitems = [];
        const loadingIcon = () => {if (loading === true) {
            return (<h1>LOADING BOWITEMS AAH</h1>);
            }
            return
        }
        bowItems.forEach((bowitem) => {
            if (bowitem.name.toLowerCase().indexOf(toolbarSearchValue.toLowerCase()) === -1
                // && bowitem.manufacturer.toLowerCase().indexOf(this.state.searchbarInput.toLowerCase()) === -1
                // && bowitem.archeryStyle.toLowerCase().indexOf(this.state.searchbarInput.toLowerCase()) === -1
                ) {
                return;
            }
            filteredbowitems.push(bowitem);
        })

        return (
            <div className="all-products-view-container">
            {loadingIcon()}
                {filteredbowitems.map(({ _id, name, manufacturer, price, specs }) => (
                    <span 
                        className='all-products-item'
                        key={_id}
                        >
                        <span className="all-products-item-img">
                            <img style={{}} src='https://picsum.photos/80/180' />
                        </span>
                        <span className="all-products-item-info">
                            <span>{name}</span>
                            <span>{manufacturer}</span>
                            <span>{price}</span>
                            {

                            }
                        <input onClick={this.onSelect.bind(this, _id, name)} type="button" value="Select"/>        
                        </span>
                    </span>
                ))}
            </div>
        );
        
    }
}

const mapStateToProps = (state) => ({
    bowItems: state.bowItems
})


export default connect(mapStateToProps, { getBowItems })(AllProducts);