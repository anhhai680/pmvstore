import { 
    NAVIGATE_TO_ORDER
} from '../constants/actionTypes';


export const navigateToOrder = () => (dispatch) => {
    dispatch({ type: NAVIGATE_TO_ORDER })
}