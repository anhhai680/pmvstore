import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Body, Header, Right, Left, Footer, Text, Content, Card, CardItem } from "native-base";
import NumberFormat from 'react-number-format';
import { Constants } from '../../common/Index';
import ListOrderItem from './ListOrderItem';

export default class ListOrder extends Component {

    formatDatetime = (dateTimeValue) => {
        // var dtString = new Date(dateTimeValue)
        // var newDateTime = ''
        // newDateTime += ('0' + dtString.getDate()).slice(-2) + '-'
        // newDateTime += ('0' + (dtString.getMonth() + 1)).slice(-2) + '-'
        // newDateTime += dtString.getFullYear().toString() + ' '
        // newDateTime += ('0' + dtString.getHours()).slice(-2) + ':'
        // newDateTime += ('0' + dtString.getMinutes()).slice(-2) + ':'
        // newDateTime += ('0' + dtString.getSeconds()).slice(-2)
        // return newDateTime;
        return dateTimeValue;
    }

    onPressItem = (order) => {
        const { navigate } = this.props.navigation;
        navigate('OrderDetail', { order, id: order.id });
    }

    render() {
        const { item } = this.props;
        var styleStatus = styles.headerText;
        styleStatus = item.status === 'cancelled' ? styles.cancelText :
            item.status === 'completed' ? styles.completedText : styleStatus;
        return (
            <Card>
                <CardItem>
                    <View style={{ flex: 1, marginHorizontal: -10 }}>
                        <TouchableOpacity onPress={() => this.onPressItem(this.props.item)}>
                            <Header style={styles.header}>
                                <Body>
                                    <Text style={styles.headerText}>Đơn hàng: {item.order_key.replace('wc_order_', '').toUpperCase()}</Text>
                                    <Text style={styles.headerText}>Ngày đặt: {this.formatDatetime(item.date_created)}</Text>
                                </Body>
                                <Left>
                                    <Text style={styleStatus}>{
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
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity onPress={() => this.onPressItem(this.props.item)}>
                                        <ListOrderItem item={item} STT={index} style={styles} />
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


var styles = StyleSheet.create({
    header: {
        backgroundColor: '#ff9428',
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold'
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
    content2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    content: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ff8000'
    },
    productImage: {
        width: 75,
        height: 75,
        borderWidth: 0.5,
        fontWeight: 'bold'
    },
    priceproduct: {
        fontSize: 11,
        fontWeight: '200'
    },
    priceTotalproduct: {
        fontWeight: '400'
    },
    priceTotal: {
        color: '#ff0018',
        fontWeight: 'bold'
    },
    amountproduct: {
        fontSize: 11,
        fontWeight: '200',
        marginLeft: 5
    }
});