import { AsyncStorage } from "react-native";
import { WooAPI } from '../../services/WooAPI';
import {
    CREATE_NEW_ORDER_ERROR,
    CREATE_NEW_ORDER_PENDING,
    CREATE_NEW_ORDER_SUCCESS,
    SUCCESS_PAYMENT,
    FETCH_PRODUCT_VARIATION_PENDING,
    FETCH_PRODUCT_VARIATION_SUCCESS,
    FETCH_PRODUCT_VARIATION_ERROR,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_PENDING,
    FETCH_ORDERS_ERROR,
    EMPTY_CART_ITEM
} from '../constants/actionTypes';
import { saveCustomerInfo } from './checkoutAction';


export const createNewOrder = (orderInfo) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_NEW_ORDER_PENDING });
        const response = await WooAPI.createOrder(orderInfo);
        if (response) {
            if (response.hasOwnProperty("id")) {
                await AsyncStorage.getItem('orderDb', (error, result) => {
                    let orders = [];
                    if (result) {
                        orders = JSON.parse(result);
                    }
                    orders = [response, ...orders];
                    AsyncStorage.setItem('orderDb', JSON.stringify(orders), error => {
                        dispatch(saveCustomerInfo(response.billing));
                    })
                })
                dispatch({
                    type: CREATE_NEW_ORDER_SUCCESS,
                    payload: {
                        resData: response
                    }
                })
            }
            else {
                dispatch({
                    type: CREATE_NEW_ORDER_ERROR,
                    payload: {
                        code: response.code,
                        message: response.message,
                        status: response.data.status
                    }
                })
            }
        } else {
            dispatch({
                type: CREATE_NEW_ORDER_ERROR,
                payload: {
                    code: "unknown_error",
                    message: response,
                    status: -99
                }
            })
        }
    }
    catch (error) {
        dispatch({
            type: CREATE_NEW_ORDER_ERROR,
            payload: {
                code: "Exception error",
                message: error,
                status: -99
            }
        })
        console.error(error)
    }
}

export const successPayment = () => async (dispatch) => {
    try {
        await AsyncStorage.removeItem('pmvcart', (error) => {
            if (!error) {
                dispatch({
                    type: EMPTY_CART_ITEM
                })
            }
        })
        dispatch({ type: SUCCESS_PAYMENT });
    } catch (error) {
        console.error(error);
    }
}

export const fetchProductVariations = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCT_VARIATION_PENDING });
        const response = await WooAPI.productVariant(id);
        if (response) {
            if (response.hasOwnProperty("id")) {
                dispatch({
                    type: FETCH_PRODUCT_VARIATION_SUCCESS,
                    payload: response
                });
            } else {
                dispatch({
                    type: FETCH_PRODUCT_VARIATION_ERROR,
                    payload: {
                        code: response.code,
                        message: response.message,
                        status: response.data.status
                    }
                });
            }
        }
        else {
            dispatch({
                type: FETCH_PRODUCT_VARIATION_ERROR,
                payload: {
                    code: "unknown_error",
                    message: response,
                    status: -99
                }
            });
        }
    }
    catch (error) {
        dispatch({
            type: FETCH_PRODUCT_VARIATION_ERROR,
            payload: {
                code: "Exception error",
                message: error,
                status: -99
            }
        });
        console.error(error);
    }
}

export const fetchingOrders = (status) => (dispatch) => {
    dispatch({ type: FETCH_ORDERS_PENDING });
    WooAPI.getOrders(711, status)
        .then((response) => {
            if (response !== undefined) {
                dispatch({
                    type: FETCH_ORDERS_SUCCESS,
                    payload: {
                        data: response
                    }
                });
            }
            else {
                dispatch({
                    type: FETCH_ORDERS_ERROR,
                    payload: {
                        error: 'Cannot getting data from server.'
                    }
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: FETCH_ORDERS_ERROR,
                payload: {
                    error
                }
            });
        });
}