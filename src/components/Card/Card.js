import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from '../Icon/Icon';
const Card = ({
  itemValue,
  selectedItemType,
  itemClick,
  editData,
  deleteData,
  disable,
}) => {
  const {
    mainContainer,
    container,
    textStyle,
    labelStyle,
    lineStyle,
    labelContainer,
    actionContainer,
  } = styles();
  const [selectedItem, setSelectedItem] = useState([]);

  return (
    <TouchableOpacity onPress={itemClick} disabled={disable}>
      <View style={mainContainer}>
        {selectedItemType === 'company' ? (
          <View>
            <View style={labelContainer}>
              <Text style={labelStyle}>{'Company'}</Text>
              <Text style={labelStyle}>{'Technology'}</Text>
            </View>
            <View style={container}>
              <Text style={textStyle}>{itemValue.company}</Text>
              <Text style={textStyle}>{itemValue.ctechnology}</Text>
            </View>
            <View style={labelContainer}>
              <Text style={labelStyle}>{'Company Address'}</Text>
              <Text style={labelStyle}>{'Branch Count'}</Text>
            </View>
            <View style={container}>
              <Text style={textStyle}>{itemValue.caddress}</Text>
              <Text style={textStyle}>{itemValue.branchcnt}</Text>
            </View>
          </View>
        ) : (
          <View>
            <View style={labelContainer}>
              <Text style={labelStyle}>{'Branch'}</Text>
              <Text style={labelStyle}>{'Technology'}</Text>
            </View>
            <View style={container}>
              <Text style={textStyle}>{itemValue.branch}</Text>
              <Text style={textStyle}>{itemValue.btechnology}</Text>
            </View>
            <View style={labelContainer}>
              <Text style={labelStyle}>{'Branch Address'}</Text>
              <Text style={labelStyle}>{'Employee Count'}</Text>
            </View>
            <View style={container}>
              <Text style={textStyle}>{itemValue.baddress}</Text>
              <Text style={textStyle}>{itemValue.employeecnt}</Text>
            </View>
          </View>
        )}
        <View style={lineStyle} />
        <View style={actionContainer}>
          <TouchableOpacity onPress={editData}>
            <Icon name="create-outline" size={25} color={'blue'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteData}>
            <Icon name="trash-outline" size={25} color={'red'} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
