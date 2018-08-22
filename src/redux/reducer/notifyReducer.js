import {
    NOTIFICATION_SET,
    NOTIFICATION_GET,
    NOTIFICATION_FETCHING,
    NOTIFICATION_ERROR,
    NOTIFICATION_DELETE
} from "../constants/actionTypes";

const INITIAL_STATE = {
    isFetching: false,
    notifyDb: [],
    error: null
};


export default notifyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NOTIFICATION_FETCHING:
            return { ...state, isFetching: true };
        case NOTIFICATION_SET:
            return {
                ...state,
                isFetching: false
            };
        case NOTIFICATION_GET:
            return {
                ...state,
                isFetching: false,
                notifyDb: action.payload.data
            };
        case NOTIFICATION_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload.error
            };
        case NOTIFICATION_DELETE:
            return {
                ...state,
                notifyDb: action.payload.data
            }
        default:
            return state;
    }
}