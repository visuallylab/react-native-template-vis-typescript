import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const renderTabIcon = (name: string) => ({
  tintColor,
}: {
  tintColor: string;
}) => {
  return <Icon size={24} color={tintColor} name={name} />;
};
