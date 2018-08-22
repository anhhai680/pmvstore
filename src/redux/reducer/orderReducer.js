import {
    CREATE_NEW_ORDER_PENDING,
    CREATE_NEW_ORDER_SUCCESS,
    CREATE_NEW_ORDER_ERROR,
    FETCH_PRODUCT_VARIATION_PENDING,
    FETCH_PRODUCT_VARIATION_SUCCESS,
    FETCH_PRODUCT_VARIATION_ERROR
} from '../constants/actionTypes';

const INITIAL_STATE = {
    isWaiting: false,
    myOrders: [],
    request_error: null,
    resData: null,
    isFetchingVariation: false,
    productVariations: null
};

export default orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_NEW_ORDER_SUCCESS: {
            return {
                ...state,
                isWaiting: false,
                resData: action.payload.resData
            }
        }
        case CREATE_NEW_ORDER_ERROR: {
            return {
                isWaiting: false,
                request_error: {
                    code: action.payload.code,
                    message: action.payload.message,
                    status: action.payload.status
                }
            }
        }
        case CREATE_NEW_ORDER_PENDING: {
            return { ...state, isWaiting: true };
        }
        case FETCH_PRODUCT_VARIATION_PENDING: {
            return {
                ...state,
                isFetchingVariation: true
            };
        }
        case FETCH_PRODUCT_VARIATION_SUCCESS: {
            return {
                ...state,
                isFetchingVariation: false,
                productVariations: action.payload
            }
        }
        case FETCH_PRODUCT_VARIATION_ERROR: {
            return {
                isFetchingVariation: false,
                request_error: action.payload
            }
        }
        default:
            return state;
    }
}