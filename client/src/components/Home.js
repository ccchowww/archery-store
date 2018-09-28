import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBowItems } from '../actions/bowItemActions';



class Home extends Component {

    state = {
        searchbarInput: '',
        filteredBowItems: [],
    }
    
    onChange = (e) => {
        this.setState({
            searchbarInput: e.target.value
        });
    }
    
    componentDidMount() {
        this.props.getBowItems()
    }

    

    render() {
        const { bowItems, loading } = this.props.bowItems;
        const filteredbowitems = [];
        const loadingIcon = () => {if (loading === true) {
            return (<h1>LOADING BOWITEMS AAH</h1>);
            }
            return
        }
        bowItems.forEach((bowitem) => {
            if (bowitem.name.toLowerCase().indexOf(this.state.searchbarInput.toLowerCase()) === -1
                && bowitem.manufacturer.toLowerCase().indexOf(this.state.searchbarInput.toLowerCase()) === -1) {
                return;
            }
            filteredbowitems.push(bowitem);
        })
        return (
            <div>
            <input type='text' onChange={this.onChange} value={this.state.searchbarInput}></input>
            {loadingIcon()}
            <ul style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', listStyle: 'none'}}>

            {filteredbowitems.map(({ _id, name, manufacturer, price }) => (
                
                <li style={{display: 'flex', width: '30%', padding: '10px', alignItems: 'center'}} className='item' key={_id}><img style={{}} src='https://picsum.photos/80/180' />{name + " "+ price + " $"}<br/>{manufacturer}<br/>{_id}</li>
            ))}
            </ul>
            </div>
        );
        
    }
}

const mapStateToProps = (state) => ({
    bowItems: state.bowItems
})


export default connect(mapStateToProps, { getBowItems })(Home);