import React, { Component } from "react";
import { StyleSheet, Text, ActivityIndicator, View, Dimensions } from "react-native";
//import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');
export default class Loading extends Component {

    componentDidMount() {
        // Animated.timing(this.state.loadingProgress, {
        //     toValue: 1,
        //     delay: 200,
        //     duration: 3000,
        //     //easing: Easing.linear,
        //     useNativeDriver: true
        // }).start();
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={'large'} color='#ff8000' />
                <Text style={styles.aniText}>Loading...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    aniText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        opacity: 0.85
    }
});