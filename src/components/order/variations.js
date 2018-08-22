import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";


export default class variations extends Component {
    render() {
        const { data } = this.props;
        return (
            <FlatList
                data={this.data}
                keyExtractor={item => item.id}
                initialNumToRender={2}
                renderItem={({ item, index }) => {
                    <View key={index}>
                        <Text>{item.name}</Text>
                        <Text>{item.value}</Text>
                    </View>
                }}
            />
        );
    }
}