import { createStackNavigator } from 'react-navigation-stack';
import VideosScreen  from '../screens/VideosScreen';
import playVideosScreen  from '../screens/playVideoScreen';

export const AppStackNavigator2 = createStackNavigator({
    VideoScreen : {
      screen : VideosScreen,
      navigationOptions:{
        headerShown : false
      }
    },
    playVideo : {
      screen : playVideosScreen,
      navigationOptions:{
        headerShown : false
      }
    },
    
  },
  
    {
      initialRouteName: 'VideoScreen'
    }
  );
  
  
  