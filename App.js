import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage, Alert } from "react-native";
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import { PersistGate } from 'redux-persist/integration/react';

import ReduxConfig from './src/redux/store';
import AppWithNavigationState from './src/navigators/AppRouter';

import SlashScreen from "./src/screens/Slash";



export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  componentDidMount() {
    this.setState({
      isReady: true
    });

    this.checkUserPermission();
    this.handleNotification();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  checkUserPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      // user doesn't have permission
      try {
        await firebase.messaging().requestPermission();
        // User has authorised
      } catch (error) {
        // User has rejected permissions
        //alert('No permission for notification');
        console.error("User hasn't granted permission");
      }
    }
  }

  handleNotification = async () => {
    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
      if (notification.body !== undefined) {
        this.storeData(notification);
        Alert.alert('Thông báo', notification.body);
      } else {
        const customdata = JSON.parse(notification.data.customdata);
        if (customdata !== null && typeof customdata == 'object') {
          const cusNotify = {
            notificationId: notification.notificationId,
            title: customdata.title,
            body: customdata.body
          }
          this.storeData(notification);
          Alert.alert('Thông báo', customdata.body);
        }
      }
      firebase.notifications().removeDeliveredNotification(notification.notificationId);
    }

    // const channel = new firebase.notifications.Android.Channel('pmv-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
    //   .setDescription('My apps test channel');

    // // Create the channel
    // firebase.notifications().android.createChannel(channel);
    // this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
    //   // Process your notification as required
    //   // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    //   firebase.notifications().displayNotification(notification);
    // });

    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      // Process your notification as required
      notification
        .android.setChannelId('pmv-channel')
        .android.setSmallIcon('ic_notif')
        .android.setColor('#DD670C')
        .android.setAutoCancel(true);

      notification.android.setPriority(firebase.notifications.Android.Priority.High);
      firebase.notifications().displayNotification(notification);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
      if (notification.body !== undefined) {
        this.storeData(notification);
        Alert.alert('Thông báo', notification.body);
      } else {
        const customdata = JSON.parse(notification.data.customdata);
        if (customdata !== null && typeof customdata == 'object') {
          const cusNotify = {
            notificationId: notification.notificationId,
            title: customdata.title,
            body: customdata.body
          }
          this.storeData(notification);
          Alert.alert('Thông báo', customdata.body);
        }
      }
      firebase.notifications().removeDeliveredNotification(notification.notificationId);
    });
  }

  storeData = async (notification) => {
    try {
      const newMsg = {
        id: notification.notificationId,
        title: notification.title,
        body: notification.body,
        createdDate: new Date().toLocaleDateString('vi-VN'),
        isRead: false
      };

      let arrMsg = [];
      const storeList = await AsyncStorage.getItem('notifyDb');
      if (storeList !== null) {
        arrMsg = JSON.parse(storeList);
      }
      //arrMsg.unshift(newMsg);
      arrMsg = [newMsg, ...arrMsg];

      await AsyncStorage.setItem('notifyDb', JSON.stringify(arrMsg), (error) => {
        if (error)
          console.error(error);
      });

    } catch (error) {
      // Error saving data
      console.error(error);
    }
  }

  render() {
    if (!this.state.isReady) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return (
      <Provider store={ReduxConfig.store}>
        <PersistGate loading={<SlashScreen />} persistor={ReduxConfig.persistor}>
          <Root>
            <AppWithNavigationState />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}
