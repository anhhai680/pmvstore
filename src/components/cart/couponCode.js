import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

export default class couponCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            couponCode: ''
        }
        this.onPressApplyButton = this.onPressApplyButton.bind(this);
        this.onPressCancelButton = this.onPressCancelButton.bind(this);
    }

    componentWillMount() {
        this.setState({
            couponCode: this.props.coupon === null ? '' : this.props.coupon.code
        })
    }

    // onTextFocused = () => {
    //     this.textInput.clear();
    // }

    onPressApplyButton = () => {
        const value = this.state.couponCode;
        if (value === '' || value === null) {
            Alert.alert('Thông báo', 'Vui lòng nhập mã giảm giá');
            return false;
        } else {
            if (this.props.coupon != null) {
                Alert.alert(
                    'Thông báo',
                    'Bạn muốn áp dụng mã giảm giá mới ? Mã giảm giá cũ sẽ không được áp dụng.',
                    [
                        {
                            text: 'ĐỒNG Ý', onPress: () => {
                                this.props.onCouponChangeText(value);
                            }
                        },
                        { text: 'KHÔNG', style: 'cancel' }
                    ],
                    { cancelable: false }
                )
            } else {
                this.props.onCouponChangeText(value);
            }
        }
    }

    onPressCancelButton = () => {
        Alert.alert(
            'Thông báo',
            'Bạn muốn huỷ mã giảm giá này ?',
            [
                {
                    text: 'ĐỒNG Ý', onPress: () => {
                        this.setState({
                            couponCode: ''
                        })
                        this.props.onCancelCoupon();
                    }
                },
                { text: 'KHÔNG', style: 'cancel' }
            ],
            { cancelable: false }
        )
    }

    render() {
        const { coupon } = this.props;
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={{ borderBottomWidth: 1, borderColor: '#DBDBDB' }}>
                        <TextInput
                            ref={input => { this.textInput = input }}
                            value={this.state.couponCode}
                            onChangeText={(value) => this.setState({ couponCode: value })}
                            //onFocus={() => this.onTextFocused()}
                            maxLength={10}
                            multiline={false}
                            underlineColorAndroid='transparent'
                            style={styles.textInput}
                            placeholder="Nhập mã giảm giá"
                            placeholderTextColor='#7D7D7D'
                        />
                    </View>
                    <Text style={{ fontSize: 9, fontStyle: 'italic' }}>
                        Hãy áp dụng 
                        <Text style={{ fontSize: 10, fontWeight: '900', color: '#F79620' }}> mã giảm giá </Text>
                        để được nhận ưu đãi.
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonApply} onPress={() => this.onPressApplyButton()}>
                    <Text style={styles.textButton}>Áp dụng</Text>
                </TouchableOpacity>
                {
                    coupon === null ? null :
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => this.onPressCancelButton()}>
                            <Text style={styles.textButton}>Huỷ</Text>
                        </TouchableOpacity>
                }
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
        flex: 1,
        borderRadius: 4,
        borderBottomWidth: 1,
        textAlign: 'left',
        padding: 2,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonApply: {
        backgroundColor: '#F79620',
        borderRadius: 5,
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    },
    buttonCancel: {
        backgroundColor: '#F79620',
        borderRadius: 5,
        width: 50,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    },
    textButton: {
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#FFF',
    }
});