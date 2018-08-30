import React, { Component } from "react";
import { Image, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;
export default class FullWidthImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null
        }
    }

    componentDidMount() {
        Image.getSize(this.props.image_url, (width, height) => {
            const ratio = height / width;
            this.setState({
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH * ratio
            });
        },
            (errorMsg) => {
                console.log(errorMsg);
            });
    }

    render() {
        const { image_url } = this.props;
        return (
            <Image
                source={{
                    uri: image_url,
                    cache: 'only-if-cached'
                }}
                resizeMode='contain'
                style={{
                    width: this.state.width,
                    height: this.state.height,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            />
        )
    }
}