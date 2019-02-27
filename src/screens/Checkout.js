import React, { Component } from "react";
import { StyleSheet, View, Modal, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Alert } from "react-native";
import { Container, Header, Left, Right, Content, Body, Text, Title } from 'native-base';
import { connect } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";

import BillingCity from "../components/checkout/billing_city";
import BadgeOrderProcess from "../components/badgeOrderProcess";
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
        this.loadCustomerInfo();
    }

    loadCustomerInfo = async () => {
        await this.props.loadCustomerInfo();
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
        if (this.props.loading) {
            return (
                <View style={{ flex: 1, marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator style={{ alignItems: 'center' }} size="large" />
                </View>
            )
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name="ios-arrow-back" size={38} style={{ color: '#FFF' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title>Thanh toán</Title>
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
                        <BadgeOrderProcess activedStep={2} />
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
    customerInfo: state.checkout.customerInfo,
    loading: state.checkout.loading
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
});