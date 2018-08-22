import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

export default class couponCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            couponCode: null
        }
        this.onPressButton = this.onPressButton.bind(this);
    }

    onTextFocused = () => {
        this.textInput.clear();
    }

    onPressButton = () => {
        const value = this.state.couponCode;
        if (value == undefined || value == null) {
            Alert.alert('Thông báo', 'Vui lòng nhập mã giảm giá');
            return false;
        } else {
            this.props.onCouponChangeText(value);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    ref={input => { this.textInput = input }}
                    value={this.state.couponCode}
                    onChangeText={(value) => this.setState({ couponCode: value })}
                    onFocus={() => this.onTextFocused()}
                    maxLength={10}
                    multiline={false}
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                    placeholder="Mã giảm giá"
                    placeholderTextColor='#cdcdcd'
                />
                <TouchableOpacity style={styles.button} onPress={() => this.onPressButton()}>
                    <Text style={styles.textButton}>Áp dụng</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 4,
        textAlign: 'center',
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0076CC',
        borderRadius: 5,
        width: 120,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8
    },
    textButton: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#FFF',
        //fontWeight: 'bold'
    }
});