import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const LargeTextField = ({ label, value, onChange }) => {
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
        multiline={true} // Allow multiline input
        textAlignVertical="top" // Align the text to the top
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
    marginTop: 20,
  },
  input: {
    minWidth: '85%',
    maxWidth: '85%',
    height: 200, // Remove fixed height
    borderWidth: 2,
    borderRadius: 7,
    borderColor: 'white',
    paddingHorizontal: 10,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 20, // Add padding to the top
  },
  labelContainer: {
    position: 'absolute',
    left: 10,
    top: 16,
    paddingHorizontal: 5,
    backgroundColor: '#1E3648',
    fontWeight: 'bold',
  },
  labelContainerActive: {
    top: -12,
  },
  label: {
    fontSize: 16,
    color: 'white',
    backgroundColor: '#1E3648',
    fontWeight: 'bold',
  },
  labelActive: {
    fontSize: 14,
    color: 'white',
    backgroundColor: '#1E3648',
  },
});

export default LargeTextField;
