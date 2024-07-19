import {StyleSheet} from 'react-native';

const styles = theme =>
  StyleSheet.create({
    mainContainer: {
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      justifyContent: 'left',
      alignItems: 'left',
    },
    title: {
      fontFamily: 'Robetic',
      color: 'black',
      fontSize: 16,
      marginTop: '10%',
    },
    contentText: {
      fontFamily: 'Medium',
      color: 'black',
      fontSize: 14,
    },
    textInputStyle: {
      marginTop: '7%',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 15,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export default styles;
