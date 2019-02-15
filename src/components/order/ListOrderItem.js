import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { connect } from "react-redux";
import { Text, Card, CardItem } from "native-base";
import NumberFormat from 'react-number-format';
import ColorView from '../ColorView';

class ListOrderItem extends Component {

    render() {
        const { item, products, isDetail } = this.props;
        var imagesrc = products.filter(p => p.id === item.product_id);
        return (
            <Card>
                <CardItem>
                    <View style={styles.content}>
                        {
                            isDetail ?
                                <Image source={{ uri: imagesrc[0].images[0].src }}
                                    style={styles.productImage} /> : null
                        }
                        <View style={styles.content2}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.amountproduct}>SL: {item.quantity}</Text>
                            <View style={styles.content}>
                                <NumberFormat value={item.subtotal / item.quantity} displayType={'text'} thousandSeparator={true}
                                    renderText={
                                        value => <Text style={styles.priceproduct}>Giá: {value} đ</Text>
                                    }
                                />
                                <NumberFormat value={item.subtotal} displayType={'text'} thousandSeparator={true}
                                    renderText={
                                        value => <Text style={styles.priceTotalproduct}>TT: {value} đ</Text>
                                    }
                                />
                            </View>
                            {
                                isDetail ?
                                    item.meta_data.length > 0 ?
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>Màu mực:</Text>
                                            <ColorView color={item.meta_data.filter(i => i.key === 'pa_mau-muc')[0].value} />
                                        </View>
                                        : null
                                    : null
                            }
                        </View>
                    </View>
                </CardItem>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.home.products,
});

const mapActionsToProps = {
}

export default connect(mapStateToProps, mapActionsToProps)(ListOrderItem);

const styles = StyleSheet.create({
    content2: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 5
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ff8000'
    },
    productImage: {
        width: 90,
        height: 90,
        resizeMode: 'contain'
    },
    amountproduct: {
        fontSize: 11,
        fontWeight: '200',
        marginVertical: 5
    },
    priceproduct: {
        fontSize: 11,
        fontWeight: '200'
    },
    priceTotalproduct: {
        fontWeight: '400'
    },
})