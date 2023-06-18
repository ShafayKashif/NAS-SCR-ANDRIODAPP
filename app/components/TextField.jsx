import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const TextField = ({label}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const secure=label==="Password" || label==="Confirm Password" ? true : false

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (inputText) => {
    setText(inputText);
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
        secureTextEntry={secure}
      />
      <View style={[styles.labelContainer, (text !== '' || isFocused) && styles.labelContainerActive]}>
        <Text style={[styles.label, (text !== '' || isFocused) && styles.labelActive]}>{label}</Text>
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
    borderColor: 'white',
    paddingHorizontal: 10,
    color: 'white',
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
    color: 'white',
    backgroundColor:"#1E3648",
    fontWeight: 'bold',
  },
  labelActive: {
    fontSize: 14,
    color: 'white',
    backgroundColor:"#1E3648"
  },
});

export default TextField;
