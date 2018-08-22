import React, { Component } from 'react';
import { Container, Header, Body, Left, Content, Footer, Title, Text, Button, Icon } from 'native-base';

export default class Profile extends Component{
    render(){
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                        onPress={() => {this.props.navigation.navigate('DrawerOpen')}} >
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>ProfileScreen</Title>
                    </Body>
                </Header>
                <Content>
                    <Button full onPress={() => {this.props.navigation.navigate('Home')}}>
                        <Text>Profile Screen</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}