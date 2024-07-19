import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import Icon from '../../components/Icon';
import Card from '../../components/Card';
import TextInputs from '../../components/TextInput';

const AddScreen = ({navigation, route}) => {
  const {
    mainContainer,
    innerContainer,
    container,
    title,
    titleContainer,
    contentText,
    textInputContainer,
    textInputStyle,
    buttonStyle,
    buttonTextStyle,
  } = styles();
  const [butSelection, setButtonSelection] = useState(false);
  const [addType, setAddType] = useState(route.params.type);
  const [addMode, setAddMode] = useState(route.params.mode);
  const [userId, setUserId] = useState(route.params.userId);
  const [companyId, setCompanyId] = useState(route.params.companyId);
  const [id, setId] = useState(route.params.id);
  const [selectedArray, setSelectedArray] = useState([route.params.item]);
  const [companyName, setCompnayName] = useState('');
  const [companyAddress, setCompnayAddress] = useState('');
  const [branchCnt, setBranchCount] = useState('');
  const [companytechlogy, setCompanyTechnology] = useState('');
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [branchTechnology, setBranchTechnology] = useState('');
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  var n = '';
  const company = [
    {
      id: 1,
      name: 'Comapny Name',
      placeholder: 'company name',
    },
    {
      id: 2,
      name: 'Comapny Address',
      placeholder: 'address',
    },
    {
      id: 3,
      name: ' Branch Count',
      placeholder: 'branch count',
    },
    {
      id: 4,
      name: 'Technology',
      placeholder: 'technology',
    },
  ];

  const branch = [
    {
      id: 1,
      name: 'Branch Name',
      placeholder: 'branch name',
    },
    {
      id: 2,
      name: 'Branch Address',
      placeholder: 'address',
    },
    {
      id: 3,
      name: ' Employee Count',
      placeholder: 'employee count',
    },
    {
      id: 4,
      name: 'Technology',
      placeholder: 'technology',
    },
  ];
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      console.log('reloaded');
    });
  }, [navigation]);
  useEffect(() => {
    if (addMode === 'Edit' && addType === 'company') {
      setCompnayName(selectedArray[0].company);
      setCompnayAddress(selectedArray[0].caddress);
      setBranchCount(selectedArray[0].branchcnt.toString());
      setCompanyTechnology(selectedArray[0].ctechnology);
    } else if (addMode === 'Edit' && addType === 'branch') {
      setBranchName(selectedArray[0].branch);
      setBranchAddress(selectedArray[0].baddress);
      setEmployeeCount(selectedArray[0].employeecnt.toString());
      setBranchTechnology(selectedArray[0].btechnology);
    }
  }, [selectedArray]);

  const back = () => {
    if (addType === 'company') {
      navigation.navigate('CompanyScreen', {myParam: undefined});
    } else {
      navigation.navigate('BranchScreen', {myParam: undefined});
    }
  };

  const addingEditingCompany = () => {
    var num = Number(branchCnt) || 0;
    var item = {
      cop_id: id,
      company: companyName,
      caddress: companyAddress,
      branchcnt: num,
      ctechnology: companytechlogy,
      user_id: userId,
    };
    navigation.navigate('CompanyScreen', {
      type: addType,
      mode: addMode,
      item: [item],
    });
  };

  const addingEditingBranch = () => {
    var num = Number(employeeCount) || 0;
    var item = {
      bh_id: id,
      branch: branchName,
      baddress: branchAddress,
      employeecnt: num,
      btechnology: branchTechnology,
      cop_id: companyId,
    };
    navigation.navigate('BranchScreen', {
      type: addType,
      mode: addMode,
      item: [item],
    });
  };
  return (
    <KeyboardAvoidingView
      style={mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={innerContainer}>
        <View style={container}>
          <Text style={title}>{addMode}</Text>
          {addType === 'company' ? (
            <View style={titleContainer}>
              <Text style={title}>{addMode} New Company </Text>
              <TouchableOpacity onPress={back}>
                <Icon name="backspace-outline" size={30} color={'gray'} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={titleContainer}>
              <Text style={title}>{addMode} New Branch </Text>
              <TouchableOpacity onPress={back}>
                <Icon name="backspace-outline" size={30} color={'gray'} />
              </TouchableOpacity>
            </View>
          )}
          {/* {addType === 'company' ? <CompanyComponent /> : <BranchComponent />} */}
          {addType === 'company' ? (
            <View styles={textInputContainer}>
              <Text style={contentText}>{company[0].name}</Text>

              <TextInputs
                placeholder={company[0].placeholder}
                values={companyName}
                name={'companyName'}
                setValue={setCompnayName}
                returnType={'next'}
                keyboardType={'default'}
                onSubmitEditing={ref_input2}
              />
              <Text style={contentText}>{company[1].name}</Text>

              <TextInputs
                placeholder={company[1].placeholder}
                values={companyAddress}
                name={'companyAddress'}
                setValue={setCompnayAddress}
                returnType={'next'}
                keyboardType={'default'}
                refs={ref_input2}
                onSubmitEditing={ref_input3}
              />
              <Text style={contentText}>{company[2].name}</Text>

              <TextInputs
                placeholder={company[2].placeholder}
                values={branchCnt}
                name={'branchCnt'}
                setValue={setBranchCount}
                returnType={'next'}
                keyboardType={'numeric'}
                refs={ref_input3}
                onSubmitEditing={ref_input4}
              />
              <Text style={contentText}>{company[3].name}</Text>

              <TextInputs
                placeholder={company[3].placeholder}
                values={companytechlogy}
                name={'companytechlogy'}
                setValue={setCompanyTechnology}
                returnType={'done'}
                keyboardType={'default'}
                refs={ref_input4}
                onSubmitEditing={ref_input5}
              />
            </View>
          ) : (
            <View styles={textInputContainer}>
              <Text style={contentText}>{branch[0].name}</Text>

              <TextInputs
                placeholder={branch[0].placeholder}
                values={branchName}
                name={'branchName'}
                setValue={setBranchName}
                returnType={'next'}
                keyboardType={'default'}
                onSubmitEditing={ref_input2}
              />
              <Text style={contentText}>{branch[1].name}</Text>

              <TextInputs
                placeholder={branch[1].placeholder}
                values={branchAddress}
                name={'branchAddress'}
                setValue={setBranchAddress}
                returnType={'next'}
                refs={ref_input2}
                keyboardType={'default'}
                onSubmitEditing={ref_input3}
              />
              <Text style={contentText}>{branch[2].name}</Text>

              <TextInputs
                placeholder={branch[2].placeholder}
                values={employeeCount}
                name={'employeeCount'}
                setValue={setEmployeeCount}
                returnType={'next'}
                refs={ref_input3}
                keyboardType={'numeric'}
                onSubmitEditing={ref_input4}
              />
              <Text style={contentText}>{branch[3].name}</Text>

              <TextInputs
                placeholder={branch[3].placeholder}
                values={branchTechnology}
                name={'branchTechnology'}
                setValue={setBranchTechnology}
                returnType={'done'}
                refs={ref_input4}
                onSubmitEditing={ref_input5}
                keyboardType={'default'}
              />
            </View>
          )}
          <TouchableOpacity
            ref={ref_input5}
            style={[
              buttonStyle,
              {
                backgroundColor: butSelection ? 'green' : 'gray',
                padding: 15,
              },
            ]}
            onPress={() => {
              if (addType === 'company') {
                addingEditingCompany();
              } else {
                addingEditingBranch();
              }
            }}>
            <Text style={buttonTextStyle}> Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddScreen;
