import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Keyboard, } from 'react-native';
import { Container, Header, Content, } from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { ProductList } from '../components/product';


class SearchProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameProduct: '',
            enableBtnBack: true,
        };
        // this._keyboardDidShow = this._keyboardDidShow.bind(this);
        // this._keyboardDidHide = this._keyboardDidHide.bind(this);
    }

    // componentDidMount() {
    //     this.keyboardDidShowListener = Keyboard.addListener(
    //         'keyboardDidShow',
    //         this._keyboardDidShow,
    //     );
    //     this.keyboardDidHideListener = Keyboard.addListener(
    //         'keyboardDidHide',
    //         this._keyboardDidHide,
    //     );
    // }

    // componentWillUnmount() {
    //     this.keyboardDidShowListener.remove();
    //     this.keyboardDidHideListener.remove();
    // }

    // _keyboardDidShow() {
    //     this.setState({
    //         enableBtnBack: false
    //     })
    // }

    // _keyboardDidHide() {
    //     this.setState({
    //         enableBtnBack: true
    //     })
    // }

    renderHeader() {
        console.log(JSON.stringify(this.props))
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {
                    this.state.enableBtnBack ?
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.iconBack}>
                            <Ionicons name='ios-arrow-back' size={38} style={{ color: '#FFF' }} />
                        </TouchableOpacity>
                        : null
                }
                <TextInput
                    ref={input => { this.textInput = input }}
                    value={this.state.nameProduct}
                    onChangeText={(value) => this.setState({ nameProduct: value })}
                    style={styles.textInput}
                    onSubmitEditing={Keyboard.dismiss}
                    autoFocus={true}
                    multiline={false}
                    maxLength={100}
                    underlineColorAndroid='transparent'
                    placeholder="Tìm sản phẩm"
                    placeholderTextColor='#FFF'
                />
                <TouchableOpacity onPress={() => this.setState({ nameProduct: '' })} style={styles.iconClose}>
                    <Ionicons name='ios-close' size={38} style={{ color: '#FFF' }} />
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        let findProducts = this.props.products.filter(x => x.name.toLowerCase().includes(this.state.nameProduct.trim().toLowerCase())
            || x.slug.replace(/-/g, ' ').includes(this.state.nameProduct.trim().toLowerCase()));
        return (
            <Container>
                <Header>
                    {this.renderHeader()}
                </Header>
                <Content>
                    <View style={{ marginTop: 30 }}>
                        <ProductList products={findProducts} navigation={this.props.navigation} />
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.home.products,
});

export default connect(mapStateToProps)(SearchProduct);

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#FFF',
        backgroundColor: '#F79620',
        color: '#FFF',
        textAlign: 'left',
        margin: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 40,
    },
    iconClose: {
        position: 'absolute',
        marginRight: 15,
        right: 0,
        marginTop: 10
    },
    iconBack: {
        marginTop: 10,
    },
})