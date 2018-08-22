import React, { Component } from 'react';
import { About, Home, Menu, List, Product, Profile, Cart, Checkout, FinishOrder, CartView } from './screens';
import { DrawerNavigator, StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderStack = StackNavigator({
    CartView: {
        screen: CartView,
        navigationOptions: {
            header: null
        }
    },
    Cart: { screen: Cart },
    Checkout: { screen: Checkout },
    FinishOrder: { screen: FinishOrder }
});

const TabHomeStack = TabNavigator(
    {
        Home: { screen: Home },
        Cart: { screen: Cart },
        Contact: { screen: About }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName == 'Home') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                }
                else if (routeName == 'Cart') {
                    iconName = `ios-cart${focused ? '' : '-outline'}`;
                }
                else if (routeName == 'Contact') {
                    iconName = `ios-contacts${focused ? '' : '-outline'}`;
                }
                return <Ionicons name={iconName} color={tintColor} size={25} />;
            }
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false
    }
);

const DrawerStack = DrawerNavigator({
    Home: { screen: TabHomeStack },
    Products: { screen: List },
    Profile: { screen: Profile },
    About: { screen: About }
},
    {
        contentComponent: props => <Menu {...props} />
    }
);

const RootNavigator = StackNavigator({
    Main: {
        screen: DrawerStack,
        navigationOptions: {
            header: null
        }
    },
    Product: {
        screen: Product
    },
    ProductList: {
        screen: List
    },
    Checkout: { screen: Checkout },
    FinishOrder: { screen: FinishOrder }
}, {
        headerMode: 'screen',
        initialRouteName: 'Main',
    });

export default RootNavigator;