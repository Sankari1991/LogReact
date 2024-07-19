import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import styles from './styles';
import Icon from '../../components/Icon';
import Card from '../../components/Card';
import {
  getDBConnection,
  getBranchList,
  saveBranchItems,
  updateBranchItems,
  deleteBranchItem,
} from '../../db_service/db_service';

const BranchScreen = ({navigation, route}) => {
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
  const [companyId, setCopId] = useState(route.params.cop_id);
  const [branchList, setBranchList] = useState([]);
  const [companyName, setCompanyName] = useState(route.params.companyName);
  const [branchCount, setBranchCount] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route?.params) {
        navigationFunction(route.params);
      }
    });
    return unsubscribe;
  }, [navigation, route]);

  const navigationFunction = params => {
    if (params.mode === 'Edit') {
      let editItemId = params.item[0].bh_id;
      let item = params.item;
      updateState(editItemId, item);
    } else if (params.mode === 'Add') {
      let item = params.item;
      addState(item);
    }
  };
  useEffect(() => {
    if (typeof branchList === 'undefined') {
      setBranchCount(0);
    } else {
      setBranchCount(branchList.length);
    }
    loadDataCallback();
  }, [loadDataCallback]);

  const NewBranch = () => {
    let ids;
    if (branchList.length > 0) {
      let length = parseInt(branchList.length) - 1;
      ids = branchList[length].bh_id;
      ids = parseInt(ids) + 1;
    } else {
      ids = 1;
    }
    navigation.navigate('AddScreen', {
      type: 'branch',
      mode: 'Add',
      item: {},
      companyId: companyId,
      id: ids,
    });
  };
  const back = () => {
    navigation.goBack();
  };
  const editData = (item, index) => {
    console.log('BR', branchList[index]);
    navigation.navigate('AddScreen', {
      type: 'branch',
      mode: 'Edit',
      item: branchList[index],
      id: index + 1,
      companyId: companyId,
    });
  };
  const deleteData = async (item, index) => {
    try {
      let id = branchList[index].bh_id;
      console.log(id);
      console.log(companyId);
      const db = await getDBConnection();
      await deleteBranchItem(db, id, companyId);
      const list = await getBranchList(db, companyId);
      console.log(list);
      setBranchList(list);
      setBranchCount(list.length);
    } catch (error) {
      throw Error(error);
    }
  };
  const updateState = async (id, editItem) => {
    try {
      let cop_id = editItem[0].cop_id;
      console.log('Added', editItem);
      const db = await getDBConnection();
      await updateBranchItems(db, editItem, id, companyId);
      const list = await getBranchList(db, cop_id);
      console.log(list);
      setBranchList(list);
      setBranchCount(list.length);
    } catch (error) {
      console.error(error);
    }
  };
  const addState = async item => {
    try {
      let id = item[0].cop_id;
      console.log('Added', item);
      const db = await getDBConnection();
      await saveBranchItems(db, item);
      const list = await getBranchList(db, id);
      console.log(list);
      setBranchList(list);
      setBranchCount(list.length);
    } catch (error) {
      console.error(error);
    }
  };

  const loadDataCallback = useCallback(async () => {
    try {
      console.log(companyId);
      const db = await getDBConnection();
      const list = await getBranchList(db, companyId);
      console.log(list);
      setBranchList(list);
      setBranchCount(list.length);
    } catch (error) {
      console.error(error);
    }
  }, [branchList, branchCount]);
  const header = () => {
    return (
      <View style={headerContainer}>
        <View style={countContainer}>
          <View style={circle}>
            <Text style={textCircle}>{branchCount}</Text>
          </View>
          <Text style={labelStyle}>{' Count'}</Text>
        </View>
        <TouchableOpacity style={addContainer} onPress={NewBranch}>
          <View style={addBtnStyle}>
            <Text style={addBtnContStyle}>New</Text>
            <Icon name="add-circle-outline" size={30} color={'gray'} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <Card
        itemValue={item}
        selectedItemType={'branch'}
        editData={item => {
          editData(item, index);
        }}
        deleteData={item => {
          deleteData(item, index);
        }}
        disable={true}
      />
    );
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

        <Text>{'Add new branch'}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <View style={innerContainer}>
        <View style={container}>
          <View>
            <Text style={labelStyle}>{'Company Name'}</Text>
            <Text style={textStyle}>{companyName}</Text>
          </View>

          <View style={mainBtnStyle}>
            <TouchableOpacity onPress={back}>
              <Icon name="backspace-outline" size={30} color={'blue'} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          contentContainerStyle={listStyle}
          ListHeaderComponent={header}
          data={branchList}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
          ListEmptyComponent={renderEmptyListComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default BranchScreen;
