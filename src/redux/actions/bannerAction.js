import { WooAPI } from '../../services/WooAPI';
import {
    FETCH_BANNERSLIDER_BEGIN,
    FETCH_BANNERSLIDER_SUCCESS,
    FETCH_BANNERSLIDER_FAILURE
} from '../constants/actionTypes';


export const getbanner = () => (dispatch) => {
    dispatch({
        type: FETCH_BANNERSLIDER_BEGIN
    });
    WooAPI.getBannerSlider()
        .then((response) => {
            //console.log('getBannerSlider', response);
            if (response !== undefined) {
                dispatch({
                    type: FETCH_BANNERSLIDER_SUCCESS,
                    payload: {
                        data: response
                    }
                });
            }
            else {
                dispatch({
                    type: FETCH_BANNERSLIDER_FAILURE,
                    payload: {
                        error: 'Cannot getting data from server.'
                    }
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: FETCH_BANNERSLIDER_FAILURE,
                payload: {
                    error
                }
            });
        });
}