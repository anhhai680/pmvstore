import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";

class IconBadge extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { focused, focusedName, unfocusedName, tintColor, cartItems } = this.props;
        return (
            <View>
                <Ionicons
                    name={focused ? focusedName : unfocusedName}
                    size={25}
                    style={{ color: tintColor }}
                />
                {
                    cartItems !== null && cartItems.length > 0 ?
                        <View style={styles.notification}>
                            <Text style={styles.textNotify}>{cartItems.length}</Text>
                        </View>
                        :
                        null
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems
});

export default connect(mapStateToProps)(IconBadge);

const styles = StyleSheet.create({
    notification: {
        position: 'absolute',
        top: 0,
        left: 12,
        width: 16,
        height: 16,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF0000'
    },
    textNotify: {
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
