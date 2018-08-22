import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import ShareButton from './shareButton.js';
import CartButton from './CartButton.js';

export default class HeaderRightButtons extends Component {
    render(){
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginRight: 15}}>
                <ShareButton data={this.props.data} />
                <CartButton />
            </View>
        )
    }
}