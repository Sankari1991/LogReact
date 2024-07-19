import {StyleSheet} from 'react-native';

const styles = theme =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    innerContainer: {
      padding: 10,
      flex: 1,
    },
    container: {
      marginLeft: 10,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontFamily: 'sans-serif-medium',
      color: 'black',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '500',
    },
    addContainer: {
      marginTop: 10,
      alignItems: 'flex-end',
      padding: 5,
      marginEnd: 5,
    },
    addBtnStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    addBtnContStyle: {
      fontSize: 14,
      color: 'black',
      fontFamily: 'Robetic',
      fontWeight: 'bold',
      padding: 4,
      textAlign: 'center',
    },
    textStyle: {
      fontSize: 18,
      color: 'black',
      fontFamily: 'sans-serif-medium',
      fontWeight: '500',
      padding: 4,
      textAlign: 'center',
    },
    buttonStyle: {
      borderRadius: 25,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
    },
    buttonTextStyle: {
      fontSize: 14,
      color: 'white',
      fontFamily: 'Robetic',
      fontWeight: 'bold',
      width: '87%',
      textAlign: 'center',
    },
    textInputContainer: {
      justifyContent: 'center',
      marginTop: 15,
    },
    contentText: {
      fontFamily: 'sans-serif-medium',
      fontWeight: '500',
      color: 'black',
      fontSize: 12,
      marginTop: 5,
    },
    textInputStyle: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 15,
      textAlign: 'left',
      margin: 5,
      paddingLeft: 5,
    },
  });

export default styles;
