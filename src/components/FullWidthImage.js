import React, { Component } from "react";
import { Image, Dimensions } from "react-native";

const SCREEN = Dimensions.get('screen');
export default class FullWidthImage extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         width: null,
    //         height: null
    //     }
    // }

    componentDidMount() {
        // Image.getSize(this.props.image_url, (width, height) => {
        //     const ratio = height / width;
        //     this.setState({
        //         width: SCREEN_WIDTH,
        //         height: SCREEN_WIDTH * ratio
        //     });
        // },
        //     (errorMsg) => {
        //         console.log(errorMsg);
        //     });
    }

    render() {
        const { image_url } = this.props;
        return (
            <Image
                source={{
                    uri: image_url,
                    cache: 'only-if-cached'
                }}
                style={{
                    width: SCREEN.width,
                    height: SCREEN.width / SCREEN.scale,
                    resizeMode: 'contain',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1
                }}
            />
        )
    }
}