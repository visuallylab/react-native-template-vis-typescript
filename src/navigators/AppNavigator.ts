import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainNavigator from './MainNavigator';

const AppNavigator = createSwitchNavigator(
  {
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Main',
  },
);

export default createAppContainer(AppNavigator);
