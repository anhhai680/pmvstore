import {
    LOAD_ALL_CITY,
    UPDATE_SELECTED_CITY,
    SAVE_CUSTOMER_INFO,
    LOAD_CUSTOMER_INFO,
    FETCH_CUSTOMER,
    UNFETCH_CUSTOMER
} from "../constants/actionTypes";

const INITIAL_STATE = {
    arrCities: {
        'CT': 'Cần Thơ',
        'DN': 'Đà Nẵng',
        'HP': 'Hải Phòng',
        'HN': 'Hà Nội',
        'HCM': 'TP HCM',
        'AG': 'An Giang',
        'VT': 'Bà Rịa - Vũng Tàu',
        'BG': 'Bắc Giang',
        'BK': 'Bắc Kạn',
        'BL': 'Bạc Liêu',
        'BN': 'Bắc Ninh',
        'BT': 'Bến Tre',
        'BD': 'Bình Định',
        'BD': 'Bình Dương',
        'BP': 'Bình Phước',
        'BT': 'Bình Thuận',
        'CM': 'Cà Mau',
        'CB': 'Cao Bằng',
        'DL': 'Đắk Lắk',
        'DNO': 'Đắk Nông',
        'DB': 'Điện Biên',
        'DNA': 'Đồng Nai',
        'DT': 'Đồng Tháp',
        'GL': 'Gia Lai',
        'HG': 'Hà Giang',
        'HNA': 'Hà Nam',
        'HT': 'Hà Tĩnh',
        'HD': 'Hải Dương',
        'HGI': 'Hậu Giang',
        'HB': 'Hòa Bình',
        'HY': 'Hưng Yên',
        'KH': 'Khánh Hòa',
        'KG': 'Kiên Giang',
        'KT': 'Kon Tum',
        'LC': 'Lai Châu',
        'LD': 'Lâm Đồng',
        'LS': 'Lạng Sơn',
        'LCA': 'Lào Cai',
        'NC': 'Long An',
        'ND': 'Nam Định',
        'OH': 'Nghệ An',
        'OK': 'Ninh Bình',
        'OR': 'Ninh Thuận',
        'PA': 'Phú Thọ',
        'RI': 'Quảng Bình',
        'SC': 'Quảng Nam',
        'SD': 'Quảng Ngãi',
        'TN': 'Quảng Ninh',
        'TX': 'Quảng Trị',
        'UT': 'Sóc Trăng',
        'VT': 'Sơn La',
        'VA': 'Tây Ninh',
        'WA': 'Thái Bình',
        'WV': 'Thái Nguyên',
        'WI': 'Thanh Hóa',
        'WY': 'Thừa Thiên',
        'TG': 'Tiền Giang',
        'TV': 'Trà Vinh',
        'VL': 'Vĩnh Long',
        'VP': 'Vĩnh Phúc',
        'YB': 'Yên Bái',
        'PY': 'Phú Yên'
    },
    selectedCity: 'HCM',
    customerInfo: null,
    loading: true
};


export default checkoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_ALL_CITY:
            return { ...state }
        case FETCH_CUSTOMER:
            return { ...state }
        case UNFETCH_CUSTOMER:
            return {
                ...state,
                loading: false
            }
        case SAVE_CUSTOMER_INFO:
            return Object.assign(
                {},
                state,
                {
                    customerInfo: action.payload
                }
            )
        case LOAD_CUSTOMER_INFO:
            return Object.assign(
                {},
                state,
                {
                    loading: false,
                    customerInfo: action.payload
                }
            )
        default:
            return { ...state }
    }
}
