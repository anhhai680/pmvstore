import React, { Component } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class FindProductButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameProduct: ''
        }
        this.validateFindProduct = this.validateFindProduct.bind(this);
    }

    componentWillMount() {

    }

    validateFindProduct() {
        const value = this.state.nameProduct;
        if (value === '' || value === null) {
            Alert.alert('Thông báo', 'Vui lòng nhập tên sản phẩm muốn tìm');
            return false;
        } else {
            //this.props.navigation.navigate('List', { products : null, isFindProduct : true })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TextInput
                    ref={input => { this.textInput = input }}
                    value={this.state.nameProduct}
                    onChangeText={(value) => this.setState({ nameProduct: value })}
                    style={styles.textInput}
                    multiline={false}
                    maxLength={100}
                    underlineColorAndroid='transparent'
                    placeholder="Tìm kiếm sản phẩm"
                    placeholderTextColor='#9A9A9A'
                />
                <TouchableOpacity onPress={() => this.validateFindProduct()} style={styles.iconSearch}>
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
    textInput: {
        flex: 1,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#FFF',
        backgroundColor: '#FFF',
        textAlign: 'left',
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 40,
        margin: 10,
        color: '#9A9A9A',
    },
});