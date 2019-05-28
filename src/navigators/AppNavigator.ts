import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { Routes } from './routes';

const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    Main: MainNavigator,
  },
  {
    initialRouteName: Routes.AuthLogin,
  },
);

export default createAppContainer(AppNavigator);
