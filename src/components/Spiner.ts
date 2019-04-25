import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

const Loader: React.FunctionComponent = () => (
  <View style={{ flexDirection: 'row' }}>
    <ActivityIndicator />
  </View>
);

export default Spiner;
