import { AsyncStorage } from "react-native";
import {
    LOAD_ALL_CITY,
    UPDATE_SELECTED_CITY,
    SAVE_CUSTOMER_INFO,
    LOAD_CUSTOMER_INFO,
    FETCH_CUSTOMER,
    UNFETCH_CUSTOMER
} from '../constants/actionTypes';

const arrCities = [
    { key: 'CT', name: 'Cần Thơ' },
    { key: 'DN', name: 'Đà Nẵng' },
    { key: 'HP', name: 'Hải Phòng' },
    { key: 'HN', name: 'Hà Nội' },
    { key: 'HCM', name: 'TP HCM' },
    { key: 'AG', name: 'An Giang' },
    { key: 'VT', name: 'Bà Rịa - Vũng Tàu' },
    { key: 'BG', name: 'Bắc Giang' },
    { key: 'BK', name: 'Bắc Kạn' },
    { key: 'BL', name: 'Bạc Liêu' },
    { key: 'BN', name: 'Bắc Ninh' },
    { key: 'BT', name: 'Bến Tre' },
    { key: 'BD', name: 'Bình Định' },
    { key: 'BD', name: 'Bình Dương' },
    { key: 'BP', name: 'Bình Phước' },
    { key: 'BT', name: 'Bình Thuận' },
    { key: 'CM', name: 'Cà Mau' },
    { key: 'CB', name: 'Cao Bằng' },
    { key: 'DL', name: 'Đắk Lắk' },
    { key: 'DNO', name: 'Đắk Nông' },
    { key: 'DB', name: 'Điện Biên' },
    { key: 'DNA', name: 'Đồng Nai' },
    { key: 'DT', name: 'Đồng Tháp' },
    { key: 'GL', name: 'Gia Lai' },
    { key: 'HG', name: 'Hà Giang' },
    { key: 'HNA', name: 'Hà Nam' },
    { key: 'HT', name: 'Hà Tĩnh' },
    { key: 'HD', name: 'Hải Dương' },
    { key: 'HGI', name: 'Hậu Giang' },
    { key: 'HB', name: 'Hòa Bình' },
    { key: 'HY', name: 'Hưng Yên' },
    { key: 'KH', name: 'Khánh Hòa' },
    { key: 'KG', name: 'Kiên Giang' },
    { key: 'KT', name: 'Kon Tum' },
    { key: 'LC', name: 'Lai Châu' },
    { key: 'LD', name: 'Lâm Đồng' },
    { key: 'LS', name: 'Lạng Sơn' },
    { key: 'LCA', name: 'Lào Cai' },
    { key: 'NC', name: 'Long An' },
    { key: 'ND', name: 'Nam Định' },
    { key: 'OH', name: 'Nghệ An' },
    { key: 'OK', name: 'Ninh Bình' },
    { key: 'OR', name: 'Ninh Thuận' },
    { key: 'PA', name: 'Phú Thọ' },
    { key: 'RI', name: 'Quảng Bình' },
    { key: 'SC', name: 'Quảng Nam' },
    { key: 'SD', name: 'Quảng Ngãi' },
    { key: 'TN', name: 'Quảng Ninh' },
    { key: 'TX', name: 'Quảng Trị' },
    { key: 'UT', name: 'Sóc Trăng' },
    { key: 'VT', name: 'Sơn La' },
    { key: 'VA', name: 'Tây Ninh' },
    { key: 'WA', name: 'Thái Bình' },
    { key: 'WV', name: 'Thái Nguyên' },
    { key: 'WI', name: 'Thanh Hóa' },
    { key: 'WY', name: 'Thừa Thiên' },
    { key: 'TG', name: 'Tiền Giang' },
    { key: 'TV', name: 'Trà Vinh' },
    { key: 'VL', name: 'Vĩnh Long' },
    { key: 'VP', name: 'Vĩnh Phúc' },
    { key: 'YB', name: 'Yên Bái' },
    { key: 'PY', name: 'Phú Yên' },
];

export const loadCities = () => (dispatch) => {
    dispatch({
        type: LOAD_ALL_CITY,
        payload: arrCities
    })
}

export const saveCustomerInfo = (cusInfo) => async (dispatch) => {
    try {
        if (cusInfo !== null) {
            await AsyncStorage.setItem('CustomerInfo', JSON.stringify(cusInfo), (error) => {
                if (!error) {
                    dispatch({
                        type: SAVE_CUSTOMER_INFO,
                        payload: cusInfo
                    })
                } else {
                    console.error(error);
                }
            })
        }
    } catch (error) {
        console.error(error);
    }
}

export const loadCustomerInfo = () => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_CUSTOMER
        })
        await AsyncStorage.getItem('CustomerInfo', (error, result) => {
            if (result) {
                dispatch({
                    type: LOAD_CUSTOMER_INFO,
                    payload: JSON.parse(result)
                })
            } else if (result === null) {
                dispatch({
                    type: UNFETCH_CUSTOMER
                })
            } else if (error) {
                console.error(error);
            }
        })
    } catch (error) {
        console.error(error);
    }
}