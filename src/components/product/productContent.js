import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, Image, View, TouchableOpacity } from 'react-native';
import { Body, Card, CardItem, Text } from 'native-base';
import HTML from 'react-native-render-html';

export default class ProductContent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            _widthScreen: Dimensions.get('screen').width,
            _scaleScreen: Dimensions.get('screen').scale,
            heightContent: 250,
            visibleButton: true,
        };
        this.changeHeightContent = this.changeHeightContent.bind(this);
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

    changeHeightContent = () => {
        this.setState({
            visibleButton: false,
            heightContent: null
        });
    }

    render() {
        return (
            <Card style={{ height: this.state.heightContent }}>
                <CardItem header>
                    <Text>Thông tin chi tiết</Text>
                </CardItem>
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
                {
                    this.state.visibleButton ?
                        <CardItem style={styles.cardItemView}>
                            <TouchableOpacity style={styles.touchView}
                                onPress={() => this.changeHeightContent()}>
                                <Text style={styles.textColor}>Xem thêm</Text>
                            </TouchableOpacity>
                        </CardItem>
                        : null
                }
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    cardItemView: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFF',
        opacity: 0.75,
    },
    touchView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textColor: {
        color: '#158FEA'
    },
});

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