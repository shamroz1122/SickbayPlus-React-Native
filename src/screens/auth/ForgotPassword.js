import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View,Image,KeyboardAvoidingView,Platform  } from 'react-native';
import { Card, CardItem,Icon,Input,Item,Button,Content,Spinner } from 'native-base';
import logo from '../../../assets/logo.png'
import { SimpleAnimation } from 'react-native-simple-animations';
import { connect } from 'react-redux'
import { resetPassword, clearMessage } from '../../redux/actions/authActions'
import Dialog from "react-native-dialog";

function ForgotPassword(props){

    const [credentials,setCredentials] = useState({
        email:'',
    })
    const [state,setState] = useState({
        isLoading:false,
        message:'',
        icon:'',
        modal:false
    })

    useEffect( ()=>{
       
        if(props.resetPasswordError)
        {

            setState({...state,isLoading:false,modal:true,message:props.resetPasswordError,icon:'close-circle'})
            props.clearMessage()
        }

        if(props.resetPasswordSuccess)
        {
            setState({...state,isLoading:false,modal:true,message:'Please check your inbox',icon:'checkmark-circle'})
            props.clearMessage()
        }

     },[props.resetPasswordSuccess,props.resetPasswordError]) 

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
            marginTop:40,
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
    
    });


    const onChangeUsername = (text) => {
        setCredentials({...credentials,email:text})
    }
  
    const onResetPassword = (e) => {
        setState({...state,isLoading:true})
       // console.log(props) 
        props.resetPassword(credentials)
    }

    const closeModal = () => {
        setState({...state,modal:false})
    }

    return (

        <View style={styles.container}>
                <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0}} footerStyle={{height:130}}   visible={state.modal}>
                
                
                    <View style={{height:130,flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'#5FB8B6'}}>
                        <Icon style={{fontSize:60,color:'#ffffff'}} type="Ionicons" name={state.icon}/>
                        <Text style={{fontFamily:'Montserrat-Black',color:'#ffffff'}}> {state.message} </Text>
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
                        <Card style={{elevation:10,height:400,bottom:170,borderRadius: 25 }}>
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
                                                <Input style={styles.input} onChangeText={onChangeUsername}  value={credentials.username}  name="username" placeholderTextColor="#000000" placeholder='Email'/> 
                                             </Item>
                                        
                                             {state.isLoading?<Spinner color='#5FB8B6' />:<Button onPress={onResetPassword} rounded block style={styles.button} >
                                                <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Reset Password</Text>
                                             </Button>}

        
                                                 <Text style={{marginTop:20,textAlign:'center',color:'#000000',fontSize:12,fontFamily:'Montserrat-Bold'}} onPress={() => props.navigation.navigate('Login')}>Go back to <Text style={{color:'#5FB8B6'}}>Sign In</Text> </Text>
                                       
                                            
                                        </View>

                                       
                                        {/* </View> */}
                                     </SimpleAnimation>
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
        resetPasswordError:state.auth.resetPasswordError,
        resetPasswordSuccess:state.auth.resetPasswordSuccess
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        resetPassword: (creds) => dispatch(resetPassword(creds)),
        clearMessage: () => dispatch(clearMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)