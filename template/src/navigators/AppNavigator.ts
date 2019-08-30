import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { Routes } from './routes';

const AppNavigator = createSwitchNavigator(
  {
    [Routes.AppAuth]: AuthNavigator,
    [Routes.AppMain]: MainNavigator,
  },
  {
    initialRouteName: Routes.AppAuth,
  },
);

export default createAppContainer(AppNavigator);
