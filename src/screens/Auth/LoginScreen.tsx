import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import Input from '@/components/Input';
import { Routes } from '@/navigators/routes';

type TProps = {} & NavigationScreenProps;

const LoginScreen: React.FC<TProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
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
        onPress={() => navigation.navigate(Routes.MainHome, { name })}
      >
        <Text style={{ textDecorationLine: 'underline' }}>Go Main</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
