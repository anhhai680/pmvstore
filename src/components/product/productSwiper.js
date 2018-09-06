import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

export default class ProductSwiper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _heightScreen: Dimensions.get('screen').height,
            _scaleScreen: Dimensions.get('screen').scale
        };
    }

    // componentDidMount() {
    //     Dimensions.addEventListener('change', this.rotateDevice)
    // }

    // componentWillUnmount() {
    //     Dimensions.removeEventListener('change', this.rotateDevice)
    // }

    // rotateDevice = () => {
    //     this.setState({
    //         _widthScreen: Dimensions.get('screen').width
    //     })
    // }

    render() {
        const { images } = this.props;
        return (
            <Swiper
                style={styles.product_swiper}
                showsButtons={false}
                height={this.state._heightScreen / this.state._scaleScreen}
                showsPagination={true}
                autoplay={__DEV__ ? false : true}
                loop={true}
                removeClippedSubviews={false}>
                {images.map((item, index) => {
                    return (
                        <Image key={index} source={{ uri: item.src }}
                            style={styles.product_image} />
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
        justifyContent: "center"
    },
    product_image: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    }
});
