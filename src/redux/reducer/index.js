import { combineReducers } from 'redux';
import product from './productReducer';
import home from './homeReducer';
import cart from './cartReducer';
import order from './orderReducer';
import nav from './navReducer';
import checkout from './checkoutReducer';
import attribute from './attributeReducer';
import notify from "./notifyReducer";


export default combineReducers({
    nav,
    home,
    product,
    cart,
    order,
    checkout,
    attribute,
    notify
});
