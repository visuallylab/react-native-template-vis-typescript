import React from 'react';
import AppNavigator from '@/navigators/AppNavigator';
import AppContextsProvider from '@/contexts/AppContextsProvider';

export default () => (
  <AppContextsProvider>
    <AppNavigator />
  </AppContextsProvider>
);
