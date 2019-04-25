import React from 'react';
import AppNavigator from './src/navigators/AppNavigator';
import AppContextsProvider from './src/contexts/AppContextsProvider';

export default () => (
  <AppContextsProvider>
    <AppNavigator />
  </AppContextsProvider>
);
