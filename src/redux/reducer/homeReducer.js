import {
    HOME_PRODUCTS_REQUEST,
    HOME_PRODUCTS_SUCCESS,
    HOME_PRODUCTS_FAILURE,
    HOME_PRODUCTS_REFRESHING
} from "../constants/actionTypes";

const INITIAL_STATE = {
    isLoading: false,
    isRefreshing: false,
    products: null,
    PRODUCTS_REQUEST_ERROR: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HOME_PRODUCTS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                PRODUCTS_REQUEST_ERROR: null
            };
        }
        case HOME_PRODUCTS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                products: action.payload.data,
                PRODUCTS_REQUEST_ERROR: null
            };
        }
        case HOME_PRODUCTS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                PRODUCTS_REQUEST_ERROR: {
                    hasError: false,
                    statusCode: action.payload.statusCode,
                    statusMessage: action.payload.status
                }
            };
        }
        default:
            return { ...state };
    }
};
