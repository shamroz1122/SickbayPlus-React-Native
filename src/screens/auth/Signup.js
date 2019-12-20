import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View,Image,KeyboardAvoidingView,Platform} from 'react-native';
import { Card, CardItem,Icon,Input,Item,Button,Content,Radio,Picker,Spinner } from 'native-base';
import logo from '../../../assets/logo.png'
import { SimpleAnimation } from 'react-native-simple-animations';
import { signUp, clearMessage } from '../../redux/actions/authActions'
import Dialog from "react-native-dialog";
import { connect } from 'react-redux'

function Signup(props){

    const [credentials,setCredentials] = useState({
            fullName:'',
            email:'',
            phoneNumber:'',
            country:'',
            address:'',
            healthInsurance:'no',
            insurancePlan:0,
            password:'',
            confirm_password:''
    })

    const [state,setState] = useState({
        next:0,
        passwordVisible:true,
        confirmPasswordVisible:true,
        isLoading:false,
        message:'',
        icon:'',
        modal:false
    })

    useEffect( ()=>{
       
        if (props.isAuthenticated) {
            setState({...state,isLoading:false})
            props.navigation.navigate('App'); // push user to dashboard when they login
        }

        if(props.signUpError)
        {
            setState({...state,isLoading:false,modal:true,message:props.signUpError,icon:'close-circle'})
            props.clearMessage()
        }

    },[props.signUpError,props.isAuthenticated,props.user,props.error]) 


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
        },
        pickerColor:{
            ...Platform.select({
                ios: {
                   
                  //  width: '100%',
                    justifyContent:'space-between'
                },
                android: {
                    width: undefined,
                    color:'#000000',
                    fontFamily:'Montserrat-Bold',
                   
                
                },
              }),
        }
    
    });

    const nextBtn = () => {
     
        setState({...state,next:1})
      };

    const backBtn = () => {

        setState({...state,next:0})
    }

    const insurance = (insurance) => {
        setCredentials({...credentials,healthInsurance:insurance})
    }

    const onChangeInsurance = (insurance) => {

        setCredentials({...credentials,insurancePlan:insurance})

    }

    const handleChange = (name,value) => {

        setCredentials({...credentials,name:value})
    }

    const onSignup = () => {

        setState({...state,isLoading:true})
        props.signUp(credentials)
        
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
            <Card style={{elevation:10,height:550,bottom:170,borderRadius: 25 }}>
          
              <CardItem style={{ borderRadius: 25,height:550 }}>
              <Content> 
                    <KeyboardAvoidingView  keyboardVerticalOffset={Platform.select({ios: 0, android:0})}  behavior={Platform.select({ android: 'padding', ios: 'padding' })} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        {/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> */}
                            
                            {
                                state.next==0? 
                                <SimpleAnimation style={{width:'100%'}} distance={200} delay={50} duration={500} animate={true} direction="up" movementType="spring">
                                     <View> 
                                        <View> 
                                            <Image  source={logo} style={{ height: 120,width: 120,alignSelf:'center'}} /> 
                                        </View>

                                        <Item rounded style={styles.email}>
                                            <Icon style={{color:"#000000"}} type="Ionicons" name="contact"/>
                                            <Input style={styles.input}  placeholderTextColor="#000000" onChangeText={(text)=>handleChange('fullName',text)} placeholder='Full Name'/> 
                                        </Item>

                                        <Item rounded style={styles.email}>
                                            <Icon style={{color:"#000000"}} type="MaterialIcons" name="mail"/>
                                            <Input style={styles.input}   placeholderTextColor="#000000" onChangeText={(text)=>handleChange('email',text)} placeholder='Email'/> 
                                        </Item>

                                        <Item rounded style={styles.email}>
                                            <Icon style={{color:"#000000"}} type="Ionicons" name="call"/>
                                            <Input keyboardType='phone-pad' style={styles.input} onChangeText={(text)=>handleChange('phoneNumber',text)} placeholderTextColor="#000000" placeholder='Phone Number'/> 
                                        </Item>

                                        <Item rounded style={styles.email}>
                                            <Icon style={{color:"#000000"}} type="Ionicons" name="flag"/>
                                            <Input style={styles.input}  placeholderTextColor="#000000" onChangeText={(text)=>handleChange('country',text)}  placeholder='Country'/> 
                                        </Item>

                                        <Button onPress={nextBtn} rounded block style={styles.button} >
                                            <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Next</Text>
                                        </Button>

                                        <Text style={{marginTop:20,textAlign:'center',color:'#000000',fontSize:12,fontFamily:'Montserrat-Bold'}} onPress={() => props.navigation.navigate('Login')}>Have an account? <Text style={{color:'#5FB8B6'}}>Sign In</Text> </Text>

                                     </View>
                             </SimpleAnimation>
                       :
                        
                          <SimpleAnimation style={{width:'100%'}} distance={200} delay={50} duration={500} useNativeDriver={true} animate={true} direction="left" movementType="spring">
                            <View> 
                                <View style={{flexDirection:'row',justifyContent:'center'}}> 
                                    <Image  source={logo} style={{ height: 120,width: 120,alignSelf:"center"}} /> 
                                </View>

                                <Item rounded style={styles.email}>
                                    <Icon style={{color:"#000000"}} type="Ionicons" name="pin"/>
                                    <Input  style={styles.input} onChangeText={(text)=>handleChange('address',text)}   name="address"  placeholderTextColor="#000000" placeholder='Address'/> 
                                </Item>

                                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:20}}>
                                    <Text style={{fontSize:14,fontFamily:'Montserrat-Bold',color:'#000000'}}> Health Insurance </Text>
                                    <Radio
                                        color={"#5FB8B6"}
                                        selectedColor={"#5FB8B6"}
                                        selected={credentials.healthInsurance=='yes'?true:false}
                                        onPress={() => insurance('yes')}
                                    />
                                    <Text style={{fontSize:14,fontFamily:'Montserrat-Bold',color:'#000000'}}> Yes </Text>
                                    <Radio
                                        color={"#5FB8B6"}
                                        selectedColor={"#5FB8B6"}
                                        selected={credentials.healthInsurance=='no'?true:false}
                                        onPress={() => insurance('no')}
                                    />
                                    <Text style={{fontSize:14,fontFamily:'Montserrat-Bold',color:'#000000'}}> No </Text>

                                </View>

                                 {credentials.healthInsurance=='yes'? <Item rounded picker style={{backgroundColor:'#BFFEFE',justifyContent:'center',marginTop:20}}>
                                 <Icon style={{color:"#000000"}} type="Ionicons" name="medkit"/>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={ <Icon style={{color:'#000000'}} name="arrow-down" />}
                                            style={styles.pickerColor}
                                            placeholder="Select Insurance"
                                            placeholderStyle={{ color: "#000000",fontFamily:'Montserrat-Bold' }}
                                            placeholderIconColor="#000000"
                                            selectedValue={credentials.insurancePlan}
                                            onValueChange={(value) => onChangeInsurance(value)} 
                                            textStyle={{color:'#000000',fontFamily:'Montserrat-Bold'}}
                                        >
                                            <Picker.Item label="Select Insurance" value="0" />
                                            <Picker.Item label="Individual" value="1" />
                                            <Picker.Item label="Proud Parents" value="2" />
                                            <Picker.Item label="Retirement Seeker" value="3" />
                                            <Picker.Item label="Investment Seeker" value="4" />
                                            
                                        </Picker>
                                </Item>:null }
                              

                                <Item rounded style={styles.password}>
                                    <Icon style={{color:"#000000"}} type="Ionicons" name="key"/>
                                    <Input style={styles.input}  onChangeText={(text)=>handleChange('password',text)}   name="password" secureTextEntry={state.passwordVisible} placeholderTextColor="#000000" placeholder='Password'/>
                                    {state.passwordVisible?<Icon  onPress={() => setState({...state,passwordVisible:false})} style={{color:"#000000"}} type="Ionicons" name="eye"/>:<Icon onPress={() => setState({...state,passwordVisible:true})}  style={{color:"#000000"}} type="Ionicons" name="eye-off"/>}  
                                </Item>

                                <Item rounded style={styles.password}>
                                    <Icon style={{color:"#000000"}} type="Ionicons" name="lock"/>
                                    <Input style={styles.input} onChangeText={(text)=>handleChange('confirm_password',text)} name="confirm_password" secureTextEntry={state.confirmPasswordVisible} placeholderTextColor="#000000" placeholder='Confirm Password'/>
                                    {state.confirmPasswordVisible?<Icon  onPress={() => setState({...state,confirmPasswordVisible:false})} style={{color:"#000000"}} type="Ionicons" name="eye"/>:<Icon onPress={() => setState({...state,confirmPasswordVisible:true})}  style={{color:"#000000"}} type="Ionicons" name="eye-off"/>}  
                                </Item>

                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                           {state.isLoading?null: <View style={{width:'49%'}}>
                                                <Button onPress={backBtn} rounded block  style={styles.button}>
                                                        <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Back</Text>
                                                    </Button> 
                                            </View>}

                                        {state.isLoading?null:<View style={{width:'49%'}}>
                                               <Button onPress={onSignup} rounded block iconRight onPress={onSignup}  style={styles.button} >
                                                <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Sign Up</Text>
                                            </Button> 
                                        </View>}

                                        {state.isLoading?<View style={{width:'100%'}}><Spinner color='#5FB8B6' /></View> :null}
                                </View>

                                 <Text style={{marginTop:20,textAlign:'center',color:'#000000',fontSize:12,fontFamily:'Montserrat-Bold'}} onPress={() => props.navigation.navigate('Login')}>Have an account? <Text style={{color:'#5FB8B6'}}>Sign In</Text> </Text>
                        
                                </View>
                            </SimpleAnimation>
                            }
                            
            
                            {/* </View> */}
                        </KeyboardAvoidingView>
                        </Content>
                    </CardItem>
                
                </Card>
            </View>
        
        </View>
    )
}



const mapStateToProps = (state) => {
    return {
        signUpError: state.auth.signUpError,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        error:state.auth.error
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        signUp: (creds) => dispatch(signUp(creds)),
        clearMessage:()=>dispatch(clearMessage())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
