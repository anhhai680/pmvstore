import { AsyncStorage } from "react-native";
import { WooAPI } from '../../services/WooAPI';
import {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    DELETE_CART_ITEM,
    EMPTY_CART_ITEM,
    UPDATE_CART_ITEM,
    FETCHING_CART_ITEM,
    COUPON_CODE_FETCHING,
    COUPON_CODE_SUCCESS,
    COUPON_CODE_ERROR,
    COUPON_CODE_VALIDATE,
    COUPON_CODE_CANCEL
} from '../constants/actionTypes';

export const fetchingCartItem = () => async (dispatch) => {
    try {
        let pmvcart = [];
        await AsyncStorage.getItem('pmvcart', (error, result) => {
            if (result) {
                pmvcart = JSON.parse(result);
                dispatch({
                    type: FETCHING_CART_ITEM,
                    payload: {
                        data: pmvcart
                    }
                })
            }
        })
    } catch (error) {
        console.error(error);
    }
}

export const addCartItem = (product) => async (dispatch) => {
    try {
        let pmvcart = [];
        const products = await AsyncStorage.getItem('pmvcart');
        if (products !== null && products.length > 0) {
            pmvcart = JSON.parse(products);
            const pIndex = pmvcart.findIndex(
                p => p.product_id === product.product_id &&
                    p.variation_id === product.variation_id) > -1 ? true : false;
            if (pIndex) { // Product is existing in storage
                pmvcart.map(item => {
                    if (item.product_id === product.product_id && item.variation_id === product.variation_id) {
                        const quantity = Number(item.quantity) + Number(product.quantity);
                        item.quantity = quantity;
                    }
                    return item;
                });
            } else {// Product does not exist in storage
                pmvcart = [product, ...pmvcart];
                //pmvcart.unshift(product);
            }

            await AsyncStorage.setItem('pmvcart', JSON.stringify(pmvcart),
                (error) => {
                    if (!error) {// Adding a new item to storage successful
                        dispatch({
                            type: ADD_CART_ITEM,
                            payload: {
                                data: pmvcart
                            }
                        })
                    } else {
                        //There is an error when adding a new item to storage
                        console.error(error);
                    }
                }
            )
        }
        else {
            pmvcart.push(product);
            AsyncStorage.setItem('pmvcart', JSON.stringify(pmvcart),
                (error) => {
                    if (!error) {// Adding a new item to storage successful
                        dispatch({
                            type: ADD_CART_ITEM,
                            payload: {
                                data: pmvcart
                            }
                        })
                    } else {
                        //There is an error when adding a new item to storage
                        console.error(error);
                    }
                }
            )
        }
    } catch (error) {
        console.error(error);
    }
}

export const updateCartItem = (product) => async (dispatch) => {
    try {
        let pmvcart = [];
        await AsyncStorage.getItem('pmvcart', (error, result) => {
            if (result) {
                pmvcart = JSON.parse(result);
                const index = pmvcart.findIndex(p => p.product_id === product.product_id &&
                    p.variation_id === product.variation_id);
                if (index > -1) {
                    pmvcart[index].quantity = product.quantity;
                    AsyncStorage.setItem('pmvcart', JSON.stringify(pmvcart), (error) => {
                        if (!error) {
                            dispatch({
                                type: UPDATE_CART_ITEM,
                                payload: {
                                    data: pmvcart
                                }
                            })
                        }
                    })
                }
            }
        })
    } catch (error) {
        console.error(error);
    }
}

export const deleteCartItem = (product) => async (dispatch) => {
    try {
        let pmvcart = [];
        let pmvcartTemp = [];
        await AsyncStorage.getItem('pmvcart', (error, result) => {
            if (result) {
                pmvcart = JSON.parse(result);
                pmvcartTemp = JSON.parse(result);
                if (pmvcart !== null && pmvcart.length > 0) {
                    pmvcart = pmvcartTemp.filter(p => p.product_id !== product.product_id ||
                       (p.product_id === product.product_id && p.variation_id !== product.variation_id));
                }
                AsyncStorage.setItem('pmvcart', JSON.stringify(pmvcart), (error) => {
                    if (!error) {
                        dispatch({
                            type: DELETE_CART_ITEM,
                            payload: {
                                data: pmvcart
                            }
                        })
                    }
                })
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export const emptyCartItem = () => async (dispatch) => {
    try {
        await AsyncStorage.removeItem('pmvcart', (error) => {
            if (!error) {
                dispatch({
                    type: EMPTY_CART_ITEM
                })
            }
        })
    } catch (error) {
        console.error(error);
    }
}

export const getCouponCodes = () => async (dispatch) => {
    try {
        dispatch({ type: COUPON_CODE_FETCHING });
        const response = await WooAPI.getAllCouponCode();
        if (response != null) {
            if (response.hasOwnProperty('code')) {
                dispatch({
                    type: COUPON_CODE_ERROR,
                    payload: {
                        code: response.code,
                        message: response.message,
                        status: response.data.status
                    }
                })
            } else if (response.length > 0) {
                dispatch({
                    type: COUPON_CODE_SUCCESS,
                    payload: response
                })
            }
        } else {
            dispatch({
                type: COUPON_CODE_ERROR,
                payload: {
                    code: "unknown_error",
                    message: response,
                    status: -99
                }
            })
        }
    } catch (error) {
        dispatch({
            type: COUPON_CODE_ERROR,
            payload: {
                code: "Exception error",
                message: error,
                status: -99
            }
        })
        console.error(error)
    }
}

export const checkCouponCode = (couponCode) => (dispatch, getState) => {
    console.log('getState', getState());
    dispatch({
        type: COUPON_CODE_VALIDATE,
        payload: {
            code: couponCode
        }
    })
}

export const cancelCouponCode = () => (dispatch) => {
    dispatch({ type: COUPON_CODE_CANCEL })
}