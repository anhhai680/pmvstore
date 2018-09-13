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
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item }) =>
                                    <TouchableOpacity onPress={() => this.onPressItem(this.props.item)}>
                                        <ListOrderItem item={item} isDetail={false} />
                                    </TouchableOpacity>
                                }
                            />
                        </Content>
                        <Footer style={styles.footer}>
                            <Right>
                                <View style={{ flexDirection: 'row', marginRight: 5 }}>
                                    <Text style={styles.footerText}>Tổng cộng: </Text>
                                    <NumberFormat value={item.total} displayType={'text'} thousandSeparator={true}
                                        renderText={
                                            value => <Text style={styles.priceTotal}>{value} đ</Text>
                                        }
                                    />
                                </View>
                            </Right>
                        </Footer>
                    </View >
                </CardItem>
            </Card>
        )
    }
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: '#008000',
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
    cancelText: {
        color: '#f00',
        fontWeight: 'bold'
    },
    completedText: {
        color: '#00f',
        fontWeight: 'bold'
    },
    footer: {
        backgroundColor: '#fff',
        height: 30,
        marginHorizontal: 2
    },
    footerText: {
        fontWeight: 'bold'
    },
    priceTotal: {
        color: '#008000',
        fontWeight: 'bold'
    },
});