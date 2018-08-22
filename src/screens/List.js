import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Container, Header, Body, Content, Icon, Left, Button, Text } from 'native-base';
import { connect } from "react-redux";

import { ProductList } from '../components/product';
import BannerSlider from './Banner';


class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content>
                    <BannerSlider />
                    <View style={{ marginTop: 30 }}>
                        <ProductList products={this.props.products} navigation={this.props.navigation} />
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.home.products
});

export default connect(mapStateToProps)(List);