
import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

type TSpinnerProps = {
  text?: string;
};

const Spinner: React.FunctionComponent<TSpinnerProps> = ({ text }) => (
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

export default Spinner;
