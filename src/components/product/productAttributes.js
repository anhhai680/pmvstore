import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
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
                            <View key={index} style={index % 2 === 0 ? styles.view_even : styles.view_odd}>
                                <Text style={styles.headerText}>{item.name}</Text>
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

const styles = StyleSheet.create({
    view_even: {
        flex: 1,
        paddingBottom: 5,
        paddingLeft: 5,
        backgroundColor: '#DDDDDD',
    },
    view_odd: {
        flex: 1,
        paddingBottom: 5,
        paddingLeft: 5,
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'left',
        paddingRight: 5
    }
});