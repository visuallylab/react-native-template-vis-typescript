import React from 'react';
import { setPersistStorageDefaults } from 'react-native-use-persist-storage';

import AppNavigator from '@/navigators/AppNavigator';
import AppContextsProvider from '@/contexts/AppContextsProvider';

setPersistStorageDefaults({ debug: true });

export default () => (
  <AppContextsProvider>
    <AppNavigator />
  </AppContextsProvider>
);
