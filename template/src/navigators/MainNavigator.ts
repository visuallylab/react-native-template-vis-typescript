import { createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '@/screens/Main/HomeScreen';
import { renderTabIcon } from '@/utils';
import { Routes } from './routes';

export default createBottomTabNavigator(
  {
    [Routes.MainHome]: {
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
