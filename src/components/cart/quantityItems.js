import React, { Component } from "react";
import { Picker } from "native-base";
import { Dropdown } from 'react-native-material-dropdown';


export default class quantityItems extends Component {
    render() {
        const {selectedValue, pId, variationid} = this.props;
        let data = [
            {value: '1'},
            {value: '2'},
            {value: '3'},
            {value: '4'},
            {value: '5'},
            {value: '6'},
            {value: '7'},
            {value: '8'},
            {value: '9'},
            {value: '10'},
            {value: '15'},
            {value: '20'},
            {value: '25'},
            {value: '30'},
            {value: '35'},
            {value: '40'},
            {value: '45'},
            {value: '50'}
        ];

        return (
            <Dropdown
                label="Số lượng"
                data={data}
                value={selectedValue}
                onChangeText={(value) => this.props.onValueChange(pId, value, variationid)}
            />
        );
    }
}