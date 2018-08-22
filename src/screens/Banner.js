import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const screenWidth = Dimensions.get('window').width;

export default class Banner extends PureComponent {
    render() {
        return (
            <View>
                <Swiper
                    style={styles.slider}
                    showsButtons={true}
                    autoplay={!__DEV__ ? true : false}
                    loop={true}
                    removeClippedSubviews={false}>
                    <View style={styles.slider_item}>
                        <Image
                            source={{
                                uri: "https://www.phanmemvang.com.vn/images/soft/christmas-20171221.jpg"
                            }}

                            style={styles.image}
                        />
                    </View>
                    <View style={styles.slider_item}>
                        <Image
                            source={{
                                uri: "https://www.phanmemvang.com.vn/images/slider/75.jpg"
                            }}

                            style={styles.image}
                        />
                    </View>
                    <View style={styles.slider_item}>
                        <Image
                            source={{
                                uri: "https://www.phanmemvang.com.vn/images/slider/73.jpg"
                            }}

                            style={styles.image}
                        />
                    </View>
                </Swiper>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    slider: {
        flex: 1,
        height: screenWidth >= 480 ? 250 : 200,
        justifyContent: "center",
        alignItems: 'center',
    },
    slider_item: {
        flex: 1,
        height: screenWidth >= 480 ? 250 : 200,
        justifyContent: "center",
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: screenWidth,
        resizeMode: 'cover',
    }
});