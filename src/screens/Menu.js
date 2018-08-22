import React, { Component } from 'react';
import { StatusBar, Image } from 'react-native';
import { Container, Content, Text, List, ListItem, Left, Body, Right, Button, Icon } from "native-base";
import VectorIcon from 'react-native-vector-icons/Ionicons';

const routes = ["Home","Products","Profile","About"];

export default class Menu extends Component{
    render(){
        return(
            <Container>
                <Content>
                    <Image 
                        source={{
                            uri:'https://www.phanmemvang.com.vn/images/logo_new.png'
                        }}
                        style={{
                            height:120,
                            justifyContent:'center',
                            alignItems:'center',
                            alignSelf:'stretch'
                        }}
                    />
                    <List
                        dataArray={routes}
                        renderRow={ data =>{
                            return(
                                <ListItem
                                button
                                onPress={() => this.props.navigation.navigate(data)}
                                >
                                    <Left>
                                        <Text>{data}</Text>
                                    </Left>
                                    <Right>
                                        <VectorIcon name="ios-arrow-forward" />
                                    </Right>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
}

