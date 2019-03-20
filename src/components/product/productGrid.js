import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Dimensions, FlatList, TouchableOpacity } from "react-native";
import NumberFormat from "react-number-format";

import ListItem from './ListItem';

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
export default class productGrid extends Component {

    onPressItem = (product) => {
        const { navigate } = this.props.navigation;
        navigate('Product', { product, id: product.id });
    }

    renderItem = ({ item, index }) => {
        if (item === undefined) return;
        let saleOffPercent;
        if (item.regular_price) {
            let totalPrice = Number(item.regular_price) - Number(item.price);
            saleOffPercent = totalPrice / 100000;
        }
        return (
            <View key={`fe-${index}`} style={styles.item}>
                <TouchableOpacity onPress={() => this.onPressItem(item)}>
                    <Image source={{ uri: item.images[0].src }} style={styles.itemImage} resizeMode="contain" />
                    <View style={{ maxWidth: 150 }}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <View style={item.regular_price ? null : { alignItems: 'center' }}>
                            <NumberFormat
                                value={item.price} displayType={'text'} thousandSeparator={true}
                                renderText={
                                    value => <Text style={styles.itemPrice}>{value}đ</Text>
                                }
                            />
                        </View>
                        {
                            item.regular_price ?
                                <View style={{ flexDirection: 'row' }}>
                                    <NumberFormat value={item.regular_price} displayType={'text'} thousandSeparator={true}
                                        renderText={
                                            value => <Text style={styles.itemSaleOffPrice}>{value}đ</Text>
                                        } />
                                    <View style={styles.badgePrice}>
                                        <Text style={styles.badgeText}>{saleOffPercent}%</Text>
                                    </View>
                                </View>
                                : null
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { products } = this.props;
        return (
            <FlatList
                initialNumToRender={numColumns}
                horizontal={true}
                data={products}
                extraData={products}
                keyExtractor={(item, index) => index}
                renderItem={this.renderItem}
                style={styles.container}
            />
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 5
    },
    item: {
        flex: 1,
        margin: 5,
        //width: (screenWidth - (10 * numColumns)) / numColumns,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemImage: {
        //width: 150,
        height: 100,
        alignItems: "center",
        resizeMode: "contain"
    },
    itemText: {
        color: '#000',
        fontSize: 12,
        textAlign: 'center',
        flexWrap: 'wrap'
    },
    itemPrice: {
        color: '#DD670C',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 12,
        marginLeft: 4
    },
    itemSaleOffPrice: {
        color: '#666',
        textAlign: 'left',
        textDecorationLine: 'line-through',
        fontSize: 12,
        marginLeft: 4
    },
    badgePrice: {
        position: 'absolute',
        top: -10,
        right: 25,
        width: 50,
        height: 20,
        //borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF0000'
    },
    badgeText: {
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
});