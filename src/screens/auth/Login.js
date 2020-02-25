import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View,Image,KeyboardAvoidingView,Platform,ImageBackground  } from 'react-native';
import { Card, CardItem,Icon,Input,Item,Button,Content,Spinner } from 'native-base';
import logo from '../../../assets/logo.png'
import { SimpleAnimation } from 'react-native-simple-animations';
import { connect } from 'react-redux'
import { login, clearMessage,checkFacebookUser,googleLogin } from '../../redux/actions/authActions'
import Dialog from "react-native-dialog";
import { LoginManager,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
  import watermark from '../../../assets/watermark.png'

function Login(props){

    const [credentials,setCredentials] = useState({
        email:'',
        password:'' 
    })


    const [state,setState] = useState({
        isLoading:false,
        modal:false,
        fbData:{},
        googleData:{},
        fbLogin:false,
        message:''
    })

    useEffect( ()=>{
           // signOutGoogle()
            LoginManager.logOut()
     
            if (props.isAuthenticated) {
                setState({...state,isLoading:false})
                props.navigation.navigate('App'); // push user to dashboard when they login
            }

            if(props.authError)
            {

                setState({...state,isLoading:false,modal:true,message:props.authError})
                props.clearMessage()
            }

    },[props.authError,props.isAuthenticated,props.user,props.error]) 

    // useEffect( ()=>{
     
    //     if(props.fbNewUser)
    //     {
    //         setState({...state,fbLogin:false,fbData:{},isLoading:false})
    //         props.clearMessage()
    //         console.log('login success Full')
    //        // props.navigation.navigate('App');
    //     }

    // },[props.fbNewUser]) 





    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        logoImage:{
            width: '50%',
            justifyContent:'center',
            alignItems:'center',
         
        },
        email:{
            marginTop:20,
            backgroundColor:'#BFFEFE',
            borderColor: "#BFFEFE",
            width:'100%'
        },
        password:{
            marginTop:20,
            backgroundColor:'#BFFEFE',
            borderColor: "#BFFEFE",
            width:'100%'
        },
        button:{
            marginTop:20,
            backgroundColor:'#5FB8B6',
            height:50,
            width:'100%'
        },
        FBbutton:{
            marginTop:20,
            backgroundColor:'#ffffff',
            height:50,
            borderWidth:1,
            borderColor:'#355DA1',
         //  elevation:5
        },
        GMbutton:{
            marginTop:20,
            backgroundColor:'#ffffff',
            height:50,
            borderWidth:1,
            borderColor:'#CE3630',
        //    elevation:5
        },
        input:{
            color:'#000000',
            fontSize:14,
            fontFamily:'Montserrat-Bold'
        }
    
    })

    const SignIn = async() => {
       

        setState({...state,isLoading:true})
        let device_token =  await AsyncStorage.getItem('device_token');
     //   console.log(device_token)
        credentials.device_token = device_token
        props.login(credentials)
    }

    const onChangeUsername = (text) => {
        setCredentials({...credentials,email:text})
    }
    
    const onChangePassword = (text) => {
        setCredentials({...credentials,password:text})
    }

    const onChangeFbEmail = (text) => {
        setState((state) => ({
            ...state,
            fbData: {
                ...state.fbData,
                email:text
            }
        }))
    }

    const closeModal = () => {
        
        setState({...state,modal:false})
    }
    const validateEmail = (email) =>{
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    const FBLogin = async() => {

        if(state.fbData.email=='' || !validateEmail(state.fbData.email))
        {
            setState({...state,message:'Please Enter a Valid Email Address',modal:true})
        }else{
         
            setState({...state,isLoading:true})
           // console.log(state.fbData)
            let device_token =  await AsyncStorage.getItem('device_token');
          //  console.log('tokenfff',device_token)
            state.fbData.device_token = device_token
            props.checkFacebookUser(state.fbData)
        
        }
      
    }

      //Create response callback.
    const responseInfoCallback = async(error, result) => {
            if (error) {
              alert('Error fetching data: ' + error.toString());
            } else {

                if(result.email==undefined)
                {
                    result.email = ''
                    setState({...state,fbData:result,fbLogin:true})
               
                }else{
                      
                      let device_token =  await AsyncStorage.getItem('device_token');
                      //console.log('tokenfff',device_token)
                      result.device_token = device_token

                      setState({...state,isLoading:true})
                      props.checkFacebookUser(result)
                }
           
       
            }
    }

    const FacebookLogin = () => {
        LoginManager.logInWithPermissions(['public_profile','email']).then(
            function(result) {
              if (result.isCancelled) {
              //  alert('Login was cancelled');
              } else {
           
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      const infoRequest = new GraphRequest(
                        '/me?fields=name,picture,email ',
                        null,
                        responseInfoCallback
                      );
                      // Start the graph request.
                      new GraphRequestManager().addRequest(infoRequest).start();
                    }
                  )

              }
            },
            function(error) {
              alert('Login failed with error: ' + error);
            }
          );
    }


   const signOutGoogle = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
            setState({...state, googleData:{} }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
    }

    const signInGoogle = async () => {
        try {

          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setState({...state, googleData:userInfo,isLoading:true });

          let device_token =  await AsyncStorage.getItem('device_token');
        
          userInfo.user.device_token = device_token

          props.googleLogin(userInfo)

        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('cancelled')
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('progress')
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('play not available')
            // play services not available or outdated
          } else {
              console.log(error)
            // some other error happened
          }
        }
      };

    const GoogleLogin = () => {
 
        GoogleSignin.configure({
            scopes: [], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '274302893670-e2v162f3jgthritqrm3banpaboqhpmss.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
          //  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
            accountName: '', // [Android] specifies an account name on the device that should be used
          
          })
        signInGoogle()
    }

    return (

        <View style={styles.container}>

                 <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0}} footerStyle={{height:130}}   visible={state.modal}>
                 
                    <View style={{height:130,flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'#5FB8B6'}}>
                         <Icon style={{fontSize:60,color:'#ffffff'}} type="Ionicons" name="close-circle"/>
                         <Text style={{fontFamily:'Montserrat-Bold',color:'#ffffff'}}> {state.message} </Text>
                    </View>
                    <View style={{height:130,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                        <View style={{width:'70%'}}>
                            <Button onPress={closeModal} rounded block style={styles.button} >
                                <Text style={{fontSize:20,fontFamily:'Montserrat-Black',color:'#ffffff'}}>OK</Text>
                            </Button>
                        </View>
                        
                    </View>
                    
                 </Dialog.Container>

                 <ImageBackground style={{width: '100%',flex:1,backgroundColor:'#5FB8B6'}} source={watermark} >

                 </ImageBackground>


        <View style={{flex:2,backgroundColor:'#ffffff',padding:20}}>
        <Card style={{elevation:10,height:550,bottom:170,borderRadius: 25 }}>
        <Content>
        <CardItem style={{ borderRadius: 25 }}>
    
         <KeyboardAvoidingView  keyboardVerticalOffset={Platform.select({ios: 0, android: 0})}  behavior={Platform.select({ android: 'padding', ios: 'padding' })} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> */}
                
            <SimpleAnimation  style={{width:'100%'}} distance={200} delay={100} duration={700} animate={true} direction="up" movementType="spring">
                
                <View> 
                    <Image  source={logo} style={{ height: 120,width: 120,alignSelf:'center'}}/> 
                </View>

               {state.fbLogin? <View> 
                                        <Item rounded style={styles.email}>
                                        <Icon style={{color:"#000000"}} type="MaterialIcons" name="mail"/>
                                        <Input style={styles.input} onChangeText={onChangeFbEmail}  value={state.fbData.email}   placeholderTextColor="#000000" placeholder='Email'/> 
                                        </Item>

                                        {state.isLoading?<Spinner color='#5FB8B6' />:<Button onPress={FBLogin} rounded block style={styles.button} >
                                        <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Proceed</Text>
                                        </Button>}

             
                                         <Text style={{marginTop:20,textAlign:'center',color:'#000000',fontSize:12,fontFamily:'Montserrat-Bold'}}>We Didn't get your email from Facebook  </Text>

                                  </View> 
                                  :<View> 

                                            <Item rounded style={styles.email}>
                                              <Icon style={{color:"#000000"}} type="MaterialIcons" name="mail"/>
                                              <Input style={styles.input} onChangeText={onChangeUsername}  value={credentials.username}   name="username" placeholderTextColor="#000000" placeholder='Email'/> 
                                            </Item>
 
                                            <Item rounded style={styles.password}>
                                              <Icon style={{color:"#000000"}} type="FontAwesome" name="key"/>
                                              <Input style={styles.input} onChangeText={onChangePassword} value={credentials.password}   name="password" secureTextEntry={true} placeholderTextColor="#000000" placeholder='Password'/>
                                            </Item>


                                            <Text onPress={() => props.navigation.navigate('ForgotPassword')} style={{marginTop:20,textAlign:'right',color:'#000000',fontSize:14,fontFamily:'Montserrat-Bold'}}>Forgot Password?</Text>


                                            {state.isLoading?<Spinner color='#5FB8B6' />:<Button onPress={SignIn} rounded block style={styles.button} >
                                            <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Sign In</Text>
                                            </Button>}

                                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:20,}}>
                                               <View style={{borderBottomColor: 'black',borderBottomWidth: 1,width:'30%'}}/>
                                               <Text style={{textAlign:'center',color:'#000000',fontSize:12,fontFamily:'Montserrat-Bold'}} > Or Login With </Text>
                                               <View style={{borderBottomColor: 'black',borderBottomWidth: 1,width:'30%'}}/>
                                            </View>



                                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                                <View style={{width:'48%'}}>
                                                    <Button rounded block onPress={FacebookLogin} iconRight style={styles.FBbutton}>
                                                
                                                            <Icon style={{color:"#355DA1",justifyContent:'center'}} type="FontAwesome" name="facebook-f"/>
                                                            <Text style={{color:'#000000',fontSize:12,fontFamily:'Montserrat-Bold'}}>FACEBOOK</Text>
                                                    
                                                    </Button>
                                                </View>

                                                <View style={{width:'48%'}}>
                                                    <Button rounded block iconRight onPress={GoogleLogin}  style={styles.GMbutton} >
                                                        <Icon style={{color:"#CE3630"}} type="Ionicons" name="logo-googleplus"/>
                                                        <Text style={{color:'#000000',fontSize:12,fontFamily:'Montserrat-Bold'}}>GOOGLE</Text>
                                                    </Button>
                                                </View>
                                            </View>

                                             <Text style={{marginTop:20,textAlign:'center',color:'#000000',fontSize:12,fontFamily:'Montserrat-Bold'}} onPress={() => props.navigation.navigate('Signup')} > Don't have an account? <Text style={{color:'#5FB8B6'}}>Sign Up</Text> </Text>

                                 </View>}

                        </SimpleAnimation>
                        {/* </View> */}
                    </KeyboardAvoidingView>
                
                </CardItem>
                </Content>
            </Card>
        </View>
        
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        error:state.auth.error,
        fbNewUser:state.auth.fbNewUser
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        login: (creds) => dispatch(login(creds)),
        clearMessage:()=>dispatch(clearMessage()),
        checkFacebookUser:(data)=>dispatch(checkFacebookUser(data)),
        googleLogin:(data)=>dispatch(googleLogin(data))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login)