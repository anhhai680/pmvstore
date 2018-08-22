import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';


export default class productColor extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { color, selected } = this.props;
    const backgroundColor = color.toLowerCase();
    return (
      <TouchableOpacity onPress={() => this.props.handleColorSelected(color)}>
        <View
          style={[
            styles.productColor,
            backgroundColor,
            selected && styles.productColorSelected
          ]}
        >
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  productColor: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: 'red',
    margin: 4
  },
  productColorSelected: {
    backgroundColor: "white",
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 8,
    margin: 4,
  }
});