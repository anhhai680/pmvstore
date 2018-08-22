import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, FlatList, Dimensions, Text, Animated, Platform } from 'react-native';
import NumberFormat from 'react-number-format';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import ListItem from './ListItem';


const screenWidth = Dimensions.get("window").width;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numColumns: 1,
            key: 1
        };
    }

    onPressItem = (product) => {
        const { navigate } = this.props.navigation;
        navigate('Product', { product, id: product.id });
    }

    toggleLayoutChange = (value) => {
        if (screenWidth >= 480 && value == 2)
            value = 4;
        this.setState({ numColumns: value, key: this.state.key + 1 });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 5 }}>
                    <View style={{ marginRight: 4 }}>
                        <TouchableOpacity onPress={() => this.toggleLayoutChange(2)}>
                            <FontAwesome name="th" size={20} color={'#666'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 4 }}>
                        <TouchableOpacity onPress={() => this.toggleLayoutChange(1)}>
                            <FontAwesome name="list" size={20} color={'#666'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    key={this.state.key}
                    numColumns={this.state.numColumns}
                    data={this.props.products}
                    extraData={this.props.products}
                    keyExtractor={(item, index) => index}
                    //renderItem={this.renderItem}
                    renderItem={({ item, index }) => {
                        return <ListItem
                            numColumns={this.state.numColumns}
                            item={item}
                            onPressItem={this.onPressItem}
                            styles={styles}
                        />
                    }}
                    style={styles.container}
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10
    },
    item: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemImage: {
        //height: screenWidth >= 480 ? 300 : 200,
        alignItems: "center"
    },
    itemText: {
        color: '#000',
        fontSize: 13,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexWrap: 'wrap'
    },
    itemPrice: {
        color: '#DD670C',
        fontWeight: 'bold',
        paddingLeft: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
});