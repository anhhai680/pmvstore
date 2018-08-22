import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const screenWidth = Dimensions.get("window").width;
export default class ProductSwiper extends Component {
    render() {
        const { images } = this.props;
        return (
            <Swiper 
                style={styles.product_swiper}
                showsButtons={false}
                showsPagination={true}
                autoplay={__DEV__ ? false : true}
                width={screenWidth}
                loop={true}
                removeClippedSubviews={false}>
                {images.map((item, index) => {
                    return (
                        <Image key={index} source={{ uri: item.src }} style={styles.product_image} />
                    )
                })}
            </Swiper>
        );
    }
}

var styles = StyleSheet.create({
    product_swiper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: screenWidth >= 480 ? 300 : 200,
        width: screenWidth,
    },
    product_image: {
        flex: 1,
        width: screenWidth,
        height: screenWidth >= 480 ? 300 : 200,
        resizeMode: "cover",
        justifyContent: 'center',
        alignItems: 'center'
    }
});
