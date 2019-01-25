import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator, Dimensions, Modal, BackHandler, KeyboardAvoidingView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Body, Content, Left, Right, Text, Button, Card, CardItem, Tabs, Tab, TabHeading } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation'

import { WooAPI } from '../services/WooAPI';
import * as productCom from '../components/product/';
import * as cart from '../components/cart';

import { addCartItem } from '../redux/actions/cartAction';
import { getProductAttributeTerms, getProductVariations } from '../redux/actions/productAction';
import { navigateToOrder } from '../redux/actions/navAction';

class Product extends Component {

    static navigationOptions = ({ navigation }) => {
        const { product } = navigation.state.params;
        return {
            headerRight: (
                <productCom.HeaderRightButtons data={product} />
            )
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            product: null,
            attributes: [],
            variations: [],
            quantity: '1',
            temSelected: 'Black',
            inkSelected: 'Black',
            variation_id: 0,
            codeSelected: 'GT1221 - 3,700 tem/hộp',
            printerSelected: 'Không biết lõi',
            modalVisible: false,
            meta_data: []
        };
        this.getProduct = this.getProduct.bind(this);
        this.getProductVariations = this.getProductVariations.bind(this);
        this.renderProductVariations = this.renderProductVariations.bind(this);
        this.temColorChanged = this.temColorChanged.bind(this);
        this.inkColorChanged = this.inkColorChanged.bind(this)
        this.printerSelectChanged = this.printerSelectChanged.bind(this);
        this.productCodeSelectedChanged = this.productCodeSelectedChanged.bind(this);
        this.quantityValueChange = this.quantityValueChange.bind(this);
        this.addProductToCartItem = this.addProductToCartItem.bind(this);
        //this.navToCart = this.navToCart.bind(this);
        this.setProductAttributes = this.setProductAttributes.bind(this);
        this.setDefaultAttributes = this.setDefaultAttributes.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.navigation.state.params;
        if (id !== undefined) {
            this.props.getProductVariations(id);
        }
    }

    componentDidMount() {
        this.getProduct();
        this.getProductVariations();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cartItems != this.props.cartItems) {
            this.setState({ modalVisible: true });
        }
    }

    componentWillUnmount() {
        this.state = {
            modalVisible: false
        };
    }

    componentDidCatch(error, info) {
        //Handing error of React Native here
        console.log("componentDidCatch called " + error + ", " + info);
    }

    getProduct = () => {
        const { id } = this.props.navigation.state.params;
        const product = Object.assign({}, this.props.products.find(x => x.id === id));
        this.setState({ product });
    }

    getProductVariations = () => {
        const { id } = this.props.navigation.state.params;
        const product = this.props.products.find(x => x.id === id);
        if (product.attributes != undefined) {
            const attributes = product.attributes.filter(a => a.variation == false);
            const variations = product.attributes.filter(a => a.variation == true);
            if (variations.length > 0 && product.default_attributes.length > 0) {
                const defaultAttributes = product.default_attributes;
                this.setState({ variation_id: product.variations[0] })
                this.setDefaultAttributes(defaultAttributes);
            }
            this.setState({ attributes, variations });
        }
    }

    renderProductVariations = () => {
        return (
            <Card>
                {
                    this.state.variations.map((item, index) => {
                        switch (item.id) {
                            case 1://Ink color
                                return (
                                    <CardItem key={index}>
                                        <Text>{item.name}</Text>
                                        {item.options.map((color, key) => {
                                            //let color_item = color.toLowerCase();
                                            return (
                                                <View key={key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <productCom.InkColor
                                                        color={color}
                                                        selected={color == this.state.inkSelected}
                                                        handleColorSelected={this.inkColorChanged}
                                                    />
                                                </View>
                                            )
                                        })}
                                    </CardItem>
                                )
                            case 2://Product code
                                return (
                                    <CardItem key={index}>
                                        <Text>{item.name}</Text>
                                        <productCom.ProductCode
                                            codes={item.options}
                                            handlerValueChange={this.productCodeSelectedChanged}
                                            codeSelected={this.state.codeSelected}
                                        />
                                    </CardItem>
                                )
                            case 3://Printer list
                                return (
                                    <CardItem key={index}>
                                        <Text>{item.name}</Text>
                                        <productCom.PrinterList
                                            printers={item.options}
                                            handlerValueChange={this.printerSelectChanged}
                                            selectedPrinter={this.state.printerSelected}
                                        />
                                    </CardItem>
                                )
                            case 11://Tem color
                                return (
                                    <CardItem key={index}>
                                        <Text>{item.name}</Text>
                                        {item.options.map((color, key) => {
                                            return (
                                                <View key={key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <productCom.TemColor
                                                        color={color}
                                                        selected={color == this.state.temSelected}
                                                        handleColorSelected={this.temColorChanged}
                                                    />
                                                </View>
                                            )
                                        })}
                                    </CardItem>
                                )
                            default:
                                return;
                        }
                    })
                }
            </Card>
        )
    }

    temColorChanged = (color) => {
        const key = 'pa_mau-tem';
        this.setState({ temSelected: color });
        this.setProductAttributes(key, color);
    }

    inkColorChanged = (color) => {
        const { productVariations } = this.props;
        if (productVariations !== null && productVariations !== undefined){
            if (productVariations.length > 0){
                productVariations.map((item, index) => {
                    item.attributes.map((attr) => {
                        if (attr.option === color) {
                            let newProduct = this.state.product;
                            newProduct.price = item.price;
                            this.setState({ product: newProduct });
                            this.setState({ variation_id: item.id })
                            return;
                        }
                    });
                });
                const key = 'pa_mau-muc';
                this.setState({ inkSelected: color });
                this.setProductAttributes(key, color);
            }
        }
    }

    productCodeSelectedChanged = (codeSelected) => {
        const key = 'pa_ma-san-pham';
        this.setState({ codeSelected: codeSelected });
        this.setProductAttributes(key, codeSelected);
    }

    printerSelectChanged = (printer) => {
        const key = 'pa_may-in';
        this.setState({ printerSelected: printer });
        this.setProductAttributes(key, printer);
    }

    quantityValueChange = (value) => {
        if (Number(value) > 0)
            this.setState({ quantity: value });
    }

    addProductToCartItem = (product) => {
        const data = {
            product_id: product.id,
            variation_id: this.state.variation_id,
            name: product.name,
            image: product.images[0].src,
            quantity: this.state.quantity,
            price: product.price,
            meta_data: this.state.meta_data
        };
        this.props.addCartItem(data);
    }

    setProductAttributes = (key, value) => {
        const attr = {
            "key": key,
            "value": value
        };

        const currAttributes = this.state.meta_data;
        if (currAttributes.length <= 0)
            currAttributes.push(attr);
        else //Exist 
        {
            const index = currAttributes.findIndex(a => a.key === attr.key);
            if (index !== -1) {
                currAttributes[index] = attr;
            } else {
                currAttributes.push(attr);
            }
        }
        this.setState({
            meta_data: currAttributes
        });
    }

    setDefaultAttributes = (attributes) => {
        let attr;
        const defaultValues = [];
        attributes.map((item, index) => {
            switch (item.id) {
                case 1: //Màu mực
                    attr = {
                        "key": 'pa_mau-muc',
                        "value": item.option
                    };
                    defaultValues.push(attr);
                    break;
                case 2: //Mã sản phẩm
                    attr = {
                        "key": 'pa_ma-san-pham',
                        "value": item.option
                    };
                    defaultValues.push(attr);
                    break;
                case 3: //Máy in
                    attr = {
                        "key": 'pa_may-in',
                        "value": item.option
                    };
                    defaultValues.push(attr);
                    break;
                case 11: //Màu tem
                    attr = {
                        "key": 'pa_mau-tem',
                        "value": item.option
                    };
                    defaultValues.push(attr);
                    break;
            }
        });
        this.setState({ meta_data: defaultValues });
    }

    navToOrder = () => {
        Alert.alert(
            'Thông báo',
            'Bạn muốn chuyển đến giỏ hàng ?',
            [
                { text: 'Đồng ý', onPress: () => this.props.navigateToOrder() },
                { text: 'Tiếp tục mua hàng', onPress: () => this.setState({ modalVisible: false }), style: 'cancel' }
            ]
        )
    }

    render() {
        if (this.state.product == null) {
            return (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator style={{ alignItems: 'center' }} />
                </View>
            );
        }
        return (
            <Container style={styles.container} >
                <Content style={{ marginBottom: 50 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Modal
                            animationType='slide'
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                this.setState({ modalVisible: false });
                            }}>
                            <View style={{ width: '100%', height: 200, padding: 10, marginTop: 100 }}>
                                <View style={{ backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ padding: 10, color: '#FFF' }}>Sản phẩm đã được thêm vào giỏ hàng thành công!</Text>
                                    <TouchableOpacity onPress={() => this.navToOrder()}>
                                        <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 20, alignSelf: 'center', margin: 10 }}>OK!</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text style={styles.product_title}>{this.state.product.name}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <productCom.ProductSwiper images={this.state.product.images} />
                        </CardItem>
                    </Card>
                    <productCom.ProductPrice product={this.state.product} />
                    {this.renderProductVariations()}
                    <Card>
                        <CardItem>
                            <Body>
                                <productCom.QuanityItem quantityValueChange={this.quantityValueChange} />
                            </Body>
                        </CardItem>
                    </Card>
                    <Tabs>
                        <Tab heading={<TabHeading><Icon name="info-circle" size={20} /><Text>Thông tin sản phẩm</Text></TabHeading>}>
                            <productCom.ProductContent content={this.state.product.description} />
                        </Tab>
                        <Tab heading="Đặc tính">
                            <productCom.ProductAttributes attributes={this.state.attributes} />
                        </Tab>
                    </Tabs>
                </Content>
                <cart.addCart product={this.state.product} addProductToCartItem={this.addProductToCartItem} />
                {/* <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100}>
                    <View>
                        <cart.quantityProduct value={this.state.quantity} quantityValueChange={this.quantityValueChange} />
                    </View>
                </KeyboardAvoidingView> */}
            </ Container>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.home.products,
    cartItems: state.cart.cartItems,
    attributeTerms: state.attribute.attributeTerms,
    requestAttrError: state.attribute.requestAttrError,
    productVariations: state.product.productVariations
});

const mapActionsToProps = {
    addCartItem,
    getProductAttributeTerms,
    navigateToOrder,
    getProductVariations
}


export default connect(mapStateToProps, mapActionsToProps)(Product);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    product_title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF8000',
    },
});