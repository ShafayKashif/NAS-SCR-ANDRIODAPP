import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const DisabledTextField = ({ label, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    setText(value); // Set the initial value of the TextInput from the 'value' prop
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (inputText) => {
    setText(inputText);
    onChange(inputText); // Notify the parent component about the value change
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        placeholder=" "
        value={text}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={label === 'Password' || label === 'Confirm Password'}
        editable={false}
      />
      <View
        style={[styles.labelContainer, (text !== '' || isFocused) && styles.labelContainerActive]}
      >
        <Text style={[styles.label, (text !== '' || isFocused) && styles.labelActive]}>
          {label}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20
  },
  input: {
    minWidth: '85%',
    height: 55,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#bbb9b9',
    color: '#bbb9b9',
    paddingHorizontal: 10,
    opacity: 0.7, // Reduce the opacity to indicate that the input is disabled
    fontWeight: 'bold',
  },
  labelContainer: {
    position: 'absolute',
    left: 10,
    top: 16,
    paddingHorizontal: 5,
    backgroundColor: "#1E3648",
    fontWeight: 'bold',
  },
  labelContainerActive: {
    top: -12,
  },
  label: {
    fontSize: 16,
    color: '#bbb9b9',
    backgroundColor:"#1E3648",
    fontWeight: 'bold',
  },
  labelActive: {
    fontSize: 14,
    color: '#bbb9b9',
    backgroundColor:"#1E3648"
  },
});

export default DisabledTextField;