import React, { Component } from "react";
import { BackHandler, Alert } from "react-native";
import PropTypes from "prop-types";
import { StackNavigator, TabNavigator, TabBarBottom, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Home, About, Cart, Checkout, FinishOrder, Product, List, Notifications, Orders, OrderDetail } from "../screens";
import { addListener } from "../redux/ReduxNavigation";
import IconBadge from "../components/IconBadge";


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
                tabBarVisible: false
            }
        },
        FinishOrder: {
            screen: FinishOrder,
            navigationOptions: {
                header: null,
                tabBarVisible: false
            }
        }
    },
    {
        headerMode: 'none'
    }
)

export const ListOrder = StackNavigator({
    Orders: {
        screen: Orders,
        navigationOptions: {
            header: null,
            //tabBarVisible: false
        }
    },
    OrderDetail: {
        screen: OrderDetail,
        navigationOptions: {
            header: null,
            //tabBarVisible: false
        }
    }
},
    {
        headerMode: 'none'
    }
)

export const Main = StackNavigator({
    HomeTab: {
        screen: TabNavigator(
            {
                MainTab: {
                    screen: Home,
                    navigationOptions: {
                        tabBarLabel: 'Trang chủ',
                        tabBarIcon: ({ focused, tintColor }) => {
                            return <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} color={tintColor} size={25} />
                        }
                    }
                },
                ProductTab: {
                    screen: List,
                    navigationOptions: {
                        tabBarLabel: 'Sản phẩm',
                        tabBarIcon: ({ focused, tintColor }) => {
                            return <Ionicons name={focused ? 'ios-list-box' : 'ios-list-box-outline'} color={tintColor} size={25} />
                        }
                    }
                },
                OrderTab: {
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
                ListOrderTab: {
                    screen: ListOrder,
                    navigationOptions: {
                        tabBarLabel: 'Đơn hàng',
                        tabBarIcon: ({ focused, tintColor }) => {
                            return <Ionicons name={focused ? 'ios-briefcase' : 'ios-briefcase-outline'} color={tintColor} size={25} />
                        }
                    }
                },
                NotificationTab: {
                    screen: Notifications,
                    navigationOptions: {
                        tabBarLabel: 'Thông báo',
                        tabBarIcon: ({ focused, tintColor }) => {
                            return <Ionicons name={focused ? 'ios-notifications' : 'ios-notifications-outline'} color={tintColor} size={25} />
                        }
                    }
                },
                ContactTab: {
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
                tabBarOptions: {
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                    showIcon: true
                },
                tabBarComponent: TabBarBottom,
                tabBarPosition: 'bottom',
                animationEnabled: true,
                swipeEnabled: true,
                lazy: true
            }
        ),
        navigationOptions: {
            header: null,
        }
    }
})

export const AppNavigator = StackNavigator(
    {
        Home: {
            screen: Main,
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
        headerMode: 'screen',
        initialRouteName: 'Home'
    }
)


class AppWithNavigationState extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.routes.length === 1
            && (nav.routes[0].routes[0].index === 0
                && nav.routes[0].routeName === 'Home')) {
            Alert.alert(
                'Thoát ứng dụng',
                'Bạn có thực sự muốn thoát ?',
                [
                    { text: 'ĐỒNG Ý', onPress: () => BackHandler.exitApp() },
                    { text: 'HUỶ', style: 'cancel' }
                ], {
                    cancelable: false
                }
            )
        }
        dispatch({ type: 'Navigation/BACK' });
        return true;
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