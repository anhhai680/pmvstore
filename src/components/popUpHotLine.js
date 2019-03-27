import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import LottieView from "lottie-react-native";
export default class PopUpHotLine extends Component {
    componentDidMount() {
        this.animation.play();
    }
    render() {
        return (
            <View style={styles.animationPopup}>
                <TouchableOpacity style={styles.viewTouch} onPress={() => {
                    Linking.canOpenURL('tel:19006037').then(supported => {
                        if (!supported) {
                            console.log("Thiết bị của bạn không hỗ trợ cuộc gọi!");
                        } else {
                            return Linking.openURL('tel:19006037');
                        }
                    }).catch(err => console.error('An error occurred', err));
                }} >
                    <LottieView
                        ref={animation => {
                            this.animation = animation;
                        }}
                        source={require('../assets/animation.json')}></LottieView>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    animationPopup: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        bottom: 0,
        height: 60,
        width: 60,
        borderRadius: 100
    },
    viewTouch :{
        height: 60,
        width: 60,
        backgroundColor: '#F58906',
        borderRadius: 100
    },
});