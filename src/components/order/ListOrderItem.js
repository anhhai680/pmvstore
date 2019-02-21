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
                            <Text>{item.name}</Text>
                            <View style={styles.content}>
                                <NumberFormat value={item.subtotal / item.quantity} displayType={'text'} thousandSeparator={true}
                                    renderText={
                                        value =>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.priceproduct}>{value} đ</Text>
                                                <Text> x {item.quantity}</Text>
                                            </View>
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
        flexDirection: 'row' ,
        justifyContent: 'space-between',
    },
    productImage: {
        width: 90,
        height: 90,
        resizeMode: 'contain'
    },
    priceproduct: {
        color: '#FD842B'
    },
})