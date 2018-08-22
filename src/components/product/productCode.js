import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from "native-base";


export default class productCode extends React.Component{
    render(){
        const { codes } = this.props;
        return (
            <Picker 
                iosHeader="Vui lòng chọn mã sản phẩm"
                model="dialog"
                selectedValue={this.props.codeSelected}
                onValueChange={this.props.handlerValueChange}
            >
                {codes.map((item, index) => {
                    return <Picker.Item label={item} value={item} key={index} />
                })}
            </Picker>
        );
    }
}

const styles = StyleSheet.create({
    dropdown:{
        flex:1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});