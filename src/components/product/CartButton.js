import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";

import { navigateToOrder } from '../../redux/actions/navAction';

class CartButton extends Component {
    render() {
        const { cartItems, navigateToOrder } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigateToOrder()}>
                    <Ionicons
                        name='ios-cart'
                        size={24}
                        color='gray'
                    />
                    {
                        cartItems !== null && cartItems.length > 0 ?
                            <View style={styles.notification}>
                                <Text style={styles.textNotify}>{cartItems.length}</Text>
                            </View>
                            :
                            null
                    }
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems
});

const mapActionsToProps = {
    navigateToOrder
}

export default connect(mapStateToProps, mapActionsToProps)(CartButton);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 30
    },
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
