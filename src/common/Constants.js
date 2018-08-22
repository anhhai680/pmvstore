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
};

export default Constants;