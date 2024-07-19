import * as React from 'react';
import {Platform, StatusBar} from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('#1C00ff00');
    StatusBar.setTranslucent(true);
  }

  return <AppNavigation />;
};

export default App;
