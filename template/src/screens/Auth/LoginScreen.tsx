import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import Input from '@/components/Input';
import { useUser } from '@/contexts/userContext';
import { Routes } from '@/navigators/routes';

type TProps = {} & NavigationScreenProps;
const LoginScreen: React.FC<TProps> = ({ navigation }) => {
  const [, setUser] = useUser();
  const [name, setName] = useState<string>('');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: '80%' }}>
          <Input
            label="姓名"
            value={name}
            setValue={setName}
            placeholder="請輸入姓名"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.MainHome);
            setUser(user => ({ ...user, name }));
          }}
        >
          <Text style={{ textDecorationLine: 'underline' }}>Go Main</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
