import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Left, Right, Footer, Body, Text, Container, Content } from "native-base";
import NumberFormat from 'react-number-format';

export default class ListOrder extends Component {
    render() {
        return (
            <View style={styles.viewList}>
                <View style={styles.body}>
                    <Image
                        source={{
                            uri: this.props.item.image
                        }}
                        style={styles.productImage}
                        resizeMode='contain'
                    />
                    <View style={styles.content}>
                        <Text style={styles.productName}>{this.props.item.name}</Text>
                        <View style={styles.content2}>
                            <NumberFormat value={this.props.item.price} displayType={'text'} thousandSeparator={true}
                                renderText={
                                    value => <Text style={styles.priceproduct}>Giá: {value} đ</Text>
                                }
                            />
                            <Text style={styles.status}>Mới lập</Text>
                        </View>
                        <Text style={styles.amountproduct}>SL: {this.props.item.quantity}</Text>
                    </View>
                </View>
                <Footer style={styles.footer}>
                    <Right>
                        <View style={{ flexDirection: 'row', marginRight: 5 }}>
                            <Text>Tổng cộng: </Text>
                            <NumberFormat value={this.props.item.price} displayType={'text'} thousandSeparator={true}
                                renderText={
                                    value => <Text style={styles.priceTotal}>{value} đ</Text>
                                }
                            />
                        </View>
                    </Right>
                </Footer>
            </View >
        )
    }
}


var styles = StyleSheet.create({
    viewList: {
        flex: 1,
        justifyContent: 'space-between',
        borderColor: '#DADADA',
        borderWidth: 2,
        margin: 2
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footer: {
        backgroundColor: '#FFF',
        height: 30,
        margin: 0.5
    },
    content: {
        flex: 1,
        margin: 5
    },
    content2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF8000'
    },
    productImage: {
        width: 75,
        height: 75,
        borderWidth: 0.5,
    },
    priceproduct: {
        fontSize: 11,
        fontWeight: '200'
    },
    priceTotal: {
        color: '#FF0018',
        fontWeight: 'bold'
    },
    amountproduct: {
        fontSize: 11,
        fontWeight: '200',
        marginLeft: 5
    }
});