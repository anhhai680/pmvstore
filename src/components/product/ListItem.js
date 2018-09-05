import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from "react-native";
import NumberFormat from 'react-number-format';

const _screen = Dimensions.get("window");
export default class ListItem extends Component {
    state = {
        fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
    }

    componentWillMount() {
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 1000
        }).start()
    }

    animatedIn() {
        Animated.timing(this.state.fadeAnim, {
            toValue: 0.8,
            duration: 500
        }).start()
    }

    animatedOut() {
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 1000
        }).start()
    }

    render() {
        const { item, styles, numColumns, onPressItem } = this.props
        const itemWidth = (_screen.width - (10 * numColumns)) / numColumns
        return (
            <View style={styles.item}>
                <TouchableWithoutFeedback
                    onPress={() => onPressItem(item)}
                    onPressIn={() => this.animatedIn()}
                    onPressOut={() => this.animatedOut()}
                >
                    <Animated.View style={{
                        alignItems: 'center',
                        opacity: this.state.fadeAnim,
                        transform: [{
                            scale: this.state.fadeAnim
                        }, {
                            translateY: this.state.fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                            }),
                        }]
                    }}>
                        <Image
                            source={{ uri: item.images[0].src }}
                            style={{
                                resizeMode: 'contain',
                                width: itemWidth,
                                height: numColumns > 1 ? _screen.width / _screen.scale : _screen.width - 150
                            }}
                        />
                        <View>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}
                                renderText={
                                    value => <Text style={styles.itemPrice}>{value}đ</Text>
                                }
                            />
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}