/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useEffect}  from 'react';
import {View,Text,StatusBar,Platform,DeviceEventEmitter,AppState } from 'react-native';
import { Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen'
import store from './src/redux/store'
import { Provider } from 'react-redux'
import AppNavigator from './src/navigation/AppNavigator';
//import PushController from './PushController';
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from './src/navigation/NavigationService.js';
import uuid from 'uuid/v1';
import { appendNotificationMessage } from './src/redux/actions/appointmentActions'


const App: () => React$Node = () => {

  useEffect(() => {
    SplashScreen.hide()
    pushNotifications()
    initEventPushNotification()
  },[])



  const initEventPushNotification = () =>  {
    AppState.addEventListener('change', (state) => {
        //console.log(state)
        // if (state === 'background') {

        //     PushNotification.popInitialNotification((notification) => {
        //         if (notification) {
        //              console.log('outside-background',notification)
        //             this.onNotification(notification);
        //         }
        //     });
        //     PushNotification.setApplicationIconBadgeNumber(0);
        
        //   }
          
        // if (state === 'active') {
        //   console.log('hey')
        //     PushNotification.popInitialNotification((notification) => {
        //         if (notification) {
        //             console.log('outside-active',notification)
        //             this.onNotification(notification);
        //         }
        //     })
        // }


    });

}



const navigateToChat = async(data) => {

        const userToken = await AsyncStorage.getItem('Token');
  
        if(userToken)
        {
          NavigationService.navigate('StartSession', {appointment:JSON.parse(data)});
        }
}


  const pushNotifications = (token) => {

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)

      popInitialNotification: function(notification) {

      
         if (notification)
         { 
           
              this.handleOnPushNotification(notification); 
            
         }
      },

      onRegister: function(token) {
     //     console.log("TOKEN:", token)
          AsyncStorage.setItem("device_token", token.token);
      },
     
      // (required) Called when a remote or local notification is opened or received
 
      onNotification: function(notification) {
        console.log(notification)
        // if(currentState ==='active')
        // {
        // //  PushNotification.cancelAllLocalNotifications()
        // }
        var appointment_data = JSON.parse(notification.appointment)
      
            let msg = {
              _id: uuid(),
              text: notification.message,
              createdAt: new Date(),
              user: {
                _id:  notification.user_id,
                name: notification.title,
                avatar:appointment_data.image,
              },
            }

        
          //  store.dispatch(appendNotificationMessage(msg))

          
            if(!notification.userInteraction && notification.type!='reminder') {
              
                store.dispatch(appendNotificationMessage(msg))
                // store.dispatch(recieveNotificationMessage(msg))
                //  navigateToChat(notification.appointemnt)
                  
            }

        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
        
      },
     
      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "274302893670",
     
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
     
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: false,
     
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
       requestPermissions: true
    });

  }

  return (
    <>
          <StatusBar 
          backgroundColor="#5FB8B6"
          barStyle="light-content" />
          <Provider store={store}>
              <View style={{flex:1}}>
                  <Root>
                    <AppNavigator  ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                      }} />
                  </Root>
              </View>
          </Provider>

    </>
  );
};

export default App;
