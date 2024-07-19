import {StyleSheet} from 'react-native';

const styles = theme =>
  StyleSheet.create({
    mainContainer: {
      marginTop: '2%',
      backgroundColor: '#ececec',
      margin: 5,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: 25,
      marginLeft: 10,
      padding: 2,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: 25,
      marginLeft: 10,
      padding: 2,
    },
    labelStyle: {
      textAlign: 'left',
      fontFamily: 'sans-serif-medium',
      color: 'gray',
      fontSize: 12,
      width: '50%',
      fontWeight: '500',
    },
    textStyle: {
      textAlign: 'left',
      fontFamily: 'sans-serif-medium',
      color: 'black',
      fontSize: 14,
      width: '50%',
      fontWeight: '500',
    },
    lineStyle: {
      borderWidth: 0.25,
      borderColor: '#d8d8d8',
      margin: 5,
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 10,
    },
  });

export default styles;
