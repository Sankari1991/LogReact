import {StyleSheet} from 'react-native';

const styles = theme =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: 'center',
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 15,
      width: '95%',
      backgroundColor: 'white',
      marginTop: 10,
      marginLeft: 10,
      padding: 10,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    countContainer: {
      alignItems: 'flex-start',
      marginStart: 5,
      flexDirection: 'row',
    },
    addContainer: {
      alignItems: 'flex-end',
      marginRight: 5,
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
      fontWeight: 'bold',
      padding: 4,
      textAlign: 'left',
    },
    labelStyle: {
      fontSize: 14,
      color: 'gray',
      fontFamily: 'sans-serif-medium',
      padding: 4,
      textAlign: 'left',
    },
    listStyle: {
      marginBottom: 50,
      marginLeft: 5,
      marginRight: 5,
      flexGrow: 1,
    },
    circle: {
      width: 26,
      height: 26,
      borderRadius: 26 / 2,
      borderWidth: 0.5,
      borderColor: 'black',
      backgroundColor: '#d8d8d8',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 5,
      marginTop: 2,
    },
    textCircle: {
      fontSize: 14,
      color: 'black',
      fontFamily: 'Robetic',
      fontWeight: '100',
      textAlign: 'center',
    },
    mainBtnStyle: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: 5,
      width: '15%',
    },
  });

export default styles;
