import React, { PureComponent } from 'react';
import { StyleSheet ,Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Body, Content, Grid, Col, Row, Card, CardItem, Text } from 'native-base';
import { WooAPI } from '../index';
import NumberFormat from 'react-number-format';


const _width = Dimensions.get("window").width;
export default class RelatedProducts extends PureComponent{

    _onPressItem = (product) => {
        const { navigate } = this.props.navigation;
        navigate('Product',{product});
    };

    render(){
        return(
            <Grid>
                {this.props.products.map((item,index) => {
                    if (index % 2 == 0) {
                        return (
                            <Row key={index}>
                                <Col>
                                    <TouchableOpacity onPress={this._onPressItem(item)}>
                                        <Card key={item.id} style={styles.product}>
                                            <CardItem cardBody>
                                                <Image source={{ uri: item.images[0].src }} style={styles.imgproduct} />
                                            </CardItem>
                                            <CardItem>
                                                <Text style={styles.product_item}>{item.name}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}
                                                    renderText={
                                                        value => <Text>{value}đ</Text>
                                                    } />
                                            </CardItem>
                                        </Card>
                                    </TouchableOpacity>
                                </Col>
                                {/* <Col>
                                    <TouchableOpacity onPress={this._onPressItem(item + 1)}>
                                        <Card key={item.id} style={styles.product}>
                                            <CardItem cardBody>
                                                <Image source={{ uri: item.images[0].src }} style={styles.imgproduct} />
                                            </CardItem>
                                            <CardItem>
                                                <Text style={styles.product_item}>{item.name}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}
                                                    renderText={
                                                        value => <Text>{value}đ</Text>
                                                    } />
                                            </CardItem>
                                        </Card>
                                    </TouchableOpacity>
                                </Col> */}
                            </Row>
                        );   
                    }
                })}
            </Grid>
        );
    }
}

const styles = StyleSheet.create({
    product: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    product_item: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#666',
        fontWeight: 'bold'
    },
    imgproduct: {
        flex: 1,
        //width: Dimensions.get('window').width,
        height: _width / 2,
        alignItems: 'center',
        //resizeMode:'cover',
        //padding:10
    },
    price: {
        alignItems: 'center',
        textAlign: 'center',
        color: '#FF8000',
        fontSize: 20,
    }
});