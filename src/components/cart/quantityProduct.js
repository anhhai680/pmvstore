import React, { Component } from 'react';
import { View, TextInput, Platform } from 'react-native';

export default class quantityProduct extends Component {
    onTextFocused() {
        this.textInput.clear();
    }

    render() {
        return (
            <View style={{ alignItems: 'flex-start' }}>
                <TextInput
                    ref={input => { this.textInput = input }}
                    defaultValue="1"
                    value={(this.props.value !== '.' ? this.props.value : "1")}
                    onChangeText={this.props.quantityValueChange}
                    onFocus={() => this.onTextFocused()}
                    maxLength={2}
                    keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                    multiline={false}
                    underlineColorAndroid='transparent'
                    style={{ backgroundColor: '#cdcdcd', width: 100, textAlign: 'center', height: 50 }}
                />
            </View>
        );
    }
}
