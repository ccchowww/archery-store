import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBowItems } from '../actions/bowItemActions';


const filter = (data, searchterm) => {
    console.log(data);
    let filtereddata = data.forEach((obj) => {
            obj.filter(obj => obj.name.toLowerCase().includes(searchterm.toLowerCase()));
        });
    return console.log(filtereddata);
}

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
        const { bowItems, loading } = this.props.bowItem;
        const filteredbowitems = [];
        const loadingIcon = () => {if (loading === true) {
            return (<h1>LOADING AH</h1>);
            }
            return
        }
        bowItems.forEach((bowitem) => {
            if (bowitem.name.toLowerCase().indexOf(this.state.searchbarInput.toLowerCase()) === -1) {
                return;
            }
            filteredbowitems.push(bowitem);
        })
        return (
            <div>
                {loadingIcon()}
            <input type='text' onChange={this.onChange} value={this.state.searchbarInput}></input>
            <ul style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', listStyle: 'none'}}>

            {filteredbowitems.map(({ _id, name, price }) => (
                
                <li style={{width: '30%', padding: '10px'}} className='item' key={_id}><img src='https://picsum.photos/80/180' />{name+ " "}{price + " $"}</li>
            ))}
            </ul>
            </div>
        );
        
    }
}

const mapStateToProps = (state) => ({
    bowItem: state.bowItem
})


export default connect(mapStateToProps, { getBowItems })(Home);