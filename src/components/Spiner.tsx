import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

type TLoaderProps = {
  text?: string;
};

const Loader: React.FunctionComponent<TLoaderProps> = ({ text }) => (
  <View
    style={{
      flexDirection: 'row',
      width: '100%',
      minHeight: 50,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <ActivityIndicator />
    {text && <Text style={{ marginLeft: 5 }}>{text}</Text>}
  </View>
);

export default Loader;
