import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Container, Header, Left, Right, Body, Content, Text, Card, CardItem } from "native-base";
import NumberFormat from 'react-number-format';
import dateformat from 'dateformat';
import Ionicons from "react-native-vector-icons/Ionicons";
import ListOrderItem from "../components/order/ListOrderItem";
import { Constants } from '../common/Index';

export default class OrderDetail extends Component {

    renderOrderInfos = (order) => {
        return (
            <Card>
                <CardItem header>
                    <View>
                        <Text>Thông tin đơn hàng (#{order.id})</Text>
                        <Text style={styles.datecreateText}>Ngày đặt: {dateformat(new Date(order.date_created), "longDate")}</Text>
                    </View>
                    <Right>
                        <Text style={styles.statusOrder}>{
                            Object.keys(Constants.statusOrder).map(key => {
                                if (key === order.status) {
                                    return Constants.statusOrder[key]
                                }
                            })
                        }</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>{order.billing.last_name}</Text>
                        <Text>Địa chỉ: {order.billing.address_1}</Text>
                        <Text>Điện thoại: {order.billing.phone}</Text>
                        <Text>Email: {order.billing.email}</Text>
                        <Text>Thành phố: 
                        {
                            Object.keys(Constants.arrCities).map(key => {
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
        if (order === null) return null;
        let coupon = order.coupon_lines[0];
        if (coupon === undefined) return null;
        // let discount = Number(order.coupon_lines[0].discount).toLocaleString(
        //     'vi-VN', {
        //         style: 'currency', currency: 'VND', currencyDisplay: 'đ'
        //     }
        // );
        return (
            <Card>
                <CardItem>
                    <Body>
                        <Text>Mã giảm giá: {coupon.code}</Text>
                        <NumberFormat value={coupon.discount} displayType={'text'} thousandSeparator={true}
                            renderText={
                                value => <Text>Chiết khấu: {value} đ</Text>
                            }
                        />
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
                renderItem={({ item }) =>
                    <ListOrderItem item={item} isDetail={true} />
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
                    {this.renderCouponLines(order)}
                    {this.renderOrderDetailContent(order.line_items)}
                    {this.renderOptionalInfos(order)}
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    statusOrder: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18
    },
    datecreateText: {
        fontSize: 11,
        fontWeight: 'normal',
        fontStyle: 'italic'
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