import React, { Component } from "react";
import { StyleSheet, View, Animated, Easing, Dimensions } from "react-native";


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default class Slash extends Component {

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0.5);
        this.animatedValue2 = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.sequence([
            // // decay, then spring to start and twirl
            // Animated.decay(this.animatedValue2, {
            //     // coast to a stop
            //     velocity: { x: gestureState.vx, y: gestureState.vy }, // velocity from gesture release
            //     deceleration: 0.997,
            // }),
            Animated.parallel([
                // after decay, in parallel:
                Animated.spring(this.animatedValue, {
                    toValue: 1,
                    friction: 4,
                    delay: 2500,
                    useNativeDriver: true
                }),
                Animated.timing(this.animatedValue2, {
                    toValue: 1,
                    delay: 100,
                    //easing: Easing.back(),
                    duration: 3000,
                    useNativeDriver: true
                }),
            ]),
        ]).start(); // start the sequence group

        // Animated.spring(this.animatedValue, {
        //     toValue: 1,
        //     friction: 4,
        //     delay: 2500,
        //     useNativeDriver: true
        // }).start();

        // Animated.timing(this.animatedValue2, {
        //     toValue: 1,
        //     delay: 100,
        //     //easing: Easing.back(),
        //     duration: 3000,
        //     useNativeDriver: true
        // }).start();
    }

    render() {
        const logoStyle = {
            transform: [{
                scale: this.animatedValue2
            }]
        }

        const linearStyle = {
            transform: [{ scale: this.animatedValue2 }]
        }

        const translateX = this.animatedValue2.interpolate({
            inputRange: [0, 1],
            outputRange: [-(HEIGHT * 2), 0]
        });

        const translateY = this.animatedValue2.interpolate({
            inputRange: [0, 1],
            outputRange: [(HEIGHT * 2), 0]
        });

        return (
            <View style={styles.container}>
                <Animated.View>
                    {/* style={[styles.circle, { transform: [{ translateX }, { translateY }] }]}> */}
                    <Animated.Image
                        source={require('../assets/images/goldtags.png')}
                        style={[styles.logo, logoStyle]}
                    />
                </Animated.View>
                <Animated.View style={[styles.linear, linearStyle]} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cdcdcd'
    },
    circle: {
        width: HEIGHT * 2,
        height: HEIGHT * 2,
        borderRadius: HEIGHT,
        backgroundColor: '#FF8000',
        opacity: 0.75
    },
    logo: {
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        width: WIDTH / 2
    },
    linear: {
        position: 'absolute',
        bottom: 20,
        width: WIDTH / 2,
        height: 3,
        borderRadius: 2,
        backgroundColor: 'green'
    },
    company: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        opacity: 0.9
    }
});