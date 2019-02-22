import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Container, Header, Left, Right, Body, Content, Text, Card, CardItem, Title } from "native-base";
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
            </Card>
        )
    }

    renderPriceAndCoupon = (order) => {
        if (order === null) return null;
        let coupon = order.coupon_lines[0];
        if (coupon === undefined) return null;
        return (
            <Card>
                <CardItem>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Mã giảm giá: </Text>
                            <Text>{coupon.code}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Giảm giá: </Text>
                            <NumberFormat value={coupon.discount} displayType={'text'} thousandSeparator={true}
                                renderText={
                                    value => <Text>-{value} đ</Text>
                                }
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Tổng tạm tính: </Text>
                            <NumberFormat value={(parseFloat(order.total) + parseFloat(order.discount_total))} displayType={'text'} thousandSeparator={true}
                                renderText={
                                    value => <Text>{value} đ</Text>
                                }
                            />
                        </View>
                    </View>
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
                <CardItem header>
                    <View>
                        <Text>Phương thức thanh toán</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'normal' }}>{order.payment_method_title}</Text>
                    </View>
                </CardItem>
                {
                    order.customer_note != '' ?
                        <CardItem>
                            <Text>Ghi chú: {order.customer_note}</Text>
                        </CardItem>
                        : null
                }
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
                            <Ionicons name='ios-arrow-back' size={38} style={{ color: '#FFF' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title>Chi tiết đơn hàng</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {this.renderOrderInfos(order)}
                    {this.renderOptionalInfos(order)}
                    {this.renderPriceAndCoupon(order)}
                    <Card>
                        <CardItem>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Thành tiền: </Text>
                                <NumberFormat value={order.total} displayType={'text'} thousandSeparator={true}
                                    renderText={
                                        value => <Text style={styles.priceTotal}>{value} đ</Text>
                                    }
                                />
                            </View>
                        </CardItem>
                    </Card>
                    {this.renderOrderDetailContent(order.line_items)}
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
    priceTotal: {
        color: '#FD842B',
    },
});