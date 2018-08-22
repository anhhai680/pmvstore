import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import NumberFormat from 'react-number-format';


export default class ProductPrice extends Component{
    render(){
        return(
            <Card>
                <CardItem>
                    <Body>
                        <NumberFormat value={this.props.product.price} displayType={'text'} thousandSeparator={true}
                            renderText={
                                    value => <Text style={styles.price}>{value}đ</Text>
                                }
                        />
                        {
                            this.props.product.regular_price ?
                            <NumberFormat value={this.props.product.regular_price} displayType={'text'} thousandSeparator={true}
                            renderText={
                                    value => <Text style={styles.regular_price}>{value}đ</Text>
                                } 
                            /> :
                            <Text />
                        }
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

var styles = StyleSheet.create({
    regular_price:{
        alignItems: 'center',
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        textDecorationLine:'line-through',
    },
    price:{
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 16,
        color:'#FF8000',
        fontWeight:'bold'
    }
});