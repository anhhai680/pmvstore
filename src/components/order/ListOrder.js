import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import { Body, Header, Right, Left, Footer, Text, Content, Card, CardItem } from "native-base";
import NumberFormat from 'react-number-format';
import dateformat from 'dateformat';
import { Constants } from '../../common/Index';
import ListOrderItem from './ListOrderItem';

export default class ListOrder extends Component {

    onPressItem = (order) => {
        const { navigate } = this.props.navigation;
        navigate('OrderDetail', { order, id: order.id });
    }

    render() {
        const { item } = this.props;
        return (
            <Card>
                <CardItem>
                    <View style={{ flex: 1, marginHorizontal: -10 }}>
                        <TouchableOpacity onPress={() => this.onPressItem(item)}>
                            <Header style={styles.header}>
                                <Body>
                                    <Text style={styles.headerText}>Đơn hàng: #{item.id}
                                        {/* {item.order_key.replace('wc_order_', '').toUpperCase()} */}
                                    </Text>
                                    <Text style={styles.datecreateText}>Ngày đặt: {dateformat(new Date(item.date_created), "longDate")}</Text>
                                </Body>
                                <Left>
                                    <Text style={styles.headerText}>{
                                        Object.keys(Constants.statusOrder).map(key => {
                                            if (key === item.status) {
                                                return Constants.statusOrder[key]
                                            }
                                        })
                                    }</Text>
                                </Left>
                            </Header>
                        </TouchableOpacity>
                        <Content>
                            <FlatList
                                data={item.line_items}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) =>
                                    <TouchableOpacity onPress={() => this.onPressItem(this.props.item)}>
                                        <ListOrderItem item={item} isDetail={false} />
                                    </TouchableOpacity>
                                }
                            />
                        </Content>
                        <Footer style={styles.footer}>
                            <View style={{ flex: 1, marginHorizontal: 20, justifyContent: 'center' }}>
                                {
                                    item.discount_total > 0 ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Giảm giá: </Text>
                                            <NumberFormat value={item.discount_total} displayType={'text'} thousandSeparator={true}
                                                renderText={
                                                    value => <Text>-{value} đ</Text>
                                                }
                                            />
                                        </View>
                                        : null
                                }
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Thành tiền: </Text>
                                    <NumberFormat value={item.total} displayType={'text'} thousandSeparator={true}
                                        renderText={
                                            value => <Text style={styles.priceTotal}>{value} đ</Text>
                                        }
                                    />
                                </View>
                            </View>
                        </Footer>
                    </View >
                </CardItem>
            </Card>
        )
    }
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3F51B5',
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    datecreateText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#fff',
        fontWeight: '500'
    },
    footer: {
        backgroundColor: '#fff',
    },
    priceTotal: {
        color: '#FD842B'
    },
});