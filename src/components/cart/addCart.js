import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';

const _width = Dimensions.get('window').width;
export default class addCart extends Component {
    render() {
        return (
            <View style={{ alignItems: 'flex-start'}}>
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
    orderButton: {
        backgroundColor: '#018206',
        height: 50,
        width: _width,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    orderText:{
        fontSize: 16, 
        fontWeight: 'bold',
        color: 'white',
    }
});
