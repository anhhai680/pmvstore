import { Platform, AsyncStorage } from 'react-native';
// @flow
import firebase from 'react-native-firebase';
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';

export default async (message: RemoteMessage) => {
    if (message.data && message.data.title) {
        // handler your message
        let notification = new firebase.notifications.Notification();
        notification = notification
            //.setNotificationId(message.data.notificationId)
            .setTitle(message.data.title)
            .setBody(message.data.body)
            .setData(message.data);
        notification
            .android.setSmallIcon("ic_notif")
            .android.setColor('#DD670C')
            .android.setChannelId("pmv-channel")
            .android.setAutoCancel(true);

        notification.android.setPriority(firebase.notifications.Android.Priority.High);
        firebase.notifications().displayNotification(notification);

        return Promise.resolve();
    }
}