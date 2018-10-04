import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBowItems, openPopup } from '../actions/bowItemActions';
import './styles/AllProducts.css'
import compoundBow from '../images/compoundBow.png';
import recurveRiser from '../images/recurveRiser.png';
import recurveLimbs from '../images/recurveLimbs.png';


class AllProducts extends Component {

    state = {
        filteredBowItems: [],
        manufacturer: '',
        archeryStyle: ''
    }
    
    componentDidMount() {
        this.props.bowItems.bowItems.length === 0 ?
            this.props.getBowItems()
            : null
    }

    selectAndOpenPopup = (_id, name, manufacturer, price) => {
        const popupState = this.props.bowItems.popupState;

        this.props.openPopup(popupState.toString());
        this.props.selectProductHandler(_id, name, manufacturer, price)
    }

    render() {
        const toolbarSearchValue = this.props.toolbarSearchValue;

        const selectProductHandler = this.props.selectProductHandler;
        const selectedProductId= this.props.selectedProduct;
        
        const { bowItems, loading } = this.props.bowItems;
        const filteredbowitems = [];
        
        bowItems.forEach((bowitem) => {
            if (bowitem.name.toLowerCase().indexOf(toolbarSearchValue.toLowerCase()) === -1
                && bowitem.manufacturer.toLowerCase().indexOf(toolbarSearchValue.toLowerCase()) === -1
                // && bowitem.archeryStyle.toLowerCase().indexOf(toolbarSearchValue.toLowerCase()) === -1
                ) {
                return;
            }
            filteredbowitems.push(bowitem);

        })

        const selectedStyle = {
            boxShadow: '0 4px 14px 0 rgba(0,0,0,0.4)',
            backgroundColor: 'rgba(0, 183, 255, 0.8)',
            color: 'white',
            fontWeight: 500
        }

        const keyByIndex = (obj, index) => {
            let key = Object.keys(obj)[index];
            return key;
        }
        const valueByIndex = (obj, index) => {
            let key = Object.keys(obj)[index];
            return obj[key];
        }

        const locale = this.props.currentLocale;
        const calculatePriceByLocale = (locale, price) => {
            switch (locale.string) {
                case "en-SG": 
                    return parseInt(price * 10000 * 1.37 / 10000, 10);
                
                case "en-MY": 
                    return parseInt(price * 10000 * 4.14 / 10000, 10);
                
                case "en-US": 
                    return parseInt(price, 10);

                case "en-EU":
                    return parseInt(price * 10000 * 0.87 / 10000, 10);

                case "en-GB":
                    return parseInt(price * 10000 * 0.77 / 10000, 10);
                default:
                    return price;
            }
        }

        const selectImage = (bowType) => {
            switch(bowType) {
                case "Compound":
                    return compoundBow;
                case "Riser":
                    return recurveRiser;
                case "Recurve Limbs":
                    return recurveLimbs;
                default:
                    return null;
            }
        }

        
        return (
            <div className="all-products-view-container">
                {filteredbowitems.map(({ _id, name, bowType, manufacturer, price, specs }) => (
                    <span
                        onClick={this.selectAndOpenPopup.bind(this, _id, name, manufacturer, price)}
                        style={
                                _id === selectedProductId ?
                                selectedStyle
                                : null
                        }
                        className='all-products-item'
                        key={_id}
                        >
                        <span className="all-products-item-img">
                            <img
                                className="all-products-item-img-tag"
                                src={
                                        selectImage(bowType)
                                    }
                                alt="Archery equipment"
                                />
                        </span>
                        <span className="all-products-info-list-specs">
                            <span className="all-products-info-list-specs-item">
                                    {keyByIndex(specs, 0)}:
                                </span>
                                <span className="all-products-info-list-specs-item all-products-info-list-specs-item-text">
                                    {valueByIndex(specs, 0)}
                                </span>
                                <span className="all-products-info-list-specs-item ">
                                    {keyByIndex(specs, 1)}:
                                </span>
                                <span className="all-products-info-list-specs-item all-products-info-list-specs-item-text">
                                    {valueByIndex(specs, 1)}
                                </span>
                                <span className="all-products-info-list-specs-item ">
                                    {keyByIndex(specs, 2)}:
                                </span>
                                <span className="all-products-info-list-specs-item all-products-info-list-specs-item-text">
                                    {valueByIndex(specs, 2)}
                                </span>
                            </span>
                        <span className="all-products-info-list">
                            <span className="all-products-info-list-item">{name}</span>
                            <span className="all-products-info-list-item">{manufacturer}</span>
                            <span className="all-products-info-list-item all-products-info-list-item-last">
                                {calculatePriceByLocale(locale, price).toLocaleString(locale.string,{style: locale.object.style, currency:locale.object.currency})}
                            </span>
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


export default connect(mapStateToProps, { getBowItems, openPopup })(AllProducts);