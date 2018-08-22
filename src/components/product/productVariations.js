import React, { Component } from "react";
import { View } from "react-native";
import { Card, CardItem, Text } from 'native-base';
import productColor from './productColor';
import printerList from './printerList';
import productCode from './productCode';


export default class productVariations extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { variations } = this.props;
        return (
            <Card>
                {
                    variations.map((item, index) => {
                        if (item.id == 1 || item.id == 11) {
                            return (
                                <CardItem key={index}>
                                    <Text>{item.name}</Text>
                                    {item.options.map((color, key) => {
                                        let color_item = color.toLowerCase();
                                        return (
                                            <View key={key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <productColor color={color_item} />
                                            </View>
                                        )
                                    })}
                                </CardItem>
                            )
                        }
                        else if (item.id == 3) {
                            return (
                                <CardItem key={index}>
                                    <Text>{item.name}</Text>
                                    <printerList printers={item.options} />
                                </CardItem>
                            )
                        } else if (item.id == 2) {
                            return (
                                <CardItem key={index}>
                                    <Text>{item.name}</Text>
                                    <productCode codes={item.options} />
                                </CardItem>
                            )
                        }
                    })
                }
            </Card>
        )
    }
}