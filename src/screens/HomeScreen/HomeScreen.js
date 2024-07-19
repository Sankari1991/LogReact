import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  BackHandler,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import styles from './styles';
import Icon from '../../components/Icon';
import Card from '../../components/Card';
import {
  getDBConnection,
  getCompanyList,
  saveCompanyItems,
  deleteCompanyItem,
} from '../../db_service/db_service';

const HomeScreen = ({navigation, route}) => {
  const {
    mainContainer,
    innerContainer,
    container,
    headerContainer,
    countContainer,
    addContainer,
    addBtnStyle,
    addBtnContStyle,
    textStyle,
    labelStyle,
    listStyle,
    circle,
    textCircle,
    mainBtnStyle,
  } = styles();
  const [userName, setUserName] = useState(route.params.user);
  const [userId, setUserId] = useState(route.params.userId);
  const [companyList, setCompantList] = useState([]);
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route?.params) {
        navigationFunction(route.params);
      }
    });
    return unsubscribe;
  }, [navigation, route]);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const list = await getCompanyList(db, userId);
      console.log(list);
      setCompantList(list);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to close the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const navigationFunction = params => {
    if (params.mode === 'Edit') {
      let editItemId = params.item[0].cop_id;
      let item = params.item;
      updateState(editItemId, item);
    } else if (params.mode === 'Add') {
      let item = params.item;
      addState(item);
    }

    clearParams();
  };
  const NewCompany = () => {
    let ids;
    if (companyList.length > 0) {
      let length = parseInt(companyList.length) - 1;
      ids = companyList[length].cop_id;
      ids = parseInt(ids) + 1;
    } else {
      ids = 1;
    }
    navigation.navigate('AddScreen', {
      type: 'company',
      mode: 'Add',
      item: {},
      id: ids,
      userId: userId,
    });
  };
  const logout = () => {
    navigation.navigate('LoginScreen');
  };
  const clearParams = () => {
    navigation.setParams({type: null, mode: null, item: null});
  };
  const renderData = ({item, index}) => {
    return (
      <Card
        itemValue={item}
        selectedItemType={'company'}
        itemClick={item => {
          handleItemPress(item, index);
        }}
        editData={item => {
          editData(item, index);
        }}
        deleteData={item => {
          deleteData(item, index);
        }}
        disable={false}
      />
    );
  };
  const handleItemPress = async (item, index) => {
    try {
      let cop_id = companyList[index].cop_id;
      const db = await getDBConnection();

      navigation.navigate('BranchScreen', {
        companyName: companyList[index].company,
        mode: '',
        item: [{}],
        cop_id: cop_id,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const editData = (item, index) => {
    navigation.navigate('AddScreen', {
      type: 'company',
      mode: 'Edit',
      item: companyList[index],
      id: index + 1,
      userId: userId,
    });
  };
  const deleteData = async (item, index) => {
    try {
      let id = companyList[index].cop_id;
      const db = await getDBConnection();
      await deleteCompanyItem(db, id, userId);
      const list = await getCompanyList(db, userId);
      console.log(list);
      setCompantList(list);
    } catch (error) {
      console.log(error);
    }
  };

  const updateState = async (id, editItem) => {
    try {
      let cop_id = editItem[0].cop_id;
      console.log('Added', editItem);
      const db = await getDBConnection();
      await saveCompanyItems(db, editItem);
      const list = await getCompanyList(db, userId);
      console.log(list);
      setCompantList(list);
    } catch (error) {
      console.error(error);
    }
  };
  const addState = async item => {
    console.log('ADDED', item);
    try {
      let id = item[0].user_id;
      const db = await getDBConnection();
      await saveCompanyItems(db, item);
      const list = await getCompanyList(db, id);
      console.log(list);
      setCompantList(list);
    } catch (error) {
      console.error(error);
    }
  };

  const renderEmptyListComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={textStyle}>{'No Record Found'}</Text>

        <Text>{'Add new company'}</Text>
      </View>
    );
  };
  const header = () => {
    return (
      <SafeAreaView style={mainContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <View style={innerContainer}>
          <View style={headerContainer}>
            <View style={countContainer}>
              <View style={circle}>
                <Text style={textCircle}>{companyList.length}</Text>
              </View>
              <Text style={labelStyle}>{' Count'}</Text>
            </View>
            <TouchableOpacity style={addContainer} onPress={NewCompany}>
              <View style={addBtnStyle}>
                <Text style={addBtnContStyle}>New</Text>
                <Icon name="add-circle-outline" size={30} color={'gray'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <View style={innerContainer}>
        <View style={container}>
          <View>
            <Text style={labelStyle}>{'Hi, Welcome'}</Text>
            <Text style={textStyle}>
              {userName} ({userId})
            </Text>
          </View>
          <View style={mainBtnStyle}>
            <TouchableOpacity onPress={logout}>
              <Icon name="log-out-outline" size={30} color={'red'} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          contentContainerStyle={listStyle}
          ListHeaderComponent={header}
          data={companyList}
          renderItem={renderData}
          keyExtractor={(item, index) => item + index}
          ListEmptyComponent={renderEmptyListComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
