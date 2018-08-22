import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class ColorView extends Component {
  render() {
    const { color } = this.props;
    const backgroundColor = color.toLowerCase();
    return (
      <View
        style={[
          { backgroundColor },
          color ? [styles.color, { borderColor: backgroundColor }] : styles.color
        ]}
      >
      </View>
    )
  }
}

const styles = StyleSheet.create({
  color: {
    width: 20,
    height: 20,
    margin: 4
  },
  colorSelected: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 8,
    margin: 4,
  }
});