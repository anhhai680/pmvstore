import { AsyncStorage } from "react-native";
import {
    NOTIFICATION_SET,
    NOTIFICATION_GET,
    NOTIFICATION_FETCHING,
    NOTIFICATION_ERROR,
    NOTIFICATION_DELETE
} from "../constants/actionTypes";


export const setStoreData = (notification) => async (dispatch) => {
    try {
        dispatch({ type: NOTIFICATION_FETCHING });

        const newMsg = {
            id: notification.notificationId,
            title: notification.title,
            body: notification.body,
            created_date: new Date().toLocaleDateString('vi-VN'),
            is_read: false
        };

        let arrMsg = [];
        const storeList = await AsyncStorage.getItem('notifyDb');
        if (storeList !== null) {
            arrMsg = JSON.parse(storeList);
        }
        arrMsg = [newMsg, ...arrMsg];

        await AsyncStorage.setItem('notifyDb', JSON.stringify(arrMsg), (error) => {
            if (error) {
                console.error(error);
                dispatch({
                    type: NOTIFICATION_ERROR,
                    payload: {
                        error
                    }
                });
            }
        });

        dispatch({ type: NOTIFICATION_SET });
    } catch (error) {
        console.error(error);
        dispatch({
            type: NOTIFICATION_ERROR,
            payload: {
                error
            }
        });
    }
}

export const getStoreData = () => async (dispatch) => {

    dispatch({
        type: NOTIFICATION_FETCHING
    });

    try {

        const storeList = await AsyncStorage.getItem('notifyDb');
        if (storeList !== null) {
            dispatch({
                type: NOTIFICATION_GET,
                payload: {
                    data: JSON.parse(storeList)
                }
            })
        } else {
            dispatch({
                type: NOTIFICATION_ERROR,
                payload: {
                    error: 'Cannot load data from storage'
                }
            });
        }

    } catch (error) {
        console.error(error);
        dispatch({
            type: NOTIFICATION_ERROR,
            payload: {
                error
            }
        });
    }
}

export const deleteNotification = (item) => async (dispatch) => {
    try {
        await AsyncStorage.getItem('notifyDb', (error, result) => {
            if (result && !error) {
                const listResult = JSON.parse(result);
                const newList = listResult.filter(e => {
                    return e.id !== item.id
                });
                AsyncStorage.setItem('notifyDb', JSON.stringify(newList), (error) => {
                    if (error) {
                        dispatch({
                            type: NOTIFICATION_ERROR,
                            payload: { error }
                        })
                    } else {
                        dispatch({
                            type: NOTIFICATION_DELETE,
                            payload: {
                                data: newList
                            }
                        })
                    }
                })
            } else {
                dispatch({
                    type: NOTIFICATION_ERROR,
                    payload: { error }
                })
            }
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: NOTIFICATION_ERROR,
            payload: {
                error
            }
        });
    }
}