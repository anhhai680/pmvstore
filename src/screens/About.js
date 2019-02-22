import React, { Component } from 'react';
import { StyleSheet, Linking, View, Image } from 'react-native';
import {
    Container, Header, Body, Content, Left, List, ListItem, Title, Text, Button
} from 'native-base';
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons';



export default class About extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Về Phần Mềm Vàng</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.header_text}>CÔNG TY TNHH TM & DV TIN HỌC</Text>
                            <Image source={require('../assets/images/Icon_PMV.png')} />
                        </View>
                    </View>
                    <List>
                        <ListItem icon>
                            <Left>
                                <VectorIcon name="google-maps" size={30} style={styles.vectorIcon} />
                            </Left>
                            <Body>
                                <Button transparent onPress={() => { Linking.openURL('https://goo.gl/maps/8jJfpZ8GY412') }}>
                                    <Text uppercase={false} style={styles.linking_text}>Tầng 5, 614-616-618 Ba Tháng Hai, Phường 14, Quận 10, TP.HCM</Text>
                                </Button>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <VectorIcon name="google-maps" size={30} color='#FFF' />
                            </Left>
                            <Body>
                                <Button transparent onPress={() => { Linking.openURL('https://goo.gl/maps/NK7dvB4ZmMz') }}>
                                    <Text uppercase={false} style={styles.linking_text}>Chi nhánh chợ Hòa Bình: 59 Nghĩa Thục, Phường 5, Quận 5, TP.HCM</Text>
                                </Button>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <VectorIcon name="phone" size={30} style={styles.vectorIcon} />
                            </Left>
                            <Body>
                                <Button transparent onPress={() => {
                                    Linking.canOpenURL('tel:19006037').then(supported => {
                                        if (!supported) {
                                            console.log("Thiết bị của bạn không hỗ trợ cuộc gọi!");
                                        } else {
                                            return Linking.openURL('tel:19006037');
                                        }
                                    }).catch(err => console.error('An error occurred', err));
                                }} >
                                    <Text uppercase={false} style={styles.linking_text}>1900 6037</Text>
                                </Button>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <VectorIcon name="home" size={30} style={styles.vectorIcon} />
                            </Left>
                            <Body>
                                <Button transparent onPress={() => { Linking.openURL('https://www.phanmemvang.com.vn/') }}>
                                    <Text uppercase={false} style={styles.linking_text}>www.phanmemvang.com.vn</Text>
                                </Button>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <VectorIcon name="facebook-box" size={30} style={styles.vectorIcon} />
                            </Left>
                            <Body>
                                <Button transparent onPress={() => { Linking.openURL('https://fb.me/phanmemvang.com.vn') }}>
                                    <Text uppercase={false} style={styles.linking_text}>fb.me/phanmemvang.com.vn</Text>
                                </Button>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <VectorIcon name="email" size={30} style={styles.vectorIcon} />
                            </Left>
                            <Body>
                                <Button transparent onPress={() => { Linking.openURL('mailto:lienhe@phanmemvang.com.vn') }}>
                                    <Text uppercase={false} style={styles.linking_text}>lienhe@phanmemvang.com.vn</Text>
                                </Button>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    header_text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "#FF8000"
    },
    linking_text: {
        fontSize: 14,
        color: '#000',
        textAlign: "left"
    },
    vectorIcon: {
        color: '#000'
    },
});