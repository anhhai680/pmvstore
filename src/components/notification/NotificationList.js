import React, { Component } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import PropTypes from "prop-types";
import Swipeout from "react-native-swipeout";

import NotificationListItem from "./NotificationListItem";


export default class NotificationList extends Component {
    static propTypes = {
        /**
         * The items to be rendered
         */
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            createdDate: PropTypes.string.isRequired,
            isRead: PropTypes.bool.isRequired
        })).isRequired,
        /**
         * The Refresh Items event handler
         */
        onRefreshItems: PropTypes.func,
        /**
         * The Item Selection event handler
         */
        onSelectItem: PropTypes.func,
        /**
         * The Delete Item event handler
         */
        onDeleteItem: PropTypes.func,
        /**
         * True if refreshing data now
         */
        refreshing: PropTypes.bool
    }

    static defaultProps = {
        onRefreshItems: () => { console.log('onRefreshItems called') },
        onSelectItem: (item) => { console.log('onSelectItem', item) },
        onDeleteItem: (item) => { console.log('onDeleteItem', item) },
        refreshing: false
    }

    constructor(props) {
        super(props);
        this.state = {
            activeRow: null
        };
    }

    onSwipeOpen(item, rowId, direction) {
        this.setState({ activeRow: item.id });
    }

    onSwipeClose(item, rowId, direction) {
        if (item.id === this.state.activeRow && typeof direction !== 'undefined') {
            this.setState({ activeRow: null });
        }
    }

    /**
     * Render a single row of the Flatlist
     */
    renderItem = (row) => {
        const swipeSettings = {
            autoClose: true,
            close: row.item.id !== this.state.activeRow,
            onClose: (secId, rowId, direction) => this.onSwipeClose(row.item, rowId, direction),
            onOpen: (secId, rowId, direction) => this.onSwipeOpen(row.item, rowId, direction),
            right: [
                { onPress: () => this.props.onDeleteItem(row.item), text: 'Delete', type: 'delete' }
            ],
            rowId: row.index,
            sectionId: 1
        };
        return (
            <Swipeout {...swipeSettings}>
                <NotificationListItem item={row.item} onPress={() => this.props.onSelectItem(row.item)} />
            </Swipeout>
        )
    }

    render() {
        const listSettings = {
            data: this.props.items,
            keyExtractor: (item, index) => item.id,
            onRefreshItems: this.props.onRefreshItems,
            refreshing: this.props.refreshing,
            renderItem: (row) => this.renderItem(row)
        }

        return (
            <FlatList {...listSettings} />
        )
    }
}