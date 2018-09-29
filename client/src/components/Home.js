import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBowItems } from '../actions/bowItemActions';

class Toolbar extends Component {

    render() {
        return (
            <div style={{display: 'flex'}}>
                <div style={{flexGrow: 1}}>
                    <input type="text" onChange={this.props.onChange} value={this.props.searchbarInput}/>
                </div>
                <div>
                    <div>Selected: {this.props.selectedName}</div>
                </div>
            </div>
        );
    }
}

class Home extends Component {

    state = {
        searchbarInput: '',
        filteredBowItems: [],
        manufacturer: '',
        archeryStyle: '',
        selectedName: '',
        selectedId: ''
    }
    
    onChange = (e) => {
        this.setState({
            searchbarInput: e.target.value
        });
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
        const { bowItems, loading } = this.props.bowItems;
        const filteredbowitems = [];
        const loadingIcon = () => {if (loading === true) {
            return (<h1>LOADING BOWITEMS AAH</h1>);
            }
            return
        }
        bowItems.forEach((bowitem) => {
            if (bowitem.name.toLowerCase().indexOf(this.state.searchbarInput.toLowerCase()) === -1
                // && bowitem.manufacturer.toLowerCase().indexOf(this.state.searchbarInput.toLowerCase()) === -1
                // && bowitem.archeryStyle.toLowerCase().indexOf(this.state.searchbarInput.toLowerCase()) === -1
                ) {
                return;
            }
            filteredbowitems.push(bowitem);
        })

        return (
            <div>
            <Toolbar
                onChange={this.onChange}
                searchbarInput={this.state.searchbarInput}
                selectedName={this.state.selectedName}
                />
            {loadingIcon()}
            <ul style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', listStyle: 'none'}}>

            {filteredbowitems.map(({ _id, name, manufacturer, price }) => (
                
                <li style={{display: 'flex', width: '30%', padding: '10px', alignItems: 'flex-start'}}
                    className='item'
                    key={_id}>
                        <img style={{}} src='https://picsum.photos/80/180' />
                            {name + " "+ price + " $"}<br/>{manufacturer}<br/>{_id}
                    <input onClick={this.onSelect.bind(this, _id, name)} type="button" value="Select"/>        
                </li>
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