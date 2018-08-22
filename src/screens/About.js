import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Container, Header, Body, Content, Left, Right, List, ListItem, Title, Text, Button, Icon } from 'native-base';
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
                    <List>
                        <ListItem>
                            <Text style={styles.header_text}>CTY TNHH TM & DV TIN HỌC PHẦN MỀM VÀNG</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Tầng 5, 614-616-618 Ba Tháng Hai, P.14, Quận 10, TP. HCM</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Chi nhánh chợ Hòa Bình: 59 Nghĩa Thục, P.5, Q.5, Tp. HCM</Text>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <VectorIcon name="phone" size={30} />
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
                                    <Text>1900 6037</Text>
                                </Button>
                            </Body>
                            <Right />
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <VectorIcon name="home" size={30} />
                            </Left>
                            <Body>
                                <Button transparent onPress={() => { Linking.openURL('https://www.phanmemvang.com.vn/') }}>
                                    <Text uppercase={false} stylel={styles.linking_text}>www.phanmemvang.com.vn</Text>
                                </Button>
                            </Body>
                            <Right />
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <VectorIcon name="facebook-box" size={30} />
                            </Left>
                            <Body>
                                <Button transparent onPress={() => { Linking.openURL('https://fb.me/phanmemvang.com.vn') }}>
                                    <Text uppercase={false} style={styles.linking_text}>fb.me/phanmemvang.com.vn</Text>
                                </Button>
                            </Body>
                            <Right />
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <VectorIcon name="google-plus" size={30} />
                            </Left>
                            <Body>
                                <Button transparent onPress={() => { Linking.openURL('https://plus.google.com/+phanmemvangvnn') }}>
                                    <Text uppercase={false} style={styles.linking_text}>plus.google.com/+phanmemvangvnn</Text>
                                </Button>
                            </Body>
                            <Right />
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <VectorIcon name="email" size={30} />
                            </Left>
                            <Body>
                                <Button transparent onPress={() => { Linking.openURL('mailto:lienhe@phanmemvang.com.vn') }}>
                                    <Text uppercase={false} style={styles.linking_text}>lienhe@phanmemvang.com.vn</Text>
                                </Button>
                            </Body>
                            <Right />
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    header_text: {
        fontWeight: "bold",
        fontSize: 18,
        alignItems: "center",
        justifyContent: "center",
        color: "#FF8000"
    },
    linking_text: {
        fontSize: 13,
        color: '#999',
        textAlign: "left"
    }
});