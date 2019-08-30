import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { color } from '@/styles';

type TInputProps = {
  label?: string;
  errorMessage?: string;
  value: any;
  setValue: (data: any) => void;
  rightSideComponent?: React.ReactNode;
  placeholder?: string;
  textInput?: Partial<TextInputProps>;
  formatShowingValue?: (value: any) => any;
};

const Input: React.FunctionComponent<TInputProps> = ({
  label,
  errorMessage,
  value,
  placeholder,
  setValue,
  textInput,
}) => {
  const [focus, setFocus] = useState<boolean>(false);

  // when focus, border bottom line should be blue
  const onFocus = useCallback(() => {
    setFocus(true);
  }, ['un-change']);

  // when end editing, border bottom line should recover lightgray
  const onEndEditing = useCallback(() => setFocus(false), ['un-change']);

  return (
    <View style={styles.inputGroupWrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputWrapper,
          focus && { borderBottomColor: color.main },
        ]}
      >
        <TextInput
          placeholder={placeholder}
          value={value}
          style={[styles.inputText, { color: 'black' }]}
          placeholderTextColor={color.placeholder}
          onChangeText={v => setValue(v)}
          onFocus={onFocus}
          onEndEditing={onEndEditing}
          {...textInput}
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: color.gray,
    fontSize: 12,
  },
  inputGroupWrapper: {
    marginBottom: 13.5,
  },
  inputWrapper: {
    marginTop: 6,
    paddingBottom: 5.5,
    borderBottomWidth: 1,
    borderBottomColor: color.placeholder,
  },
  inputText: {
    color: color.placeholder,
    paddingVertical: 0,
  },
  errorMessage: {
    marginTop: 5,
    color: color.error,
    textAlign: 'right',
  },

  // can add anywhere
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderRightWidth: 6,
    borderLeftWidth: 6,
    borderTopWidth: 10,
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopColor: color.gray,
  },
});

export default Input;
