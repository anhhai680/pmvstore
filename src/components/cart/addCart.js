import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';

const _width = Dimensions.get('window').width;
export default class addCart extends Component {
    render() {
        return (
            <View style={styles.viewTouch}>
                <TouchableOpacity
                    style={styles.orderButton}
                    onPress={() => this.props.addProductToCartItem(this.props.product)}
                >
                    <Text style={styles.orderText}>Mua hàng</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewTouch: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#015205',
        borderWidth: 0.5,
        position: 'absolute'
    },
    orderButton: {
        flex: 1,
        height: 50,
        backgroundColor: '#018206',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    orderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
});
