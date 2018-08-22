import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {Body, Card, CardItem} from 'native-base';
import HTML from 'react-native-render-html';


const _width = Dimensions.get("window").width;
export default class ProductContent extends PureComponent{
    render(){
        return (
            <Card>
                <CardItem>
                    <Body>
                        <HTML html={this.props.content} height={_width/2} />
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
    p: {
        fontSize: 13,
        color: "#666",
    },
    img:{
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        margin:20,
        padding:20
    }
});