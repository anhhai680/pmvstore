import React, { Component } from "react";
import { StyleSheet, View, FlatList, BackHandler, Platform, TouchableOpacity, Alert } from "react-native";
import { Container, Header, Body, Content, Text, Card, CardItem, Footer } from "native-base";
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome";
import NumberFormat from 'react-number-format';
import { Constants } from '../common/Index';
import ColorView from '../components/ColorView';
import { successPayment, fetchProductVariations } from '../redux/actions/orderAction'


class FinishOrder extends Component {

    constructor(props) {
        super(props);
        this.renderProductAttributes = this.renderProductAttributes.bind(this);
        this.renderCouponLines = this.renderCouponLines.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
        this.renderOrderInfos = this.renderOrderInfos.bind(this);
        this.renderOptionalInfos = this.renderOptionalInfos.bind(this);
        this.onSuccessPayment = this.onSuccessPayment.bind(this);
    }

    componentWillMount() {
        if (Platform.OS == 'android') {
            BackHandler.addEventListener('hardwareBackPressToHome', this.backPress);
        }
    }

    componentWillUnmount() {
        if (Platform.OS == 'android') {
            BackHandler.removeEventListener('hardwareBackPressToHome', this.backPress);
        }
    }

    backPress = () => {
        // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
        // Typically you would use the navigator here to go to the last state.
        if (this.props.navigation.state.routeName === 'FinishOrder') {
            this.onSuccessPayment();
        }
        return true;
    }

    renderOrderInfos = (order) => {
        return (
            <Card>
                <CardItem header>
                    <Text>Thông tin đơn hàng (#{order.id})</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>{order.billing.last_name}</Text>
                        <Text>Địa chỉ: {order.billing.address_1}</Text>
                        <Text>Điện thoại: {order.billing.phone}</Text>
                        <Text>Email: {order.billing.email}</Text>
                        <Text>Thành phố:
                        {
                                Object.keys(Constants.arrCities).map(key => {
                                    if (key === order.billing.city) {
                                        return Constants.arrCities[key]
                                    }
                                })
                            }</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <NumberFormat value={order.total} displayType={'text'} thousandSeparator={true}
                            renderText={
                                value => <Text style={styles.price}>Tổng cộng: {value}đ</Text>
                            }
                        />
                    </Body>
                </CardItem>
            </Card>
        )
    }

    renderCouponLines = () => {
        if (this.props.coupon === null) return null;
        const { coupon } = this.props;
        let discount = coupon.discount_type === 'percent' ? `${Number(coupon.amount)}%` : Number(coupon.amount).toLocaleString(
            'vi-VN', {
                style: 'currency', currency: 'VND', currencyDisplay: 'đ'
            }
        );
        return (
            <Card>
                <CardItem>
                    <Body>
                        <Text>Mã giảm giá: {coupon.code}</Text>
                        <Text>Chiết khấu: {discount}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }

    renderProducts = (products) => {
        if (products.length <= 0) return null;
        return (
            <Card>
                <CardItem header>
                    <Text>Sản phẩm</Text>
                </CardItem>
                <CardItem>
                    <FlatList
                        data={products}
                        extraData={products}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) =>
                            <View>
                                <Text style={styles.productName}>{item.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '50%' }}>
                                        <NumberFormat value={item.total} displayType={'text'} thousandSeparator={true}
                                            renderText={
                                                value => <Text>Giá: {value}đ</Text>
                                            }
                                        />
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ textAlign: 'right' }}>SL: {item.quantity}</Text>
                                    </View>
                                </View>
                                {
                                    item.meta_data.length > 0 ?
                                        this.renderProductAttributes(item.meta_data) : null
                                }
                            </View>
                        }
                    />
                </CardItem>
            </Card>
        )
    }

    renderProductAttributes = (meta_data) => {
        return (
            <FlatList
                data={meta_data}
                extraData={meta_data}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => {
                    let attrName;
                    let option = false;
                    switch (item.key) {
                        case 'pa_mau-tem':
                            attrName = 'Màu tem';
                            break;
                        case 'pa_mau-muc':
                            attrName = 'Màu mực';
                            break;
                        case 'pa_may-in':
                            attrName = 'Máy in';
                            option = true;
                            break;
                        case 'pa_ma-san-pham':
                            attrName = 'Mã SP';
                            option = true;
                            break;
                    }
                    return (
                        <View key={index} style={{ flexDirection: 'row' }}>
                            <View style={{ width: '30%' }}>
                                <Text>{attrName}:</Text>
                            </View>
                            <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                {
                                    option ?
                                        <Text style={{ textAlign: 'left' }}>{item.value}</Text>
                                        :
                                        <ColorView color={item.value} />
                                }
                            </View>
                        </View>
                    )
                }}
            />
        )
    }

    renderOptionalInfos = (order) => {
        return (
            <Card>
                <CardItem>
                    <Body>
                        <Text>Phương thức thanh toán: {order.payment_method_title}</Text>
                        <Text>Ghi chú: {order.customer_note}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }

    onSuccessPayment = () => {
        Alert.alert(
            'Thông báo',
            'Cảm ơn quý khách đã đặt hàng. Nhân viên chúng tôi sẽ liên hệ quý khách trong thời gian sớm nhất. Mọi thông tin xin vui lòng liên hệ 19006037',
            [
                { text: 'OK', onPress: () => this.props.successPayment() },
                { text: 'CANCEL', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ],
            { cancelable: false }
        );
    }


    render() {
        const { order } = this.props;
        return (
            <Container>
                <Header>
                    <Body>
                        <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Hoàn tất</Text>
                    </Body>
                </Header>
                <Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.rounded_box}>
                            <Text style={styles.tabinactived}>1</Text>
                        </View>
                        <View style={styles.rounded_box}>
                            <Text style={styles.tabinactived}>2</Text>
                        </View>
                        <View style={styles.rounded_box}>
                            <Text style={styles.tabactived}>3</Text>
                        </View>
                    </View>
                    {this.renderOrderInfos(order)}
                    {this.renderCouponLines()}
                    {this.renderProducts(order.line_items)}
                    {this.renderOptionalInfos(order)}
                </Content>
                <Footer style={{ backgroundColor: '#FFF' }}>
                    <TouchableOpacity onPress={() => this.onSuccessPayment()} style={styles.button}>
                        <Text style={styles.textButton}>Quay về màn hình chính</Text>
                    </TouchableOpacity>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    order: state.order.resData,
    nav: state.nav,
    productVariations: state.order.productVariations,
    isFetchingVariation: state.order.isFetchingVariation,
    coupon: state.cart.coupon
});

const mapActionsToProps = {
    successPayment,
    fetchProductVariations
}

export default connect(mapStateToProps, mapActionsToProps)(FinishOrder);

const styles = StyleSheet.create({
    productName: {
        color: '#DD670C'
    },
    iconStyle: {
        fontSize: 18,
        color: 'green',
        marginRight: 5
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
    },
    price: {
        fontWeight: 'bold',
        color: '#008000'
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: 36,
        backgroundColor: '#008000',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        width: '90%'
    },
    textButton: {
        color: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10
    }
});

