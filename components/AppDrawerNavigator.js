import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import {AppStackNavigator1} from './AppStackNavigator1'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyQueries from '../screens/MyQueries';
import FAQScreen from '../screens/FAQScreen';
import SettingScreen from '../screens/SettingScreen';
import VideosScreen from '../screens/VideosScreen';

import {Icon} from 'react-native-elements';

import { AppStackNavigator2 } from './AppStackNavigator2';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="home" type ="fontawesome5" />
    }
    },
  MyQueries : {
    screen : MyQueries,
    navigationOptions:{
      drawerIcon : <Icon name="question-circle" type ="font-awesome" />,
      drawerLabel : "My Queries"
    }
  },
  FAQ : {
    screen : AppStackNavigator1,
    navigationOptions:{
      drawerIcon : <Icon name="bell" type ="font-awesome" />,
      drawerLabel : "FAQ"
    }
  },
  Videos :{
    screen: AppStackNavigator2,
    navigationOptions:{
      drawerIcon : <Icon name="gift" type ="font-awesome" />,
      drawerLabel : "Useful Videos"
    }
  },
  Setting : {
    screen : SettingScreen,
    navigationOptions:{
      drawerIcon : <Icon name="settings" type ="fontawesome5" />,
      drawerLabel : "Settings"
    }
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })