import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import styles from './styles';

const LoginScreen = ({navigation, route}) => {
  const {
    mainContainer,
    innerContainer,
    container,
    imageStyle,
    textStyle,
    containerRow,
    circle,
    buttonStyle,
    buttonTextStyle,
    textCircle,
  } = styles();
  const [butSelection, setButtonSelection] = useState(false);
  const [type, setUserLoginType] = useState(route.params.type);
  const [user, setUser] = useState(route.params.username);
  const [userId, setUseId] = useState(route.params.userid);
  const [otp, setOtp] = useState(route.params.otp);
  const [otpUser, setOtpUser] = useState(['', '', '', '']);
  const inputs = [];

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      console.log('reloaded');
    });
  }, [navigation, butSelection]);

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

  const DetailForming = ({item}) => {
    return (
      <View style={{marginTop: '16%'}}>
        {item === 'Email' ? (
          <View style={container}>
            <Text style={textStyle}>Verify Email Address {' ' + otp}</Text>
            <Text style={textStyle}>
              we have to sent your OTP to your Email
            </Text>
            <Text style={textStyle}>{user}</Text>
          </View>
        ) : (
          <View style={container}>
            <Text style={textStyle}>Verify Phone Number{' ' + otp}</Text>
            <Text style={textStyle}>
              we have to sent your OTP to your Phone number
            </Text>
            <Text style={textStyle}>{user}</Text>
          </View>
        )}
      </View>
    );
  };
  const handleOtpChange = (value, index) => {
    const newOtp = [...otpUser];
    newOtp[index] = value;
    setOtpUser(newOtp);
    // Move focus to the next box if the current one has a value
    if (value && index < newOtp.length - 1) {
      inputs[index + 1].focus();
    }
    if (index === 3) {
      setButtonSelection(true);
    }
  };
  const moveFocus = textInput => {
    textInput.focus();
  };

  const renderListOfOtp = () => {
    return (
      <View style={containerRow}>
        {otpUser.map((digit, index) => (
          <TextInput
            key={index}
            style={circle}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={value => handleOtpChange(value, index)}
            value={digit}
            ref={input => {
              inputs[index] = input;
            }}
          />
        ))}
      </View>
    );
  };
  // Function to validate the entered OTP
  const validateOtp = userInput => {
    return userInput === otp;
  };
  return (
    <KeyboardAvoidingView
      style={mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <View style={innerContainer}>
        <View style={container}>
          <View style={imageStyle}>
            <Image source={require('../../assets/otp_header12.png')} />
          </View>

          <DetailForming item={type} />
          {<View>{renderListOfOtp()}</View>}
          <TouchableOpacity
            style={[
              buttonStyle,
              {
                backgroundColor: butSelection ? 'green' : 'gray',
                padding: 15,
              },
            ]}
            onPress={() => {
              let userInput = otpUser.join('');
              let result = validateOtp(userInput);
              if (butSelection && result) {
                navigation.navigate('CompanyScreen', {
                  user: user,
                  userId: userId,
                  item: {},
                });
              } else {
                Alert.alert('Invalid otp!', 'Can you resend otp', [
                  {
                    text: 'Resend',
                    onPress: () => {
                      moveFocus(inputs[0]);
                      setOtpUser(['', '', '', '']);
                      generateOtp();
                      setButtonSelection(false);
                    },
                    style: 'resend',
                  },
                ]);
              }
            }}>
            <Text style={buttonTextStyle}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
