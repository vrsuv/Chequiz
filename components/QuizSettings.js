import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSettings } from '../components/Contexts';

const SelectOption = ({ data, selectedValue, buttonStyle, onValueChange, defaultButtonText }) => {
  const { isHaptic } = useSettings();
  const handleTouch = () => {
    if (isHaptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };
  return (
    <SelectDropdown
      buttonStyle = {buttonStyle}
      data={data}
      onSelect={(selectedItem, index) => {
        handleTouch();
        onValueChange(selectedItem);
      }}
      defaultButtonText={<Text style = {{ fontSize: 15}}>{defaultButtonText || 'Select an option 🔍'}</Text>}
    />
  );
};

export default SelectOption;
