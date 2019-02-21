import {
    PRODUCT_REFRESHING,
    PRODUCT_TEM_COLOR_SELECTED,
    PRODUCT_INK_COLOR_SELECTED,
    PRODUCT_CODE_SELECTED,
    PRODUCT_PRINTER_SELECTED,
    PRODUCT_QUANTITY_CHANGED,
    PRODUCT_VARIATIONS_SUCCESS,
    PRODUCT_VARIATIONS_FAILURE,
} from "../constants/actionTypes";

const INITIAL_STATE = {
    initComponent: true,
    isLoading: false,
    isRefreshing: false,
    productDetail: null,
    productVariations: null,
    temSelected: 'Black',
    inkSelected: 'Black',
    printerSelected: '',
    codeSelected: 'GT1221 - 3,700 tem/hộp',
    productPrice: null,
    productId: null,
    productQuantity: '1'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCT_REFRESHING: {
            return {
                ...state,
                isRefreshing: false
            };
        }
        case PRODUCT_TEM_COLOR_SELECTED: {
            return {
                ...state,
                temSelected: action.payload.valueColor
            };
        }
        case PRODUCT_INK_COLOR_SELECTED: {
            return {
                ...state,
                inkSelected: action.payload.valueColor
            };
        }
        case PRODUCT_CODE_SELECTED: {
            return {
                ...state,
                codeSelected: action.payload.codeSelected
            };
        }
        case PRODUCT_PRINTER_SELECTED: {
            return {
                ...state,
                printerSelected: action.payload.selectedPrinter
            };
        }
        case PRODUCT_QUANTITY_CHANGED: {
            return {
                ...state,
                productQuantity: action.payload.productQuantity
            };
        }
        case PRODUCT_VARIATIONS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                productVariations: action.payload.data
            };
        }
        case PRODUCT_VARIATIONS_FAILURE:{
            return {
                ...state,
                isLoading: false
            };
        }
        default:
            return { ...state };
    }
};