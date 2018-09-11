import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from "react-redux";
import { Container, Header, Left, Right, Body, Content, Text, Card, CardItem } from "native-base";
import NumberFormat from 'react-number-format';
import Ionicons from "react-native-vector-icons/Ionicons";
import ListOrderItem from "../components/order/ListOrderItem";
import { Constants } from '../common/Index';

class OrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderOrderInfos = (order) => {
        return (
            <Card>
                <CardItem header>
                    <Text>Thông tin đơn hàng (#{order.id})</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>{order.billing.last_name}</Text>
                        <Text>Địa chỉ: {order.billing.address_1}</Text>
                        <Text>Điện thoại: {order.billing.phone}</Text>
                        <Text>Email: {order.billing.email}</Text>
                        <Text>Thành phố:
                        {
                                Object.keys(Constants.arrCities).map((key, index) => {
                                    if (key === order.billing.city) {
                                        return Constants.arrCities[key]
                                    }
                                })
                            }
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body style={{ flexDirection: 'row' }}>
                        <Text style={styles.footerText}>Tổng cộng: </Text>
                        <NumberFormat value={order.total} displayType={'text'} thousandSeparator={true}
                            renderText={
                                value => <Text style={styles.priceTotal}>{value} đ</Text>
                            }
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    }

    renderCouponLines = (order) => {
        if (order.coupon_lines === null) return null;
        const { coupon } = order;
        let discount = coupon.discount_type === 'percent' ? `${Number(coupon.amount)}%` : Number(coupon.amount).toLocaleString(
            'vi-VN', {
                style: 'currency', currency: 'VND', currencyDisplay: 'đ'
            }
        );
        return (
            <Card>
                <CardItem>
                    <Body>
                        <Text>Mã giảm giá: {coupon.code}</Text>
                        <Text>Chiết khấu: {discount}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }

    renderOrderDetailContent = (products) => {
        if (products.length <= 0) return null;
        return (
            <FlatList
                data={products}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) =>
                    <ListOrderItem item={item} STT={index} style={styles} />
                }
            />
        )
    }

    renderOptionalInfos = (order) => {
        return (
            <Card>
                <CardItem>
                    <Body>
                        <Text>Phương thức thanh toán: {order.payment_method_title}</Text>
                        <Text>Ghi chú: {order.customer_note}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }

    render() {
        const { order } = this.props.navigation.state.params;
        return (
            <Container>
                <Header>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                            <Ionicons name='ios-arrow-back' size={38} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={styles.body}>Chi tiết đơn hàng</Text>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {this.renderOrderInfos(order)}
                    {/* {this.renderCouponLines(order)} */}
                    {this.renderOrderDetailContent(order.line_items)}
                    {this.renderOptionalInfos(order)}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
});

const mapActionsToProps = {
}

export default connect(mapStateToProps, mapActionsToProps)(OrderDetail);

var styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    content2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    amountproduct: {
        fontSize: 11,
        fontWeight: '200',
        marginLeft: 5
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ff8000'
    },
    priceproduct: {
        fontSize: 11,
        fontWeight: '200'
    },
    priceTotalproduct: {
        fontWeight: '400'
    },
    body: {
        color: '#FFF',
        fontSize: 16
    },
    priceTotal: {
        color: '#008000',
        fontWeight: 'bold'
    },
    footerText: {
        fontWeight: 'bold'
    },
});