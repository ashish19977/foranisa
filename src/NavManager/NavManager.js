import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer } from 'react-navigation';
import home from '../screen/home';
import India from '../screen/India';
import Icon from 'react-native-vector-icons/Ionicons';
import state from '../screen/state';
import track from '../screen/track';
import { createStackNavigator } from 'react-navigation-stack';


const NavManager = createMaterialBottomTabNavigator({

    
    Home: {
        screen: home,

        navigationOptions: {
            tabBarLabel: 'Home',
            title: "Home",
            tabBarIcon: ({ tintColor }) => (
                <View>
                    <Icon name="ios-home" color={tintColor} size={25} />
                </View>
            ),

            activeColor: '#f0edf6',
            inactiveColor: '#3e2465',
            barStyle: { backgroundColor: '#009999' },

        }
    },
    
    Covid: {
        screen: India,

        navigationOptions: {
            tabBarLabel: 'Covid',
            tabBarIcon: ({ tintColor }) => (
                <View>
                    <Icon name="ios-stats" color={tintColor} size={25} />
                </View>
            ),

            activeColor: '#f0edf6',
            inactiveColor: '#3e2465',
            barStyle: { backgroundColor: '#66ccff' },

        }
    },
    state: {
        screen: state,

        navigationOptions: {
            tabBarLabel: 'State',
            tabBarIcon: ({ tintColor }) => (
                <View>
                    <Icon name="md-analytics" color={tintColor} size={25} />
                </View>
            ),

            activeColor: '#f0edf6',
            inactiveColor: '#3e2465',
            barStyle: { backgroundColor: '#ff9900' },

        }
    },

    track: {
        screen: track,

        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor }) => (
                <View>
                    <Icon name="md-settings" color={tintColor} size={25} />
                </View>
            ),

            activeColor: '#f0edf6',
            inactiveColor: '#3e2465',
            barStyle: { backgroundColor: '#666699' },

        }
    },


},
    {
        initialRouteName: 'Home'
    }


);

const AppNavigator = createStackNavigator({
    Meals:{
        screen: NavManager,
        navigationOptions:{
            title: 'COVID19 Tracker',
            headerStyle: {
                backgroundColor: '#009999'
              },
              headerTintColor: 'white',

           
     
        },
       

    },
    
})


export default createAppContainer(AppNavigator);