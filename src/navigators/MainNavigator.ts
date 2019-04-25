import { createBottomTabNavigator } from 'react-navigation';

import { renderTabIcon } from '@/utils';
import HomeScreen from '@/screens/HomeScreen';
import { Routes } from './routes';

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: renderTabIcon('home'),
      },
    },
  },
  {
    initialRouteName: Routes.MainHome,
  },
);
