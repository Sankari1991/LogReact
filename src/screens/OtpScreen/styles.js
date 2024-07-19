import {StyleSheet} from 'react-native';

const styles = theme =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    innerContainer: {
      padding: 2,
      flexGrow: 1,
      justifyContent: 'space-evenly',
    },
    container: {alignItems: 'center'},
    imageStyle: {
      height: '25%',
      marginBottom: '2%',
    },
    textStyle: {
      marginTop: '3%',
      fontSize: 18,
      color: 'black',
      fontFamily: 'Robetic',
      fontWeight: 'bold',
    },
    buttonStyle: {
      marginTop: '2%',
      borderRadius: 25,
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonTextStyle: {
      fontSize: 18,
      color: 'white',
      fontFamily: 'Robetic',
      fontWeight: 'bold',
      width: '80%',
      textAlign: 'center',
    },
    containerRow: {
      marginTop: '2%',
      flexDirection: 'row',
    },
    circle: {
      width: 55,
      height: 55,
      borderRadius: 55 / 2,
      borderColor: 'gray',
      backgroundColor: '#d8d8d8',
      margin: '2%',
      textAlign: 'center',
    },
    textCircle: {
      fontSize: 18,
      color: 'black',
      fontFamily: 'Robetic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default styles;
