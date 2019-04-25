import React from 'react';
import { UserProvider } from './userContext';

const AppContextsProvider: React.FunctionComponent = props => (
  <UserProvider>{props.children}</UserProvider>
);

export default AppContextsProvider;
