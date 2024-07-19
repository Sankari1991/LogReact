import {StyleSheet} from 'react-native';

const styles = theme =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    innerContainer: {
      padding: 5,
      flex: 1,
    },
    container: {
      justifyContent: 'right',
      alignItems: 'right',
      marginLeft: '5%',
      marginTop: '5%',
    },
    title: {
      fontFamily: 'Robetic',
      color: 'black',
      fontSize: 16,
    },
    contentText: {
      fontFamily: 'Medium',
      color: 'black',
      fontSize: 12,
      paddingTop: 5,
    },
    containerTab: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10%',
    },
    tabText: {
      width: '90%',
    },
    tabButtonStyle: {
      width: '50%',
    },
    buttonStyle: {
      borderRadius: 25,
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 15,
    },
    buttonTextStyle: {
      fontSize: 14,
      color: 'white',
      fontFamily: 'Robetic',
      fontWeight: 'bold',
      width: '100%',
      textAlign: 'center',
    },
  });

export default styles;
