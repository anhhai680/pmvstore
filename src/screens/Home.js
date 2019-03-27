import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Linking, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Text, Card, CardItem } from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";
import BannerSlider from './Banner';
import { ProductList, ProductGrid, FindProductButton } from '../components/product';
import { getProducts, productsRefreshing } from '../redux/actions/homeAction';
import { fetchingCartItem } from '../redux/actions/cartAction';
import PopUpHotLine from '../components/popUpHotLine';

class Home extends Component {

    constructor(props) {
        super(props);
        this.renderFeatureProducts = this.renderFeatureProducts.bind(this);
        this.renderProductList = this.renderProductList.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.renderBestSellProducts = this.renderBestSellProducts.bind(this);
    }

    componentWillMount() {
        this.getAllProducts(30, 1);
    }

    componentDidMount() {
        this.renderFeatureProducts();
        this.renderProductList();
        this.renderBestSellProducts();
        this.getCartItems();
    }

    getCartItems = async () => {
        //Fetching cart item in local Storage
        await this.props.fetchingCartItem();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.PRODUCTS_REQUEST_ERROR !== this.props.PRODUCTS_REQUEST_ERROR) {
            console.log('Request error => ' + this.props.PRODUCTS_REQUEST_ERROR);
        }
    }

    getAllProducts = (pageSize, pageIndex) => {
        this.props.getProducts({ pageSize, pageIndex });
    }

    renderFeatureProducts = () => {
        const { products } = this.props;
        if (products !== null) {
            let featureProducts = products.filter(item => item.featured === true);
            if (featureProducts === null) return null;
            return (
                <Card>
                    <CardItem header>
                        <Text>Sản phẩm HOT</Text>
                    </CardItem>
                    <CardItem cardBody>
                        <ProductGrid products={featureProducts} navigation={this.props.navigation} />
                    </CardItem>
                </Card>
            );
        }
    }

    renderBestSellProducts = () => {
        const { products } = this.props;
        if (products !== null) {
            let bestSellProducts = products.filter(item => item.total_sales > 0);
            if (bestSellProducts === null) return null;
            return (
                <Card>
                    <CardItem header>
                        <Text>Sản phẩm BÁN CHẠY</Text>
                    </CardItem>
                    <CardItem cardBody>
                        <ProductGrid products={bestSellProducts} navigation={this.props.navigation} />
                    </CardItem>
                </Card>
            );
        }
    }

    renderProductList() {
        const error = this.props.PRODUCTS_REQUEST_ERROR !== null;
        if (error) {
            return (
                <View style={{ flex: 1 }} >
                    <Text>Vui lòng tải lại</Text>
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {
                        this.props.productsRefreshing({ pageSize: 30, pageIndex: 1 })
                    }}>
                        <Text>Refresh</Text>
                    </TouchableOpacity>
                </View>);
        }
        return (
            <Card>
                <CardItem header>
                    <Text>Sản phẩm MỚI</Text>
                </CardItem>
                <CardItem cardBody>
                    <ProductList products={this.props.products} navigation={this.props.navigation} />
                </CardItem>
            </Card>
        );
    }

    renderHeaderMenu() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity style={styles.iconMenu}>
                    <Ionicons name='ios-menu' size={38} style={{ color: '#FFF' }} />
                </TouchableOpacity>
                <FindProductButton navigation={this.props.navigation} />
            </View>
        );
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={{ flex: 1, marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator style={{ alignItems: 'center' }} size="large" />
                </View>
            )
        }
        if (this.props.PRODUCTS_REQUEST_ERROR !== null) {
            return (
                <View style={{ flex: 1, marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Không thể tải dữ liệu, vui lòng thử lại!</Text>
                </View>
            )
        }
        return (
            <Container>
                <Header>
                    {this.renderHeaderMenu()}
                </Header>
                <Content>
                    <BannerSlider />
                    {this.renderFeatureProducts()}
                    <Card>
                        <CardItem style={{ backgroundColor: '#008000', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#FFF', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontWeight: 'bold' }}>Chất lượng ổn định</Text>
                        </CardItem>
                    </Card>
                    {this.renderBestSellProducts()}
                    <Card>
                        <CardItem style={{ backgroundColor: '#008000', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#FFF', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontWeight: 'bold' }}>Giao hàng tận nơi - Hậu mãi tận tình</Text>
                        </CardItem>
                    </Card>
                    {this.renderProductList()}
                </Content>
                <PopUpHotLine />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    isRefreshing: state.home.isRefreshing,
    isLoading: state.home.isLoading,
    products: state.home.products,
    PRODUCTS_REQUEST_ERROR: state.home.PRODUCTS_REQUEST_ERROR
});

const mapActionToState = {
    getProducts,
    productsRefreshing,
    fetchingCartItem
};

export default connect(mapStateToProps, mapActionToState)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginTop: 20
    },
    iconMenu: {
        marginTop: 10,
    },
});