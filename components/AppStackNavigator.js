import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import InformationScreen from '../screens/InformationScreen';
import PetDetailsScreen  from '../screens/PetDetailsScreen';
import EditInfoScreen  from '../screens/EditInfoScreen';




export const AppStackNavigator = createStackNavigator({
  InformationPet : {
    screen : InformationScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  PetDetails : {
    screen : PetDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  EditInfo : {
    screen : EditInfoScreen,
    headerShown : false
  }

},

  {
    initialRouteName: 'InformationPet'
  }
);


