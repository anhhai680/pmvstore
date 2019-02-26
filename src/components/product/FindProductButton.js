import React, { Component } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, Keyboard } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class FindProductButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameProduct: '',
            visibleButtonFind: false,
        }
        this.validateFindProduct = this.validateFindProduct.bind(this);
        this.checkKeyPress = this.checkKeyPress.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        this.setState({
            visibleButtonFind: true
        })
    }

    _keyboardDidHide() {
        this.setState({
            visibleButtonFind: false
        })
    }

    validateFindProduct() {
        const value = this.state.nameProduct;
        if (value === null) { return false }
        if (value.trim() === '') {
            Alert.alert('Thông báo', 'Vui lòng nhập sản phẩm muốn tìm');
            return false;
        } else {
            //this.props.navigation.navigate('List', { products : null, isFindProduct : true })
        }
    }

    checkKeyPress = (e) => {
        alert(e.nativeEvent.key)
        // if (e.nativeEvent.key === 'Enter') {
        //     this.validateFindProduct()
        // }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TextInput
                    ref={input => { this.textInput = input }}
                    value={this.state.nameProduct}
                    onChangeText={(value) => this.setState({ nameProduct: value })}
                    onKeyPress={(e) => this.checkKeyPress(e)}
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.textInput}
                    multiline={false}
                    maxLength={100}
                    underlineColorAndroid='transparent'
                    placeholder="Tìm kiếm sản phẩm"
                    placeholderTextColor='#9A9A9A'
                />
                {
                    this.state.visibleButtonFind ?
                        <TouchableOpacity vi onPress={() => this.validateFindProduct()} style={styles.iconSearch}>
                            <Ionicons name='ios-search' size={35} style={{ color: '#9A9A9A' }} />
                        </TouchableOpacity>
                        : null
                }
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