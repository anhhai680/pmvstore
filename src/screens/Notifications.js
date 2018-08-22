import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { connect } from "react-redux";
import { Container, Header, Body, Content, Text } from "native-base";

import { getStoreData, deleteNotification } from "../redux/actions/notifyAction";
import NotificationList from "../components/notification/NotificationList";


class Notifications extends Component {

    constructor(props) {
        super(props);
        //this.props.getStoreData();
    }

    componentDidMount() {
        this.props.getStoreData();
    }

    onDeleteItem = (item) => {
        console.log('onDeleteItem', item);
        if (item !== null) {
            this.props.deleteNotification(item);
        }
    }


    render() {

        // if (this.props.isFetching && this.props.notifyDb.length <= 0) {
        //     return (
        //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //             <ActivityIndicator size={36} color={'green'} />
        //         </View>
        //     )
        // }

        if (!this.props.isFetching && this.props.notifyDb.length <= 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Chưa có thông báo!</Text>
                </View>
            )
        }

        return (
            <Container>
                <Header>
                    <Body>
                        <Text style={{ color: '#FFF', justifyContent: 'center', alignItems: 'center' }}>Thông báo của tôi</Text>
                    </Body>
                </Header>
                <Content>
                    <NotificationList items={this.props.notifyDb} onDeleteItem={this.onDeleteItem} />
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.notify.isFetching,
    notifyDb: state.notify.notifyDb,
    error: state.notify.error
});

const mapActionsToProps = {
    getStoreData,
    deleteNotification
}


export default connect(mapStateToProps, mapActionsToProps)(Notifications);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});