import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import ConnectScreen from '../screens/ConnectScreen';

const AppNavigator = createSwitchNavigator(
  {
    Main: MainNavigator,
    Auth: AuthNavigator,
    Connect: ConnectScreen,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(AppNavigator);
