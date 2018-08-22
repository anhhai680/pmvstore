import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

export default class badgeOrderProcess extends Component {
    render() {
        const { activedStep } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.rounded_box}>
                    <Text style={styles.tabactived}>1</Text>
                </View>
                <View style={styles.rounded_box}>
                    <Text style={styles.tabinactived}>2</Text>
                </View>
                <View style={styles.rounded_box}>
                    <Text style={styles.tabinactived}>3</Text>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabactived: {
        width: 35,
        height: 35,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: '#FF891E',
        borderColor: '#008000',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6,
        fontWeight: 'bold'
    },
    tabinactived: {
        width: 35,
        height: 35,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: 'gray',
        borderColor: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6
    },
    rounded_box: {
        margin: 20
    }
});