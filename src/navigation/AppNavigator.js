import React from 'react' 
import {Animated, Easing,View,Text,TouchableOpacity} from 'react-native'
import { Icon} from 'native-base';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/auth/Login'; 
import Logout from '../screens/auth/Logout';
import ForgotPassword from '../screens/auth/ForgotPassword'; 
import Signup from '../screens/auth/Signup';  
import Home from '../screens/home/Home';
import AskAQuestion from '../screens/home/AskAQuestion';
import SelectCategory from '../screens/home/SelectCategory';
import Doctors from '../screens/home/Doctors';
import NewBooking from '../screens/home/NewBooking';
import Settings from '../screens/settings/Settings';
import ChangePassword from '../screens/settings/ChangePassword'; 
import EditInfo from '../screens/settings/EditInfo'; 
import MyProfile from '../screens/profile/MyProfile';
import Help from '../screens/help/Help';
import MyAppointments from '../screens/myAppointments/MyAppointments';
import AuthLoadingScreen  from '../screens/auth/AuthLoadingScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';

let SlideFromRight = (index, position, width) => {
    const translateX = position.interpolate({
      inputRange: [index - 1, index],
      outputRange: [width, 0],
    })
  
    return { transform: [ { translateX } ] }
  };
  
  
  const TransitionConfiguration = () => {
    return {
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: (sceneProps) => {
        const { layout, position, scene } = sceneProps;
        const width = layout.initWidth;
        const height = layout.initHeight;
        const { index, route } = scene
        const params = route.params || {}; // <- That's new
        const transition = params.transition || 'default'; // <- That's new
        return {
          default: SlideFromRight(index, position, width)
          // bottomTransition: SlideFromBottom(index, position, height),
          // collapseTransition: CollapseTransition(index, position)
        }[transition];
      },
    }
  }

  //Home Stack
  const HomeStack = createStackNavigator({
      Home:{screen:Home,
          navigationOptions:({ navigation }) => {
          return {
            header:null
          }
      }},

      NewBooking:{screen:NewBooking,
        navigationOptions:({ navigation }) => {
        return {
        
          headerStyle:{
              backgroundColor:'#5FB8B6',
          },
          headerTitle:'NEW BOOKING',
          headerTintColor:'#ffffff',
          headerTitleStyle:{
            fontFamily:'Montserrat-Black',
          }
       
        }
      }},

      SelectCategory:{screen:SelectCategory,
        navigationOptions:({ navigation }) => {
        return {
            headerStyle:{
                backgroundColor:'#5FB8B6',
            },
            headerTitle:'SELECT CATEGORY',
            headerTintColor:'#ffffff',
            headerTitleStyle:{
              fontFamily:'Montserrat-Black',
            },
            headerRight:<TouchableOpacity onPress={navigation.getParam('showSearchBar')} ><View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                          <Icon style={{fontSize:30,color:'#ffffff'}} type="Ionicons" name="search"/>
                      </View></TouchableOpacity>,
            headerRightContainerStyle: {
              paddingRight:15
            } 
        
        }
      }},

      Doctors:{screen:Doctors,
        navigationOptions:({ navigation }) => {
        return {
              headerStyle:{
                  backgroundColor:'#5FB8B6',
              },
              headerTitle:'DOCTORS',
              headerTintColor:'#ffffff',
              headerTitleStyle:{
                fontFamily:'Montserrat-Black',
              },
              headerRight:<TouchableOpacity onPress={navigation.getParam('showSearchBar')} ><View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Icon style={{fontSize:30,color:'#ffffff'}} type="Ionicons" name="search"/>
                          </View></TouchableOpacity>,
              headerRightContainerStyle: {
                paddingRight:15
              }             
        }
      }},

      AskAQuestion:{screen:AskAQuestion,
        navigationOptions:({ navigation }) => {
        return {
          header:null    
        }
      }}

      },
      {
          initialRouteName: 'Home',
          headerMode: 'screen',
          transitionConfig: TransitionConfiguration,
      })




  //Settings Stack
  const SettingsStack = createStackNavigator({
    Settings:{screen:Settings,
        navigationOptions:({ navigation }) => {
          return {
            headerStyle:{
                backgroundColor:'#5FB8B6',
            },
            headerTitle:'SETTINGS',
            headerTintColor:'#ffffff',
            headerTitleStyle:{
              fontFamily:'Montserrat-Black',
            }           
      }
    }},
    ChangePassword:{screen:ChangePassword,
        navigationOptions:({ navigation }) => {
          return {
            header:null           
        }
    }},
    EditInfo:{screen:EditInfo,
        navigationOptions:({ navigation }) => {
          return {
            header:null           
        }
    }}
    },
    {
        initialRouteName: 'Settings',
        headerMode: 'screen',
        transitionConfig: TransitionConfiguration,
    })


  //Profile Stack
  const MyProfileStack = createStackNavigator({
    MyProfile:{screen:MyProfile,
        navigationOptions:({ navigation }) => {
          return {
            header:null           
      }
    }},
    },
    {
        initialRouteName: 'MyProfile',
        headerMode: 'screen',
        transitionConfig: TransitionConfiguration,
    })


      //Help Stack
  const HelpStack = createStackNavigator({
    Help:{screen:Help,
        navigationOptions:({ navigation }) => {
          return {
            headerStyle:{
                backgroundColor:'#5FB8B6',
            },
            headerTitle:'HELP',
            headerTintColor:'#ffffff',
            headerTitleStyle:{
              fontFamily:'Montserrat-Black',
            }           
      }
    }},
    },
    {
        initialRouteName: 'Help',
        headerMode: 'screen',
        transitionConfig: TransitionConfiguration,
    })

      //Settings Stack
    const MyAppointmentsStack = createStackNavigator({

      MyAppointments:{screen:MyAppointments,
        navigationOptions:({ navigation }) => {
        return {
              headerStyle:{
                  backgroundColor:'#5FB8B6',
              },
              headerTitle:'MY APPOINTEMNTS',
              headerTintColor:'#ffffff',
              headerTitleStyle:{
                fontFamily:'Montserrat-Black',
              },
              headerRight:<TouchableOpacity onPress={navigation.getParam('showSearchBar')} ><View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Icon style={{fontSize:30,color:'#ffffff'}} type="Ionicons" name="search"/>
                          </View></TouchableOpacity>,
              headerRightContainerStyle: {
                paddingRight:15
              }             
        }
      }}

      },
      {
          initialRouteName: 'MyAppointments',
          headerMode: 'screen',
          transitionConfig: TransitionConfiguration,
    })

      //Auth Stack
   const AuthStack = createStackNavigator({ 
        Login:{screen:Login,
          navigationOptions:({ navigation }) => {
         return {
           header:null
         }
       }},
        ForgotPassword:{screen:ForgotPassword,
          navigationOptions:({ navigation }) => {
         return {
           header:null
         }
       }},
        Signup:{screen:Signup,
          navigationOptions:({ navigation }) => {
         return {
           header:null
         }
       }},
       Logout:{screen:Logout,
        navigationOptions:({ navigation }) => {
       return {
         header:null
       }
     }}
    },
    {
      initialRouteName: 'Login',
      transitionConfig: TransitionConfiguration,
  })


  //App Stack with bottom tabs
  const AppStack = createBottomTabNavigator({
    Home: HomeStack,
    MyAppointments:MyAppointmentsStack,
    MyProfile:MyProfileStack,
    Settings: SettingsStack,
    Help: HelpStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
      //  let IconComponent = Ionicons;
        let IconType;
        let iconName;
        if (routeName === 'Home') {
          
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconType = 'Ionicons'
          iconName = 'home'
        }
        else if (routeName === 'Settings') {
          IconType = 'Ionicons'
          iconName = 'settings';
        }
        else if (routeName === 'MyAppointments') {
          IconType = 'Ionicons'
          iconName = 'calendar';
        }
        else if (routeName === 'MyProfile') {
          IconType = 'Ionicons'
          iconName = 'person';
        }
        else if (routeName === 'Help') {
          IconType = 'Ionicons'
          iconName = 'help-circle';
        }

        // You can return any component that you like here!
        return <Icon style={{fontSize:25,color:tintColor}} type={IconType} name={iconName}/>
      },
    }),
    tabBarOptions: {
      activeTintColor: '#5FB8B6',
      inactiveTintColor: '#000000',
      showLabel: false
    },
  }
  );


const AppSwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Logout:{screen:Logout}  
}, { transparentCard: true })

export default createAppContainer(AppSwitchNavigator)

