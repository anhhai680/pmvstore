import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from "native-base";
import tcomb from "tcomb-form-native";

const Form = tcomb.form.Form;
export default class printerList extends Component {

    constructor(props) {
        super(props);
        //this.initForm();
    }

    initForm = () => {
        const { printers } = this.props;
        this.PrinterInfo = tcomb.struct({
            printer: tcomb.enums(printers)
        });

        this.options = {
            auto: 'none',
            fields: {
                printer: {
                    label: 'Máy in',
                    nullOption: { value: 'Không biết lõi', text: 'Không biết lõi' },
                    error: 'Vui lòng chọn Máy In của bạn'
                }
            }
        };
    }

    render() {
        const { printers } = this.props;
        return (
            <Picker
                iosHeader="Vui lòng chọn lõi mực"
                mode="dialog"
                selectedValue={this.props.selectedPrinter}
                onValueChange={this.props.handlerValueChange}
                style={styles.dropdown}
            >
                {
                    printers.map((item, index) => {
                        return <Picker.Item label={item} value={item} key={index} />
                    })
                }
            </Picker>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 5,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    dropdown: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});