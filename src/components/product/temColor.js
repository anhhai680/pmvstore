import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';


export default class temColor extends Component {
  render() {
    const { color, selected } = this.props;
    const backgroundColor = color.toLowerCase();
    return (
      <TouchableOpacity onPress={() => this.props.handleColorSelected(color)}>
        <View
          style={[
            { backgroundColor },
            selected ? [styles.productColorSelected, { borderColor: backgroundColor }] : styles.productColor,
          ]}
        >
        </View>
      </TouchableOpacity >
    );
  }
}

const styles = StyleSheet.create({
  productColor: {
    width: 20,
    height: 20,
    margin: 4
  },
  productColorSelected: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 8,
    margin: 4,
  }
});