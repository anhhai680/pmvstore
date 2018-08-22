import React, { Component } from "react";
import { StyleSheet, View, Modal, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Alert } from "react-native";
import { Container, Header, Left, Right, Content, Body, Text } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from 'react-redux';

import BillingCity from "../components/checkout/billing_city";

import { createNewOrder } from "../redux/actions/orderAction";
import { emptyCartItem } from '../redux/actions/cartAction';
import { loadCities, saveCustomerInfo, loadCustomerInfo } from '../redux/actions/checkoutAction';


class Checkout extends Component {

    constructor(props) {
        super(props);
        this.completedOrder = this.completedOrder.bind(this);
    }

    componentDidMount() {
        this.props.loadCities();
        this.props.loadCustomerInfo();
    }

    componentDidUpdate(prevProps) {
        const { navigate } = this.props.navigation;
        // DON'T call setState in here
        if (prevProps.resData != this.props.resData) {
            if (this.props.request_error != null) {
                Alert.alert('Thông báo', this.props.request_error.message);
            }
            else {
                navigate('FinishOrder');
            }
        } else {
            if (this.props.request_error != null)
                Alert.alert('Thông báo', this.props.request_error.message)
        }
    }

    completedOrder = (value) => {
        if (value) {
            const { cartItems, coupon } = this.props;
            const orderInfo = {
                status: 'processing',
                payment_method: 'cod',
                payment_method_title: 'Thanh toán khi nhận hàng',
                set_paid: false,
                billing: value,
                shipping: value,
                line_items: cartItems,
                coupon_lines: coupon !== null ? [{ code: coupon.code }] : [],
                customer_note: value.note !== null ? value.note : ''
            }
            this.props.createNewOrder(orderInfo);
        } else {
            Alert.alert('Thông báo', 'Vui lòng nhập thông tin thanh toán bắt buộc!');
        }
    }

    onRequestClose = () => {
        Alert.alert('Thông báo', 'Hệ thống đang xử lý, vui lòng đợi trong giây lát!');
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-left" size={20} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Thanh toán</Text>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Modal
                            animationType='slide'
                            transparent={true}
                            visible={this.props.isWaiting}
                            onDismiss={() => this.props.isWaiting}
                            onRequestClose={() => this.onRequestClose}>
                            <View style={{ marginTop: 200, alignSelf: 'center', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="large" color="#00ff00" />
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={80}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.rounded_box}>
                                <Text style={styles.tabinactived}>1</Text>
                            </View>
                            <View style={styles.rounded_box}>
                                <Text style={styles.tabactived}>2</Text>
                            </View>
                            <View style={styles.rounded_box}>
                                <Text style={styles.tabinactived}>3</Text>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <BillingCity cityList={this.props.arrCities} cusInfo={this.props.customerInfo} completedOrder={this.completedOrder} />
                        </View>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems,
    coupon: state.cart.coupon,
    myOrders: state.order.myOrders,
    isWaiting: state.order.isWaiting,
    request_error: state.order.request_error,
    resData: state.order.resData,
    arrCities: state.checkout.arrCities,
    selectedCity: state.checkout.selectedCity,
    totalPrice: state.cart.totalPrice,
    customerInfo: state.checkout.customerInfo
});

const mapActionsToProps = {
    createNewOrder,
    emptyCartItem,
    loadCities,
    saveCustomerInfo,
    loadCustomerInfo
}

export default connect(mapStateToProps, mapActionsToProps)(Checkout);


var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 5,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#008000',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        width: '90%'
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