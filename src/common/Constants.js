import { Dimensions } from 'react-native';

const { width,height } = Dimensions.get("window");
const Constants = {
    Dimension: {
        ScreenWidth(percent = 1) {
          return Dimensions.get('window').width * percent
        },
        ScreenHeight(percent = 1) {
          return Dimensions.get('window').height * percent
        },
    },
    Window: {
        width: width,
        height: height,
        headerHeight: 65 * height / 100,
        headerBannerAndroid: 55 * height / 100,
        profileHeight: 45 * height / 100
    },
    PostImage: {
        small: 'small',
        medium: 'medium',
        medium_large: 'medium_large',
        large: 'large',
    },
    PostList: {  // Custom get All Products in Home Screen
        order: 'desc', // or asc - default is "desc" column
        orderby: 'date', // date, id, title and slug - default is "date" column
    },
    pagingLimit: 10,
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
    }
};

export default Constants;