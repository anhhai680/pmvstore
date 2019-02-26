import React, { Component } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { Card, CardItem, Text } from 'native-base';


export default class productAttributes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CardItem header>
                    <Text>Đặc tính</Text>
                </CardItem>
                <CardItem>
                    <FlatList
                        data={this.props.attributes}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) =>
                            <View key={index} style={{ flex: 1, marginBottom: 5 }}>
                                <Text style={{ fontWeight: 'bold', textAlign: 'left', paddingRight: 5 }}>{item.name}</Text>
                                <View style={{ paddingTop: 5 }}>
                                    <Text style={{ textAlign: 'left', flexWrap: 'wrap' }}>{item.options}</Text>
                                </View>
                            </View>
                        } />
                </CardItem>
            </Card>
        );
    }
}