import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Routes } from '@/navigators/routes';

type TProps = {} & NavigationScreenProps;

const LoginScreen: React.FC<TProps> = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
    >
      <TouchableOpacity onPress={() => navigation.navigate(Routes.MainHome)}>
        <Text style={{ textDecorationLine: 'underline' }}>go Main</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
