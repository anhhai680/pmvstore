import {
    PRODUCT_ATTRIBUTE_TERM_REQUEST,
    PRODUCT_ATTRIBUTE_TERM_SUCCESS,
    PRODUCT_ATTRIBUTE_TERM_ERROR
} from "../constants/actionTypes";

const INITIAL_STATE = {
    isAttrFetching: false,
    requestAttrError: null,
    attributeTerms: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCT_ATTRIBUTE_TERM_REQUEST:
            return { ...state, isAttrFetching: true };
        case PRODUCT_ATTRIBUTE_TERM_SUCCESS:
            return {
                ...state,
                isAttrFetching: false,
                attributeTerms: action.payload.terms
            };
        case PRODUCT_ATTRIBUTE_TERM_ERROR:
            return {
                ...state,
                isAttrFetching: false,
                requestAttrError: action.payload
            };
        default:
            return { ...state };
    }
}