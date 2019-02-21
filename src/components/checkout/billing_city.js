import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import tcom from "tcomb-form-native";


const Form = tcom.form.Form;
export default class billing_city extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: {
                //first_name: '',
                last_name: '',
                address_1: '',
                email: '',
                city: '',
                phone: '',
                note: ''
            }
        };
        this.validate = this.validate.bind(this);
        this.initForm();
    }

    initForm = () => {
        const { cityList, cusInfo } = this.props;

        //const billPhone = tcom.refinement(tcom.String, s => Validator.checkPhone(s) === undefined);
        //billPhone.getValidationErrorMessage = (s) => Validator.checkPhone(s);

        //const billEmail = tcom.refinement(tcom.String, s => Validator.checkEmail(s) === undefined);
        //billEmail.getValidationErrorMessage = (s) => Validator.checkEmail(s);

        this.BillingInfo = tcom.struct({
            //first_name: tcom.String,
            last_name: tcom.String,
            phone: tcom.String,
            email: tcom.String,
            address_1: tcom.String,
            city: tcom.enums(cityList),
            note: tcom.maybe(tcom.String) //Not require string
        });

        this.options = {
            auto: 'none',
            fields: {
                last_name: {
                    //label: 'Tên',
                    placeholder: 'Họ & tên',
                    error: 'Họ & tên không hợp lệ',
                    maxLength: 100
                },
                phone: {
                    //label: 'Số điện thoại',
                    placeholder: 'Điện thoại',
                    type: Number,
                    keyboardType: 'phone-pad',
                    maxLength: 15,
                    error: 'Số điện thoại không hợp lệ'
                },
                address_1: {
                    //label: 'Địa chỉ',
                    placeholder: 'Địa chỉ',
                    maxLength: 250,
                    error: 'Vui lòng nhập địa chỉ của bạn'
                },
                city: {
                    //label: 'Thành phố',
                    nullOption: { value: '', text: '--Chọn Tỉnh/Thành phố--' },
                    error: 'Vui lòng chọn Tỉnh/Thành phố của bạn!',
                    template: require('../checkout/select.android')
                },
                email: {
                    placeholder: 'Email',
                    error: 'Email không hợp lệ',
                    maxLength: 128
                },
                note: {
                    placeholder: 'Ghi chú đơn hàng',
                    maxLength: 250,
                    multiline: true
                }
            }
        };
    }

    componentDidMount() {
        const { cusInfo } = this.props;
        if (cusInfo !== null) {
            this.setState({
                value: {
                    last_name: cusInfo.last_name,
                    phone: cusInfo.phone,
                    address_1: cusInfo.address_1,
                    city: cusInfo.city,
                    email: cusInfo.email
                }
            });
        }
        this.refs.form.getComponent('last_name').refs.input.focus();
    }

    validate = (name, value) => {
        switch (name) {
            case 'first_name':
            case 'last_name':
                if (value == '' || value.length <= 0) {
                    return 'Vui lòng nhập Họ & Tên của bạn';
                }
                break;
            case 'phone':
                if (value == '' || value.length <= 0) {
                    return 'Vui lòng nhập số điện thoại của bạn';
                } else {
                    if (!this.validatePhone(value)) {
                        return 'Số điện thoại không hợp lệ';
                    }
                }
                break;
            case 'address_1':
                if (value == '' || value.length <= 0) {
                    return 'Vui lòng nhập địa chỉ của bạn';
                }
                break;
            case 'city':
                if (value == '' || value.length <= 0) {
                    return 'Vui lòng chọn Tỉnh/Thành phố của bạn';
                }
                break;
            case 'email':
                if (value == '' || value.length <= 0) {
                    return 'Vui lòng nhập địa chỉ Email của bạn';
                }
                else {
                    if (!this.validateEmail(value)) {
                        return 'Địa chỉ email không hợp lệ';
                    }
                }
                break;
            default:
                return 'Vui lòng kiểm tra lại thông tin mua hàng!';
        }
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    validatePhone = (phone) => {
        var re = /^([0-9]{9,15})$/
        return re.test(phone);
    }

    render() {
        return (
            <View>
                <Form
                    ref="form"
                    type={this.BillingInfo}
                    options={this.options}
                    value={this.state.value}
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                    const value = this.refs.form.getValue();
                    if (value) {
                        const phoneValid = this.validate('phone', value.phone);
                        const emailValid = this.validate('email', value.email);
                        if (phoneValid != undefined) {
                            Alert.alert('Thông báo', phoneValid);
                            return false;
                        }

                        if (emailValid != undefined) {
                            Alert.alert('Thông báo', emailValid);
                            return false;
                        }
                        return this.props.completedOrder(value);
                    }
                    else {
                        Alert.alert('Thông báo', 'Yêu cầu điền đầy đủ thông tin thanh toán');
                    }
                }}>
                    <Text style={styles.buttonText}>Đồng ý</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#3F51B5',
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});
