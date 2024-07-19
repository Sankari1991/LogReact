import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Icon from '../Icon/Icon';

const TabItem = ({
  value,
  buttonSelection,
  setButtonSelection,
  phoneValidationStatus,
  setPhoneValidationStatus,
  emailValidationStatus,
  setEmailValiationStatus,
  user_Name,
  setUserName,
}) => {
  const {mainContainer, container, title, contentText, textInputStyle} =
    styles();

  const validateEmail = email => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    let result = expression.test(String(email).toLowerCase());
    return result;
  };

  const mobileValidate = text => {
    const reg = /^[0]?[789]\d{9}$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const handleText = text => {
    setUserName(text);
    console.log(user_Name);
  };
  return (
    <View style={mainContainer}>
      <View style={container}>
        <Text style={contentText}>
          Enter your {value} as per company HR records, We'll send youa
          verification code so we know your identity
        </Text>
        {value === 'Email' ? (
          <Text style={title}>Email Address</Text>
        ) : (
          <Text style={title}>Phone Number</Text>
        )}

        {value === 'Email' ? (
          <View style={textInputStyle}>
            <TextInput
              autoFocus={true}
              defaultValue={user_Name}
              placeholder="Email Address"
              keyboardType="email-address"
              onChangeText={value => {
                let result = validateEmail(value);
                setButtonSelection(result);
                setEmailValiationStatus(result);
                if (result) {
                  handleText(value);
                }
              }}
            />

            {emailValidationStatus ? (
              <Icon name="checkmark-circle" size={30} color={'green'} />
            ) : null}
          </View>
        ) : (
          <View style={textInputStyle}>
            <TextInput
              autoFocus={true}
              defaultValue={user_Name}
              maxLength={10}
              placeholder="Phone Number"
              keyboardType="number-pad"
              onChangeText={value => {
                let result = mobileValidate(value);
                setButtonSelection(result);
                setPhoneValidationStatus(result);
                if (result) {
                  handleText(value);
                }
              }}
            />
            {phoneValidationStatus ? (
              <Icon name="checkmark-circle" size={30} color={'green'} />
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
};

export default TabItem;
