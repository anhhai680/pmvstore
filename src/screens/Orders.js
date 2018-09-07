import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from "react-redux";
import { Container, Header, Left, Right, Body, Content, Text } from "native-base";
import { fetchingCartItem } from '../redux/actions/cartAction';
import Ionicons from "react-native-vector-icons/Ionicons";
import ListOrder from "../components/order/ListOrder";

class Orders extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getCartItems();
    }

    getCartItems = async () => {
        await this.props.fetchingCartItem();
    }

    render() {
        const { cartItems } = this.props;
        if (cartItems.length <= 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.notification}>Chưa có đơn hàng nào đã đặt!</Text>
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
                            <Text style={{ textAlign: 'center', color: '#FFF' }}>Tiếp tục mua hàng</Text>
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
                        <Text style={styles.body}>Đơn hàng của tôi</Text>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.containerfilter}>
                        <View style={styles.filterStatus}>

                        </View>
                        <View style={styles.findIDOrder}>

                        </View>
                    </View>
                    <FlatList
                        data={cartItems}
                        renderItem={({ item }) =>
                            <ListOrder item={item} />
                        }
                    />
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems
});

const mapActionsToProps = {
    fetchingCartItem
}

export default connect(mapStateToProps, mapActionsToProps)(Orders);

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notification: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    containerfilter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
    },
    filterStatus: {
        flex: 1,
        borderColor: 'blue',
        borderWidth: 1,
        height: 30
    },
    findIDOrder: {
        flex: 2,
        borderColor: 'red',
        borderWidth: 1,
        height: 30
    },
    body: {
        color: '#FFF',
        fontSize: 16
    }
});