import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';

const DropDown = ({ label, value, onChange, options }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setText(value); // Set the initial value of the TextInput from the 'value' prop
  }, [value]);

  const handleChangeText = (inputText) => {
    setText(inputText);
    onChange(inputText); // Notify the parent component about the value change
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOptionPress = (optionValue) => {
    handleChangeText(optionValue);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.input, isFocused && styles.inputFocused]}
        onPress={toggleDropdown}
      >
        <Text style={styles.inputText}>{text}</Text>
      </TouchableOpacity>
      <View
        style={[styles.labelContainer, (text !== '' || isFocused) && styles.labelContainerActive]}
      >
        <Text style={[styles.label, (text !== '' || isFocused) && styles.labelActive]}>
          {label}
        </Text>
      </View>


      <Modal visible={isDropdownOpen} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.dropdownContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.optionItem}
                onPress={() => handleOptionPress(option.value)}
              >
                <Text>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  input: {
    minWidth: '85%',
    height: 55,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: 'white',
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  inputText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputFocused: {
    borderColor: 'blue', // Customize the border color when the TextInput is focused
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    minWidth: '80%',
    padding: 10,
    borderRadius: 7,
  },
  optionItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

export default DropDown;



// usage
// <DropDown label="Select Option" value={selectedOption} onChange={handleOptionChange} options={options} /> 
// const [selectedOption, setSelectedOption] = useState('');
// const options = [
//   { label: 'Option 1', value: 'option1' },
//   { label: 'Option 2', value: 'option2' },
//   { label: 'Option 3', value: 'option3' },
// ];

// const handleOptionChange = (newValue) => {
//   setSelectedOption(newValue);
// };