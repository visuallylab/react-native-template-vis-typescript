import { createStackNavigator } from 'react-navigation';
import LoginScreen from '@/screens/Auth/LoginScreen';
import { Routes } from './routes';

export default createStackNavigator(
  {
    [Routes.AuthLogin]: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login',
      },
    },
  },
  {
    initialRouteName: Routes.AuthLogin,
  },
);
