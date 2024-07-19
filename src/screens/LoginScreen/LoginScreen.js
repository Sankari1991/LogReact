import React, {useState, useEffect, useCallback} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import styles from './styles';
import DuoToggleSwitch from 'react-native-duo-toggle-switch';
import TabItem from '../../components/TabItem';
import {
  getDBConnection,
  createTable,
  saveUserItems,
  getUsers,
  getCompanyList,
  saveCompanyItems,
} from '../../db_service/db_service';

const LoginScreen = ({navigation}) => {
  const {
    mainContainer,
    innerContainer,
    container,
    title,
    contentText,
    containerTab,
    tabText,
    tabButtonStyle,
    buttonStyle,
    buttonTextStyle,
  } = styles();

  const [tabType, setTabType] = useState('Phone Number');
  const [butSelection, setButtonSelection] = useState(false);
  const [phoneValidationStatus, setPhoneValidationStatus] = useState(false);
  const [emailValidationStatus, setEmailValiationStatus] = useState(false);
  const [otp, setOtp] = useState('');
  const [userName, setUserName] = useState('');
  const [userList, setUserList] = useState([]);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      console.log('reloaded');
      setTabType('Phone Number');
      setUserName('');
      setButtonSelection(false);
      setEmailValiationStatus(false);
      setPhoneValidationStatus(false);
    });
  }, [navigation]);

  const tabItem = item => {
    setUserName('');
    setTabType(item);
    setButtonSelection(false);
    setEmailValiationStatus(false);
    setPhoneValidationStatus(false);
  };
  const generateOtp = () => {
    let generatedOtp = '';
    const characters = '0123456789';

    for (let i = 0; i < 4; i++) {
      generatedOtp += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    // Set the generated OTP and reset the validity status
    setOtp(generatedOtp);
  };

  const loadDataCallback = useCallback(async () => {
    try {
      const initUsers = [
        {
          user_id: 1230,
          name: 'Raja',
          mobileNo: '9895958509',
          email: 'raja@gmail.com',
        },
        {
          user_id: 1231,
          name: 'Usha',
          mobileNo: '9899999999',
          email: 'suresh@gmail.com',
        },
      ];
      const initUsers1 = [
        {
          company: 'Wipro',
          caddress: 'Mall, Chennai',
          branchcnt: 1,
          ctechnology: 'wee',
          cop_id: 2,
          user_id: 1230,
        },
      ];
      const db = await getDBConnection();
      await createTable(db);
      await saveUserItems(db, initUsers);
      const list = await getUsers(db);
      setUserList(list);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
    if (butSelection) {
      generateOtp();
    }
  }, [loadDataCallback, butSelection]);

  const isValidUser = userName => {
    let item = userList.find(
      item => item.mobileNo === userName || item.email === userName,
    );
    let result = isEmpty(item);
    if (!result && butSelection && otp) {
      console.log(tabType, otp);
      navigation.navigate('OtpScreen', {
        type: tabType,
        otp: otp,
        username: item.name,
        userid: item.user_id,
      });
    } else {
      Alert.alert('Invalid User!', 'User name is incorrect', [
        {
          text: 'Ok',
          onPress: () => null,
          style: 'ok',
        },
      ]);
    }
  };
  function isEmpty(value) {
    return (
      value == null || (typeof value === 'string' && value.trim().length === 0)
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <View style={innerContainer}>
        <View style={container}>
          <Text style={title}>Login Account</Text>
          <Text style={contentText}>Hello, Welcome to Logface </Text>
        </View>
        <View style={containerTab}>
          <DuoToggleSwitch
            style={tabText}
            primaryButtonStyle={tabButtonStyle}
            secondaryButtonStyle={tabButtonStyle}
            primaryText="Phone Number"
            secondaryText="Email"
            inactiveColor={'#ececec'}
            activeColor={'#006994'}
            onPrimaryPress={() => {
              tabItem('Phone Number');
            }}
            onSecondaryPress={() => {
              tabItem('Email');
            }}
          />
          <TabItem
            value={tabType}
            buttonSelection={butSelection}
            setButtonSelection={setButtonSelection}
            phoneValidationStatus={phoneValidationStatus}
            setPhoneValidationStatus={setPhoneValidationStatus}
            emailValidationStatus={emailValidationStatus}
            setEmailValiationStatus={setEmailValiationStatus}
            user_Name={userName}
            setUserName={setUserName}
          />
          <TouchableOpacity
            style={[
              buttonStyle,
              {
                backgroundColor: butSelection ? 'green' : 'gray',
                padding: 15,
              },
            ]}
            onPress={() => {
              isValidUser(userName);
            }}>
            <Text style={buttonTextStyle}> Request OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
