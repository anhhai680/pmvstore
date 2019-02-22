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
        this.renderPriceAndCoupon = this.renderPriceAndCoupon.bind(this);
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
            </Card>
        )
    }

    renderPriceAndCoupon = (order) => {
        if (order === null) return null;
        let coupon = order.coupon_lines[0];
        if (coupon === undefined) return null;
        return (
            <Card>
                <CardItem>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Mã giảm giá: </Text>
                            <Text>{coupon.code}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Giảm giá: </Text>
                            <NumberFormat value={coupon.discount} displayType={'text'} thousandSeparator={true}
                                renderText={
                                    value => <Text>-{value} đ</Text>
                                }
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Tổng tạm tính: </Text>
                            <NumberFormat value={(parseFloat(order.total) + parseFloat(order.discount_total))} displayType={'text'} thousandSeparator={true}
                                renderText={
                                    value => <Text>{value} đ</Text>
                                }
                            />
                        </View>
                    </View>
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
                                        <NumberFormat value={item.subtotal / item.quantity} displayType={'text'} thousandSeparator={true}
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
                <CardItem header>
                    <View>
                        <Text>Phương thức thanh toán</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'normal' }}>{order.payment_method_title}</Text>
                    </View>
                </CardItem>
                {
                    order.customer_note != '' ?
                        <CardItem>
                            <Text>Ghi chú: {order.customer_note}</Text>
                        </CardItem>
                    : null
                }
            </Card>
        )
    }

    onSuccessPayment = () => {
        Alert.alert(
            'Thông báo',
            'Cảm ơn quý khách đã đặt hàng. Nhân viên chúng tôi sẽ liên hệ quý khách trong thời gian sớm nhất. Mọi thông tin xin vui lòng liên hệ 19006037',
            [
                { text: 'OK', onPress: () => { this.props.successPayment(); } },
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
                        <Text style={styles.headerText}>Hoàn tất</Text>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.backgroundStepOrder}>
                        <View style={styles.rounded_box}>
                            <View style={styles.view_line_box}>
                                <View style={styles.line_box} />
                            </View>
                            <View style={styles.view_tab}>
                                <Text style={styles.tabactived}>1</Text>
                                <Text style={styles.tabactived}>2</Text>
                                <Text style={styles.tabactived}>3</Text>
                            </View>
                        </View>
                        <View style={styles.view_text}>
                            <Text style={styles.textLeft}>Giỏ hàng</Text>
                            <Text style={styles.textCenter}>Thanh toán</Text>
                            <Text style={styles.textRight}>Hoàn tất</Text>
                        </View>
                    </View>
                    {this.renderOrderInfos(order)}
                    {this.renderOptionalInfos(order)}
                    {this.renderPriceAndCoupon(order)}
                    <Card>
                        <CardItem>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Thành tiền: </Text>
                                <NumberFormat value={order.total} displayType={'text'} thousandSeparator={true}
                                    renderText={
                                        value => <Text style={styles.priceTotal}>{value} đ</Text>
                                    }
                                />
                            </View>
                        </CardItem>
                    </Card>
                    {this.renderProducts(order.line_items)}
                </Content>
                <Footer style={{ backgroundColor: '#3F51B5' }}>
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
    headerText: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFF',
        fontSize: 16
    },
    tabactived: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#F79620',
        textAlign: 'center',
        fontSize: 17,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6,
        color: '#FFF',
    },
    view_line_box: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    line_box: {
        flex: 1,
        backgroundColor: '#F79620',
        height: 10,
        borderRadius: 30,
    },
    view_tab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rounded_box: {
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    view_text: {
        justifyContent: 'space-between',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        flexDirection: 'row',
    },
    textCenter: {
        fontSize: 15,
    },
    textLeft: {
        fontSize: 15,
        marginLeft: -10,
    },
    textRight: {
        fontSize: 15,
        marginRight: -10,
    },
    backgroundStepOrder: {
        backgroundColor: '#FBFBFB',
    },
    priceTotal: {
        color: '#FD842B',
    },
    button: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#F79620',
    },
    textButton: {
        color: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10
    }
});

