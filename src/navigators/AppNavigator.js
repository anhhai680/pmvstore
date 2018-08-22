import React, { Component } from "react";
import { BackHandler, Alert, DeviceEventEmitter } from "react-native";
import PropTypes from "prop-types";
import { StackNavigator, TabNavigator, DrawerNavigator, TabBarBottom, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware, initializeListeners } from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';


import { Home, About, Cart, Checkout, FinishOrder, Product, List, Notifications } from "../screens";
import { addListener } from "../redux/ReduxNavigation";
//import { setStoreData } from "../redux/actions/notifyAction";
import IconBadge from "../components/IconBadge";


export const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends Component {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        render() {
            const { navigation: { state: { params } } } = this.props
            return <SomeComponent {...params} {...this.props} />
        }
    }
}

export const OrderStack = StackNavigator(
    {
        Cart: {
            screen: Cart,
            navigationOptions: {
                header: null,
                //tabBarVisible: false
            }
        },
        Checkout: {
            screen: Checkout,
            navigationOptions: {
                header: null,
                //tabBarVisible: false
            }
        },
        FinishOrder: {
            screen: FinishOrder,
            navigationOptions: {
                header: null,
                //tabBarVisible: false
            }
        }
    },
    {
        //mode: 'modal',
        headerMode: 'none'
    }
)

export const MainStack = StackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: null
            }
        },
        Product: {
            screen: Product,
            navigationOptions: {
                tabBarVisible: false
            }
        },
        Order: {
            screen: OrderStack,
            navigationOptions: {
                tabBarVisible: false
            }
        },
        List: { screen: List },
        About: { screen: About }
    },
    {
        mode: 'modal',
        headerMode: 'screen',
        initialRouteName: 'Home'
    }
)

export const AppNavigator = TabNavigator(
    {
        Main: {
            screen: MainStack,
            navigationOptions: {
                tabBarLabel: 'Trang chủ',
                tabBarIcon: ({ focused, tintColor }) => {
                    return <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} color={tintColor} size={25} />
                }
            }
        },
        Products: {
            screen: List,
            navigationOptions: {
                tabBarLabel: 'Sản phẩm',
                tabBarIcon: ({ focused, tintColor }) => {
                    return <Ionicons name={focused ? 'ios-list-box' : 'ios-list-box-outline'} color={tintColor} size={25} />
                }
            }
        },
        Order: {
            screen: OrderStack,
            navigationOptions: {
                tabBarLabel: 'Giỏ hàng',
                tabBarIcon: ({ focused, tintColor }) => {
                    return (
                        <IconBadge
                            focused={focused}
                            tintColor={tintColor}
                            focusedName='ios-cart'
                            unfocusedName='ios-cart-outline'
                        />
                    )
                }
            },
        },
        Notify: {
            screen: Notifications,
            navigationOptions: {
                tabBarLabel: 'Thông báo',
                tabBarIcon: ({ focused, tintColor }) => {
                    return <Ionicons name={focused ? 'ios-notifications' : 'ios-notifications-outline'} color={tintColor} size={25} />
                }
            }
        },
        Contact: {
            screen: About,
            navigationOptions: {
                tabBarLabel: 'Liên hệ',
                tabBarIcon: ({ focused, tintColor }) => {
                    return <Ionicons name={focused ? 'ios-contacts' : 'ios-contacts-outline'} color={tintColor} size={25} />
                }
            }
        }
    },
    {
        // navigationOptions: ({ navigation }) => ({
        //     tabBarIcon: ({ focused, tintColor }) => {
        //         const { routeName } = navigation.state;
        //         let iconName;
        //         if (routeName == 'Home') {
        //             iconName = `ios-home${focused ? '' : '-outline'}`;
        //         }
        //         else if (routeName == 'Products') {
        //             iconName = `ios-list-box${focused ? '' : '-outline'}`;
        //         }
        //         else if (routeName == 'Order') {
        //             iconName = `ios-cart${focused ? '' : '-outline'}`;
        //         }
        //         else if (routeName == 'NotifyList') {
        //             iconName = `ios-notifications${focused ? '' : '-outline'}`;
        //         }
        //         else if (routeName == 'Contact') {
        //             iconName = `ios-contacts${focused ? '' : '-outline'}`;
        //         }
        //         return <Ionicons name={iconName} color={tintColor} size={25} />
        //     }
        // }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showIcon: true
        },
        tabBarComponent: TabBarBottom,
        // tabBarComponent: (props) => {
        //     const { navigation, navigationState } = props;
        //     const jumpToIndex = (index) => {
        //         const lastPosition = navigationState.index;
        //         const tab = navigationState.routes[index];
        //         const tabRoute = tab.routeName;
        //         const firstTab = tab.routes[0].routeName;

        //         lastPosition !== index && navigation.dispatch(NavigationActions.navigate(tabRoute));
        //         lastPosition === index && navigation.dispatch(NavigationActions.reset(firstTab));
        //     }
        //     return <TabBarBottom {...props} />
        // },
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        lazy: true,
        initialRouteName: 'Main'
    }
)


class AppWithNavigationState extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        //this.backPressSubscriptions = new Set()
    }

    componentDidMount() {
        //BackHandler.addEventListener("hardwareBackPress", () => this.onBackPress())
        // DeviceEventEmitter.removeAllListeners('hardwareBackPress')
        // DeviceEventEmitter.addListener('hardwareBackPress', () => {
        //     let invokeDefault = true
        //     const subscriptions = []

        //     this.backPressSubscriptions.forEach(sub => subscriptions.push(sub))

        //     for (let i = 0; i < subscriptions.reverse().length; i += 1) {
        //         if (subscriptions[i]()) {
        //             invokeDefault = false
        //             break
        //         }
        //     }

        //     if (invokeDefault) {
        //         BackHandler.exitApp()
        //     }
        // })

        // this.backPressSubscriptions.add(this.handleHardwareBack)
    }

    componentWillUnmount() {
        //BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
        // DeviceEventEmitter.removeAllListeners('hardwareBackPress')
        // this.backPressSubscriptions.clear()
    }

    handleHardwareBack = () => {
        /* do your thing */
        console.log('handleHardwareBack pressed');
    }

    onBackPress = () => {
        try {
            NavigationActions.pop()
            return true
        } catch (error) {
            Alert.alert('Thông báo', 'Cannot pop. Exiting the app...' + error)
        }
    }

    render() {
        const { dispatch, nav } = this.props;
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch,
                    state: nav,
                    addListener
                })}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState);



