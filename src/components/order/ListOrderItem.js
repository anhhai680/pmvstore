import React, { Component } from 'react';
import { Styleheet, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Body, Header, Right, Left, Footer, Button, Text, Content, Card, CardItem } from "native-base";
import NumberFormat from 'react-number-format';
import { Constants } from '../../common/Index';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class ListOrderItem extends Component {
    render() {
        const { item, style, STT } = this.props;
        return (
            <Card>
                <CardItem>
                    <View style={{ marginBottom: -10, flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='ios-cube' size={15} />
                        <Text> Món hàng {STT + 1}: </Text>
                    </View>
                </CardItem>
                <CardItem>
                    <View style={style.content}>
                        {/* <Image source={{ uri: item.Image }}
                                style={style.productImage}
                                resizeMode='contain' /> */}
                        <Text style={style.productName}>{item.name}</Text>
                        <View style={style.content2}>
                            <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}
                                renderText={
                                    value => <Text style={style.priceproduct}>Giá: {value} đ</Text>
                                }
                            />
                            <NumberFormat value={item.total} displayType={'text'} thousandSeparator={true}
                                renderText={
                                    value => <Text style={style.priceTotalproduct}>TT: {value} đ</Text>
                                }
                            />
                        </View>
                        <Text style={style.amountproduct}>SL: {item.quantity}</Text>
                    </View>
                </CardItem>
            </Card>
        )
    }
}