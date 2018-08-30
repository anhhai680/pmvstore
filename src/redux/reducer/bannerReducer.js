import {
    FETCH_BANNERSLIDER_BEGIN,
    FETCH_BANNERSLIDER_SUCCESS,
    FETCH_BANNERSLIDER_FAILURE
} from '../constants/actionTypes';

const initialState = {
    banners: null,
    loading: false,
    error: null
};

export default bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BANNERSLIDER_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_BANNERSLIDER_SUCCESS:
            const itemList = action.payload.data;
            //console.log('itemList', itemList);
            return {
                ...state,
                loading: false,
                banners: itemList
            };
        case FETCH_BANNERSLIDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}