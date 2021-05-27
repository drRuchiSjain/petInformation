import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import InformationScreen from '../screens/InformationScreen';
import QueryScreen from '../screens/QueryScreen';
import {AppStackNavigator} from './AppStackNavigator'




export const AppTabNavigator = createBottomTabNavigator({
  InfoScreen : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/dog3.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "View Info Pets",
    }
  },
  QueryPet: {
    screen: QueryScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/dog4.jpg")} style={{width:20, height:20}}/>,
      tabBarLabel : "Enter Info Pets",
    }
  }
});