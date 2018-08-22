import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, TouchableHighlight, Share, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginButton, ShareDialog, ShareApi } from 'react-native-fbsdk';

export default class shareButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shareLinkContent: ''
        };
        //this.createShareContent = this.createShareContent.bind(this);
        //this.fbShareDialog = this.fbShareDialog.bind(this);
        this.shareContent = this.shareContent.bind(this);
    }

    createShareContent() {
        const { data } = this.props;
        const shareLinkContent = {
            contentType: 'link',
            contentUrl: data.permalink,
            contentDescription: data.description
        };
        this.setState({ shareLinkContent });
    }

    fbShareDialog() {
        var tmp = this;
        ShareDialog.canShow(this.state.shareLinkContent).then(
            function (canShow) {
                if (canShow) {
                    return ShareDialog.show(tmp.state.shareLinkContent);
                }
            }
        ).then(
            function (result) {
                if (result.isCancelled) {
                    alert('Share cancelled');
                } else {
                    alert('Share success with postId: ' + result.postId);
                }
            },
            function (error) {
                alert('Share fail with error: ' + error);
            }
        );
    }

    shareContent() {
        const { data } = this.props;
        Share.share(
            {
                ...Platform.select(
                    {
                        ios: {
                            message: data.name,
                            url: data.permalink,
                        },
                        android: {
                            message: data.permalink
                        }
                    }),
                title: data.name
            },
            {
                ...Platform.select({
                    ios: {
                        // iOS only:
                        excludedActivityTypes: [
                            'com.apple.UIKit.activity.PostToFacebook',
                            'com.apple.UIKit.activity.PostToTwitter'
                        ]
                    },
                    android: {
                        // Android only:
                        dialogTitle: 'Share : ' + data.name
                    }
                })
            }
        )
            .then(result => console.log("Share result: " + result))
            .catch(error => console.log("Share error: " + error));
    }

    render() {
        const { data } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.shareContent()}>
                    <Icon name='share-alt' style={styles.icon} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    icon: {
        fontSize: 24,
        color: 'gray'
    },
    shareText: {
        fontSize: 20,
        margin: 10
    }
})