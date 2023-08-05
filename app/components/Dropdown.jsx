import React, { useState } from "react";
import { Picker } from "react-native";

// pass in options for the picker
const Dropdown = ({ label, options }) => {
  const [selectedValue, setSelectedValue] = useState(options[0]);

  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
    >
      {options.map((option, index) => (
        <Picker.Item key={index} label={option} value={option} />
      ))}
    </Picker>
  );
};

export default Dropdown;
