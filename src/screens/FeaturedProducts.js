import React, { PureComponent } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Body, Text, Title, Left, Right, Button, Icon, H2, H3 } from 'native-base';
//import ProductDetail from './ProductDetail';


const { _width } = Dimensions.get('window');
export default class FeaturedProduct extends PureComponent{
    render(){
        return(
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text style={styles.product_title} onPress={() => {this.props.navigation.navigate('ProductDetail')}}>Tem nữ trang Goldtags</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Image
                                source={{
                                    uri:"https://www.phanmemvang.com.vn/images/tem-nu-trang-goldtags.jpg"
                                }}
                                style={{
                                    flex:1,
                                    width:_width,
                                    height:150,
                                    resizeMode:"cover"
                                }}
                            />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button full success>
                                    <Text>Mua Ngay</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Text style={styles.price_sell}>1.600.000 VNĐ</Text>
                                <Text style={styles.price_offer}>1.800.000 VNĐ</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text style={styles.product_title}>Tem nữ trang Goldtags nhãn bạc</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Image
                                source={{
                                    uri:"https://www.phanmemvang.com.vn/images/Tem%20nu%20trang%20Goldtags_1(1).jpg"
                                }}
                                style={{
                                    flex:1,
                                    width:_width,
                                    height:150,
                                    resizeMode:"cover"
                                }}
                            />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button full success>
                                    <Text>Mua Ngay</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Text style={styles.price_sell}>1.600.000 VNĐ</Text>
                                <Text style={styles.price_offer}>1.800.000 VNĐ</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    box_title:{
        color:"#666",
        alignItems:"center",
        justifyContent:"center",
    },
    product_title:{
        alignItems:"center",
        justifyContent:"center",
        color:"#FF8000",
        fontSize:16,
        fontWeight:"bold"
    },
    price_sell:{
        color:"#FF0000",
        fontSize:14,
        fontWeight:"bold",
    },
    price_offer:{
        color:"#999",
        textDecorationLine:"line-through",
        fontSize:12,
    }
});