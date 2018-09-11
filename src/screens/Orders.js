import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, Picker, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from "react-redux";
import { Container, Header, Left, Right, Body, Content, Text, Card, CardItem } from "native-base";
import { fetchingOrders } from '../redux/actions/orderAction';
import Ionicons from "react-native-vector-icons/Ionicons";
import ListOrder from "../components/order/ListOrder";
import { Constants } from '../common/Index';

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStatus: 'any'
        };
    }

    componentWillMount() {
        this.getOrders();
    }

    getOrders = () => {
        this.props.fetchingOrders(this.state.selectedStatus);
    }

    onValueChange = (value) => {
        this.props.fetchingOrders(value);
        this.setState({
            selectedStatus: value
        })
    }

    render() {
        const { orders, isWaiting } = this.props;
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
                    <Right />
                </Header>
                <Content>
                    <View style={styles.containerfilter}>
                        <View style={styles.findIDOrder}>

                        </View>
                        <View style={styles.filterStatus}>
                            <Picker selectedValue={this.state.selectedStatus}
                                mode={'dropdown'} onValueChange={value => this.onValueChange(value)}>
                                {
                                    Object.keys(Constants.statusOrder).map((key, index) => {
                                        return <Picker.Item key={index} value={key} label={Constants.statusOrder[key]} />
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                    {
                        isWaiting ?
                            <View style={{ flex: 1, marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator style={{ alignItems: 'center' }} size="large" />
                            </View> :
                            !isWaiting && orders.length === 0 ?
                                <View style={styles.container}>
                                    <Text style={styles.notification}>Hiện chưa có thông tin đơn hàng để hiển thị!</Text>
                                    {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
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
                                            <Text style={{ textAlign: 'center', color: '#FFF' }}>Tiếp tục đặt hàng</Text>
                                        </TouchableOpacity>
                                    </View> */}
                                </View> :
                                <FlatList
                                    data={orders}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) =>
                                        <ListOrder item={item} index={index} navigation={this.props.navigation} />
                                    }
                                />
                    }
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    orders: state.order.listOrder,
    isWaiting: state.order.isWaiting
});

const mapActionsToProps = {
    fetchingOrders
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
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    filterStatus: {
        width: 150,
        borderColor: '#dadada',
        borderWidth: 0.5
    },
    findIDOrder: {
        flex: 1,
    },
    body: {
        color: '#FFF',
        fontSize: 16
    }
});