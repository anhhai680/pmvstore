import { WooAPI } from '../../services/WooAPI';
import {
    HOME_PRODUCTS_REQUEST,
    HOME_PRODUCTS_SUCCESS,
    HOME_PRODUCTS_FAILURE,
    HOME_PRODUCTS_REFRESHING
} from '../constants/actionTypes';


export const getProducts = ({ pageSize, pageIndex }) => async (dispatch) => {
    dispatch({ type: HOME_PRODUCTS_REQUEST });
    try {
        const response = await WooAPI.getAllProducts(pageSize, pageIndex);
        if (response) {
            if (response.code !== undefined) {
                dispatch({
                    type: HOME_PRODUCTS_FAILURE,
                    payload: {
                        data: null,
                        statusCode: response.data.status,
                        statusMessage: response.message
                    }
                });
            }
            dispatch({
                type: HOME_PRODUCTS_SUCCESS,
                payload: {
                    data: response,
                    statusCode: response.status,
                    statusMessage: response.statusText
                }
            });
        }
    } catch (error) {
        dispatch({
            type: HOME_PRODUCTS_FAILURE,
            payload: {
                data: null,
                statusCode: -99,
                statusMessage: null
            }
        });
    }
};

export const productsRefreshing = ({ pageSize, pageIndex }) => (dispatch) => {
    dispatch(getProducts({ pageSize, pageIndex }));
};
