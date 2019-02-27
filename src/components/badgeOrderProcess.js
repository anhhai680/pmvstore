import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

export default class badgeOrderProcess extends Component {
    render() {
        const { activedStep } = this.props;
        return (
            <View style={styles.backgroundStepOrder}>
                <View style={styles.rounded_box}>
                    <View style={styles.view_line_box}>
                        <View style={styles.line_box} />
                    </View>
                    <View style={styles.view_tab}>
                        <Text style={styles.tabactived}>1</Text>
                        <Text style={activedStep >= 2 ? styles.tabactived : styles.tabinactived}>2</Text>
                        <Text style={activedStep === 3 ? styles.tabactived : styles.tabinactived}>3</Text>
                    </View>
                </View>
                <View style={styles.view_text}>
                    <Text style={styles.textLeft}>Giỏ hàng</Text>
                    <Text style={styles.textCenter}>Thanh toán</Text>
                    <Text style={styles.textRight}>Hoàn tất</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabactived: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#F79620',
        textAlign: 'center',
        fontSize: 17,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6,
        color: '#FFF',
    },
    tabinactived: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#FFF',
        textAlign: 'center',
        fontSize: 17,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6,
        borderWidth: 1,
        borderColor: '#F79620',
        color: '#F79620',
    },
    view_line_box: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    line_box: {
        flex: 1,
        backgroundColor: '#F79620',
        height: 10,
        borderRadius: 30,
    },
    view_tab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rounded_box: {
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    view_text: {
        justifyContent: 'space-between',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        flexDirection: 'row',
    },
    textCenter: {
        fontSize: 15,
    },
    textLeft: {
        fontSize: 15,
        marginLeft: -10,
    },
    textRight: {
        fontSize: 15,
        marginRight: -10,
    },
    backgroundStepOrder: {
        backgroundColor: '#FBFBFB',
    }
});