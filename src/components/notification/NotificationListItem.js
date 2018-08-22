import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Body, Card, CardItem, Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

export default class NotificationListItem extends Component {

    static propTypes = {
        /**
         * The items to be rendered
         */
        item: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            createdDate: PropTypes.string.isRequired,
            isRead: PropTypes.bool.isRequired
        }).isRequired,
        /**
         * Event Handler when a user clicks on the item
         */
        onPress: PropTypes.func
    }

    static defaultProps = {
        onPress: () => { console.log(`NotificationListItem: onPress(${this.props.item.id})`); }
    }

    render() {
        const { item } = this.props;
        return (
            <Card>
                <CardItem header>
                    <Icon name={'envelope-open'} fontSize={24} style={styles.iconStyle} />
                    <Text style={styles.notify_title}>{item.title}</Text>
                    <Text style={styles.notify_date}>({item.createdDate})</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>{item.body}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    notify_title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    notify_date: {
        fontSize: 12,
        color: '#666',
        marginLeft: 10
    },
    iconStyle: {
        marginRight: 10
    }
});