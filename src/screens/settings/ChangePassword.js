import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View,Image,KeyboardAvoidingView,Platform,TouchableOpacity,ImageBackground  } from 'react-native';
import { Card, CardItem,Icon,Input,Item,Button,Content,Spinner,H1,H3 } from 'native-base';
import logo from '../../../assets/logo.png'
import { SimpleAnimation } from 'react-native-simple-animations';
import { connect } from 'react-redux'
import { changePassword, clearMessage } from '../../redux/actions/authActions'
import Dialog from "react-native-dialog";
import watermark from '../../../assets/watermark.png'

function ChangePassword(props){

    const [credentials,setCredentials] = useState({
        oldPassword:'',
        newPassword:'',
    })

    const [state,setState] = useState({
        isLoading:false,
        message:'',
        icon:'',
        modal:false,
        oldPasswordVisible:true,
        newPasswordVisible:true,
    })

    useEffect( ()=>{
       
        if(props.changePasswordError)
        {

            setState({...state,isLoading:false,modal:true,message:props.changePasswordError,icon:'close-circle'})
            props.clearMessage()
        }

        if(props.changePasswordSuccess)
        {
            setState({...state,isLoading:false,modal:true,message:'Password Changed Successfully',icon:'checkmark-circle'})
            props.clearMessage()
        }

     },[props.changePasswordSuccess,props.changePasswordError]) 

    const styles = StyleSheet.create({ 
        container:{
            flex:1
        },
        logoImage:{
            width: '50%',
            justifyContent:'center',
            alignItems:'center',
         
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
        input:{
            color:'#000000',
            fontSize:14,
            fontFamily:'Montserrat-Bold'
        }
    
    });


    const onChangeOldPassword= (text) => {
        setCredentials({...credentials,oldPassword:text})
    }
  
    const onChangeNewPassword= (text) => {
        setCredentials({...credentials,newPassword:text})
    }

    const onChangePassword = (e) => {
        setState({...state,isLoading:true})
       // console.log(props) 
        props.changePassword(credentials)
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

                   {/* <View style={{flex:1,backgroundColor:'#5FB8B6',height:180}}> */}
                   <ImageBackground style={{width: '100%',flex:1,backgroundColor:'#5FB8B6',height:180}} source={watermark} >
                         <View>
                             <TouchableOpacity onPress={()=>props.navigation.navigate('Settings')}>
                                     <View style={{flexDirection:'row',paddingLeft:15,paddingTop:15}}>
                                         <Icon style={{color:'#ffffff',fontSize:25}} type="Ionicons" name="arrow-round-back"/>
                                     </View> 
                             </TouchableOpacity>
                         </View>
                       
                                <View style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center',bottom:22}} >
                                    <H3 style={{fontFamily:'Montserrat-Black',color:'#ffffff'}}>CHANGE PASSWORD</H3>
                                </View> 
                    </ImageBackground>   
                    {/* </View> */}

                       <View style={{flex:2,backgroundColor:'#ffffff',padding:20}}>
                        <Card style={{elevation:10,height:400,bottom:130,borderRadius: 25 }}>
                        <Content>
                                <CardItem style={{ borderRadius: 25 }}>
                           
                                <KeyboardAvoidingView  keyboardVerticalOffset={Platform.select({ios: 0, android: 0})}  behavior={Platform.select({ android: 'padding', ios: 'padding' })} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    {/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> */}
                                    <SimpleAnimation  style={{width:'100%'}} distance={200} delay={100} duration={700} animate={true} direction="up" movementType="spring">
                                        <View> 
                                            <Image  source={logo} style={{ height: 120,width: 120,alignSelf:'center'}}/> 
                                        </View>

                                        <View> 

                                             
                                                <Item rounded style={styles.password}>
                                                    <Icon style={{color:"#000000"}} type="Ionicons" name="key"/>
                                                    <Input style={styles.input} onChangeText={onChangeOldPassword}   name="password" secureTextEntry={state.oldPasswordVisible} placeholderTextColor="#000000" placeholder='Old Password'/>
                                                    {state.oldPasswordVisible?<Icon  onPress={() => setState({...state,oldPasswordVisible:false})} style={{color:"#000000"}} type="Ionicons" name="eye"/>:<Icon onPress={() => setState({...state,passwordVisible:true})}  style={{color:"#000000"}} type="Ionicons" name="eye-off"/>}  
                                                </Item>

                                                <Item rounded style={styles.password}>
                                                    <Icon style={{color:"#000000"}} type="Ionicons" name="lock"/>
                                                    <Input style={styles.input} onChangeText={onChangeNewPassword} name="password" secureTextEntry={state.newPasswordVisible} placeholderTextColor="#000000" placeholder='New Password'/>
                                                    {state.newPasswordVisible?<Icon  onPress={() => setState({...state,newPasswordVisible:false})} style={{color:"#000000"}} type="Ionicons" name="eye"/>:<Icon onPress={() => setState({...state,newPasswordVisible:true})}  style={{color:"#000000"}} type="Ionicons" name="eye-off"/>}  
                                                </Item>

                                        
                                             {state.isLoading?<Spinner color='#5FB8B6' />:<Button onPress={onChangePassword} rounded block style={styles.button} >
                                                <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Change Password</Text>
                                             </Button>}

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
        changePasswordError:state.auth.changePasswordError,
        changePasswordSuccess:state.auth.changePasswordSuccess
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        changePassword: (creds) => dispatch(changePassword(creds)),
        clearMessage: () => dispatch(clearMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)