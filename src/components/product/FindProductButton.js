import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, } from "react-native";
import { Text, } from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class FindProductButton extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchProduct')} style={styles.btnSearch}>
                    <Text style={{ color: '#9A9A9A' }}>Tìm sản phẩm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchProduct')} style={styles.iconSearch}>
                    <Ionicons name='ios-search' size={35} style={{ color: '#9A9A9A' }} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconSearch: {
        position: 'absolute',
        marginRight: 15,
        right: 0,
        marginTop: 10
    },
    btnSearch: {
        flex: 1,
        borderRadius: 2,
        borderWidth: 1,
        margin: 10,
        paddingLeft: 10,
        borderColor: '#FFF',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        color: '#9A9A9A',
    },
});