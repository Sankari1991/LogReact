import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Icon from '../Icon/Icon';

const TextInputs = ({
  placeholder,
  values,
  name,
  setValue,
  returnType,
  refs,
  onSubmitEditing,
  keyboardType,
}) => {
  const {input} = styles();

  const [currentValue, setCurrentValue] = useState(`${values}`);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <TextInput
        style={input}
        placeholder={placeholder}
        defaultValue={values}
        returnKeyType={returnType}
        keyboardType={keyboardType}
        ref={refs}
        onSubmitEditing={() => onSubmitEditing.current.focus()}
        onChangeText={v => {
          setValue(v);
        }}
        blurOnSubmit={false}
      />
    </View>
  );
};

export default TextInputs;
