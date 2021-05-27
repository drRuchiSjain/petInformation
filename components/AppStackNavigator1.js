import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import FAQScreen  from '../screens/FAQScreen';
import AnswerScreen  from '../screens/AnswerScreen';

export const AppStackNavigator1 = createStackNavigator({
    FAQScreen : {
      screen : FAQScreen,
      navigationOptions:{
        headerShown : false
      }
    },
    AnswerDetails : {
      screen : AnswerScreen,
      navigationOptions:{
        headerShown : false
      }
    },
    
  },
  
    {
      initialRouteName: 'FAQScreen'
    }
  );
  
  
  