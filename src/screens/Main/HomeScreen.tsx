import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import Spinner from '@/components/Spinner';
import { UserContext } from '@/contexts/userContext';

const HomeScreen: React.FC<NavigationScreenProps> = ({ navigation }) => {
  const { user, restored } = useContext(UserContext);
  const name = navigation.getParam('name');
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      {restored ? (
        <View>
          <Text style={{ textAlign: 'center' }}>
            Hi: {name}({user.email})
          </Text>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.tsx</Text>
        </View>
      ) : (
        <Spinner text="載入中" />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
