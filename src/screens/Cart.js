import React, { Component } from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity, ListView, Alert } from 'react-native';
import { Container, Header, Content, Left, Right, Body, Card, CardItem, Text, Icon, Title, Footer, Button, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Ionicons from "react-native-vector-icons/Ionicons";

import { updateCartItem, deleteCartItem, getCouponCodes, checkCouponCode, fetchingCartItem } from '../redux/actions/cartAction';
import * as CartComponent from "../components/cart";
import CouponCode from "../components/cart/couponCode";


class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coupon: null
        };
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.updateQuantityCartItem = this.updateQuantityCartItem.bind(this);
        this.onCouponChangeText = this.onCouponChangeText.bind(this);
        this.deleteProductInCart = this.deleteProductInCart.bind(this);
        this.updateQuantityCartItem = this.updateQuantityCartItem.bind(this);
    }

    componentWillMount() {
        this.getCartItems();
        const { cartItems, couponCodes } = this.props;
        if (cartItems.length > 0 && couponCodes.length <= 0) {
            this.props.getCouponCodes();
        }
    }

    componentDidMount() {
        const { cartItems } = this.props;
        if (cartItems.length <= 0) {
            setTimeout(() => this.props.navigation.goBack(null), 1000);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('prevProps', prevProps);
        // if (this.props.handleCouponError !== null) {
        //     Alert.alert(
        //         'Thông báo',
        //         this.props.handleCouponError.message !== null ?
        //             this.props.handleCouponError.message : this.props.handleCouponError.code
        //     );
        // } else if (this.props.coupon !== null) {
        //     Alert.alert('Thông báo', 'Mã giảm giá đã được áp dụng thành công!');
        // }
    }

    getCartItems = async () => {
        //Fetching cart item in local Storage
        await this.props.fetchingCartItem();
    }

    updateQuantityCartItem(id, quantity) {
        if (quantity == undefined || quantity == null) {
            Alert.alert('Thông báo', 'Giá trị truyền vào không hợp lệ!');
        }
        const { cartItems } = this.props;
        const index = cartItems.findIndex(p => p.product_id === id);
        if (index > -1) {
            cartItems[index].quantity = quantity;
            let productItem = cartItems[index];
            this.props.updateCartItem(productItem);
        }
        else {
            Alert.alert('Thông báo', 'Không tìm thấy thông tin sản phẩm!');
        }
    }

    deleteProductInCart(id) {
        //rowMap[`${secId}${rowId}`].props.closeRow();
        // const newData = [...this.state.listViewData];
        // newData.splice(rowId, 1);
        // this.setState({ listViewData: newData });
        const product = this.props.cartItems.find(p => p.product_id === id);
        if (product == undefined) {
            console.log("Undefined product with id: " + id);
            Alert.alert('Thông báo', 'Không thể xoá sản phẩm ra khỏi giỏ hàng!');
        } else {
            Alert.alert(
                'Thông báo',
                'Bạn có thực sự muốn xoá sản phẩm này khỏi giỏ hàng ?',
                [
                    { text: 'HUỶ', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
                    { text: 'ĐỒNG Ý', onPress: () => this.props.deleteCartItem(product) }
                ]
            );
        }
    }

    onCouponChangeText = async (coupon) => {
        if (coupon !== undefined) {
            await this.props.checkCouponCode(coupon);
            if (this.props.handleCouponError !== null) {
                Alert.alert(
                    'Thông báo',
                    this.props.handleCouponError.message !== null ?
                        this.props.handleCouponError.message : this.props.handleCouponError.code
                );
            } else if (this.props.coupon !== null) {
                Alert.alert('Thông báo', 'Mã giảm giá đã được áp dụng thành công!');
            }
        } else {
            Alert.alert('Thông báo', 'Vui lòng nhập mã giảm giá của bạn!');
            return false;
        }
    }

    render() {
        const { cartItems } = this.props;
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        if (cartItems.length <= 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.notification}>Không có sản phẩm trong giỏ hàng!</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack(null)}
                            style={{
                                backgroundColor: '#008000',
                                borderRadius: 6,
                                borderColor: '#FFF',
                                width: '100%',
                                height: 30,
                                padding: 10,
                                justifyContent: 'center'
                            }}>
                            <Text style={{ textAlign: 'center', color: '#FFF' }}>Quay về màn hình chính</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                            <Ionicons name='ios-close' size={38} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={styles.headerText}>Giỏ hàng</Text>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.rounded_box}>
                            <Text style={styles.tabactived}>1</Text>
                        </View>
                        <View style={styles.rounded_box}>
                            <Text style={styles.tabinactived}>2</Text>
                        </View>
                        <View style={styles.rounded_box}>
                            <Text style={styles.tabinactived}>3</Text>
                        </View>
                    </View>
                    <List
                        dataSource={this.ds.cloneWithRows(cartItems)}
                        renderRow={item =>
                            <ListItem>
                                <Left>
                                    <Image
                                        source={{
                                            uri: item.image
                                        }}
                                        style={styles.productImage}
                                        resizeMode='contain'
                                    />
                                </Left>
                                <Body>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}
                                        renderText={
                                            value => <Text style={styles.price}>{value} đ</Text>
                                        }
                                    />
                                </Body>
                                <Right>
                                    <View style={{ flex: 1, width: 50, justifyContent: 'center' }}>
                                        <CartComponent.quantityItems pId={item.product_id} selectedValue={item.quantity} onValueChange={this.updateQuantityCartItem} />
                                    </View>
                                    <View style={{ position: 'absolute', top: -15, right: 2 }}>
                                        <TouchableOpacity onPress={() => this.deleteProductInCart(item.product_id)}>
                                            <Ionicons name="ios-close" size={30} />
                                        </TouchableOpacity>
                                    </View>
                                </Right>
                            </ListItem>
                        }
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={() => this.deleteProductInCart(data.product_id)}>
                                <Icon active name="trash" />
                            </Button>
                        }
                        rightOpenValue={-75}
                    />
                    {
                        this.props.couponCodes.length > 0 ?
                            <Card>
                                <CardItem>
                                    <Body>
                                        <CouponCode onCouponChangeText={this.onCouponChangeText} />
                                    </Body>
                                </CardItem>
                            </Card>
                            :
                            null
                    }
                </Content>
                <Footer style={{ backgroundColor: '#FF8000' }}>
                    <Left style={{ marginLeft: 10 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>SL: {this.props.total}</Text>
                        <NumberFormat value={(this.props.totalPrice)} displayType={'text'} thousandSeparator={true}
                            renderText={
                                value => <Text style={{ color: 'white', fontWeight: 'bold' }}>TT: {value} đ</Text>
                            }
                        />
                    </Left>
                    <Right style={{ marginRight: 5 }}>
                        <Button full success onPress={() => this.props.navigation.navigate('Checkout')}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Thanh toán</Text>
                            <Icon name="ios-arrow-forward" style={{ color: '#E4D218' }} />
                        </Button>
                    </Right>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.cart.isFetching,
    cartItems: state.cart.cartItems,
    total: state.cart.total,
    totalPrice: state.cart.totalPrice,
    couponCodes: state.cart.couponCodes,
    handleCouponError: state.cart.handleCouponError,
    coupon: state.cart.coupon
});

const mapActionsToProps = {
    updateCartItem,
    deleteCartItem,
    getCouponCodes,
    checkCouponCode,
    fetchingCartItem
};

export default connect(mapStateToProps, mapActionsToProps)(Cart);


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFF',
        fontSize: 16
    },
    productName: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF8000',
    },
    productImage: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        width: 75,
        height: 75,
        marginLeft: 5
    },
    quantity: {
        borderWidth: 1,
        borderColor: '#cdcdcd',
        backgroundColor: '#EAF2F4',
        textAlign: 'center',
        borderRadius: 5,
        height: 50,
        paddingLeft: 10,
        paddingRight: 10
    },
    quantityButton: {
        backgroundColor: '#000',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14
    },
    price: {
        color: '#018206'
    },
    notification: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    tabactived: {
        width: 35,
        height: 35,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: '#FF891E',
        borderColor: '#008000',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6,
        fontWeight: 'bold'
    },
    tabinactived: {
        width: 35,
        height: 35,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: 'gray',
        borderColor: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6
    },
    rounded_box: {
        margin: 20
    }
});