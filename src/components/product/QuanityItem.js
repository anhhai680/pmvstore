import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default class QuantityItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1
        }
        this.onCounterChange = this.onCounterChange.bind(this);
    }

    onCounterChange = (countType) => {
        let counter = this.state.counter;
        switch (countType) {
            case 'increase':
                counter += 1;
                break;
            case 'decrease':
                if (counter == 1) break;
                counter -= 1;
                break;
        }
        this.props.quantityValueChange(counter);
        this.setState({ counter });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.labelName}>Số lượng </Text>
                <View style={styles.buttonStyle}>
                    <TouchableOpacity onPress={() => this.onCounterChange('decrease')}>
                        <Text style={styles.textButton}>-</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.counterBox}>
                    <Text style={styles.counterText}>{this.state.counter}</Text>
                </View>
                <View style={styles.buttonStyle}>
                    <TouchableOpacity onPress={() => this.onCounterChange('increase')}>
                        <Text style={styles.textButton}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        height: 30
    },
    labelName: {
        fontSize: 14,
        color: '#000'
    },
    buttonStyle: {
        backgroundColor: 'white',
        // borderWidth: 1,
        // borderColor: '#cdcdcd',
        width: 25
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        padding: 5,
        color: '#000000'
    },
    counterBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 25
    },
    counterText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000000'
    }
})