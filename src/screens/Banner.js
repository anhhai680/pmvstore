import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, ActivityIndicator, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from "react-redux";

import { getbanner } from "../redux/actions/bannerAction";
import FullWidthImage from "../components/FullWidthImage";

const screenWidth = Dimensions.get('screen').width;
class Banner extends Component {

    constructor(props) {
        super(props);
        this.renderBannerItem = this.renderBannerItem.bind(this);
    }

    componentDidMount() {
        this.props.getbanner();
    }

    renderBannerItem = (items) => {
        if (items !== null && items.length > 0) {
            return items.map((item, index) => {
                return (
                    // <View key={index} style={styles.slider_item}>
                    //     <Image
                    //         source={{
                    //             uri: item.url
                    //         }}
                    //         style={styles.image}
                    //     />
                    // </View>
                    <FullWidthImage image_url={item.url} />
                )
            })
        }
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        if (this.props.banners === null) {
            return (
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    <Text>{this.props.error}</Text>
                </View>
            )
        }
        return (
            <View>
                <Swiper
                    style={styles.slider}
                    showsButtons={true}
                    autoplay={!__DEV__ ? true : false}
                    loop={true}
                    removeClippedSubviews={false}>
                    {
                        this.renderBannerItem(this.props.banners)
                    }
                </Swiper>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.banner.loading,
    banners: state.banner.banners,
    error: state.banner.error
});

const mapActionToProps = {
    getbanner
}

export default connect(mapStateToProps, mapActionToProps)(Banner);


var styles = StyleSheet.create({
    slider: {
        width: screenWidth,
        height: screenWidth / 2,
        justifyContent: "center",
        alignItems: 'center'
    },
    slider_item: {
        //flex: 1,
        //height: screenWidth >= 480 ? 250 : 150,
        width: screenWidth,
        height: screenWidth / 2,
        justifyContent: "center",
        alignItems: 'center'
    },
    image: {
        flex: 1,
        //aspectRatio: 1.5,
        width: screenWidth,
        height: screenWidth / 2,
        resizeMode: 'cover',
        justifyContent: "center",
        alignItems: 'center'
    }
});