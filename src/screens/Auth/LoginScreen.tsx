import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import Input from '@/components/Input';
import { Routes } from '@/navigators/routes';

type TProps = {} & NavigationScreenProps;

const LoginScreen: React.FC<TProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  return (
    <SafeAreaView
      style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
    >
      <Input
        label="姓名"
        value={name}
        setValue={setName}
        placeholder="請輸入姓名"
      />
      <TouchableOpacity onPress={() => navigation.navigate(Routes.MainHome, { name })}>
        <Text style={{ textDecorationLine: 'underline' }}>Go Main</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
