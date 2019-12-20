/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useEffect}  from 'react';
import {View,Text,StatusBar} from 'react-native';
import { Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen'
import store from './src/redux/store'
import { Provider } from 'react-redux'
import AppNavigator from './src/navigation/AppNavigator';


const App: () => React$Node = () => {

  useEffect(() => {
     
    SplashScreen.hide()

  },[])

  return (
    <>
          <StatusBar 
          backgroundColor="#5FB8B6"
          barStyle="light-content" />
          <Provider store={store}>
              <View style={{flex:1}}>
                  <Root>
                    <AppNavigator />
                  </Root>
              </View>
          </Provider>

    </>
  );
};

export default App;
