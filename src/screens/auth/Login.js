import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View,Image,KeyboardAvoidingView,Platform  } from 'react-native';
import { Card, CardItem,Icon,Input,Item,Button,Content,Spinner } from 'native-base';
import logo from '../../../assets/logo.png'
import { SimpleAnimation } from 'react-native-simple-animations';
import { connect } from 'react-redux'
import { login, clearMessage } from '../../redux/actions/authActions'
import Dialog from "react-native-dialog";


function Login(props){

    const [credentials,setCredentials] = useState({
        email:'',
        password:'' 
    })


    const [state,setState] = useState({
        isLoading:false,
        modal:false
    })

    useEffect( ()=>{
       
            if (props.isAuthenticated) {
                setState({...state,isLoading:false})
                props.navigation.navigate('App'); // push user to dashboard when they login
            }

            if(props.authError)
            {

                setState({...state,isLoading:false,modal:true})
                props.clearMessage()
            }

    },[props.authError,props.isAuthenticated,props.user,props.error]) 



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

    const SignIn = () => {
       
        setState({...state,isLoading:true})
        props.login(credentials)
    }

    const onChangeUsername = (text) => {
        setCredentials({...credentials,email:text})
    }

    const onChangePassword = (text) => {
        setCredentials({...credentials,password:text})
    }
    const closeModal = () => {
        setState({...state,modal:false})
    }


    return (

        <View style={styles.container}>

                 <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0}} footerStyle={{height:130}}   visible={state.modal}>
                 
                    <View style={{height:130,flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'#5FB8B6'}}>
                        <Icon style={{fontSize:60,color:'#ffffff'}} type="Ionicons" name="close-circle"/>
                        <Text style={{fontFamily:'Montserrat-Black',color:'#ffffff'}}>Invalid Email Or Password</Text>
                    </View>
                    <View style={{height:130,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                        <View style={{width:'70%'}}>
                            <Button onPress={closeModal} rounded block style={styles.button} >
                                <Text style={{fontSize:20,fontFamily:'Montserrat-Black',color:'#ffffff'}}>OK</Text>
                            </Button>
                        </View>
                        
                    </View>
                    
                 </Dialog.Container>

        <View style={{flex:1,backgroundColor:'#5FB8B6'}}>

        </View>
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

                <View> 

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
                                <Button rounded block iconRight style={styles.FBbutton}>
                            
                                        <Icon style={{color:"#355DA1",justifyContent:'center'}} type="FontAwesome" name="facebook-f"/>
                                        <Text style={{color:'#000000',fontSize:12,fontFamily:'Montserrat-Bold'}}>FACEBOOK</Text>
                                
                                </Button>
                            </View>

                            <View style={{width:'48%'}}>
                                    <Button rounded block iconRight  style={styles.GMbutton} >
                                    <Icon style={{color:"#CE3630"}} type="Ionicons" name="logo-googleplus"/>
                                    <Text style={{color:'#000000',fontSize:12,fontFamily:'Montserrat-Bold'}}>GOOGLE</Text>
                                </Button>
                            </View>
                    </View>

                            <Text style={{marginTop:20,textAlign:'center',color:'#000000',fontSize:12,fontFamily:'Montserrat-Bold'}} onPress={() => props.navigation.navigate('Signup')} >If you don't have any account? <Text style={{color:'#5FB8B6'}}>Sign Up</Text> </Text>
                
                </View>

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
        error:state.auth.error
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        login: (creds) => dispatch(login(creds)),
        clearMessage:()=>dispatch(clearMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)