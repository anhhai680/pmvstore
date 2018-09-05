import React, { PureComponent } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Body, Card, CardItem } from 'native-base';
import HTML from 'react-native-render-html';

export default class ProductContent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            _widthScreen: Dimensions.get('screen').width,
            _scaleScreen: Dimensions.get('screen').scale
        };
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.rotateDevice)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.rotateDevice)
    }

    rotateDevice = (event) => {
        this.setState({
            _widthScreen: Dimensions.get('screen').width - 30
        })
    }

    render() {
        return (
            <Card>
                <CardItem>
                    <Body>
                        <HTML html={this.props.content}
                            tagsStyles={tagsStyles}
                            renderers={{
                                img: (htmlAttribs) => {
                                    return (
                                        <View style={{ alignItems: 'center' }}>
                                            <Image source={{ uri: htmlAttribs.src }}
                                                style={{
                                                    resizeMode: 'contain',
                                                    width: this.state._widthScreen - 30,
                                                    height: (this.state._widthScreen / this.state._scaleScreen) + 50
                                                }} />
                                        </View>
                                    )
                                }
                            }}
                        />
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

export const tagsStyles = {
    a: {
        fontWeight: '300',
        color: '#ff3366', // make links coloured pink
    },
    ul: {
        marginBottom: 1
    },
    strong: {
        marginTop: 10
    }
};