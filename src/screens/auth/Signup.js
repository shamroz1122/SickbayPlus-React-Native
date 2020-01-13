import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View,Image,KeyboardAvoidingView,Platform,SafeAreaView } from 'react-native';
import { Card, CardItem,Icon,Input,Item,Button,Content,Radio,Picker,Spinner } from 'native-base';
import logo from '../../../assets/logo.png'
import { SimpleAnimation } from 'react-native-simple-animations';
import { signUp, clearMessage } from '../../redux/actions/authActions'
import Dialog from "react-native-dialog";
import { connect } from 'react-redux'
import CountryPicker from 'react-native-country-picker-modal'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function Signup(props){ 
    const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
    const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

    const [credentials,setCredentials] = useState({
            name:'',
            email:'',
            phoneNumber:'',
            country:{},
            address:'',
            healthInsurance:'no',
            insurancePlan:0,
            password:'',
            password_confirmation:''
    })

    const [state,setState] = useState({
        next:1,
        countryCode:'',
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

    },[props.signUpError,props.isAuthenticated,props.user,props.error,props.fbData]) 


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

    const validateEmail = (email) =>{
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const allLetters = (inputtxt) => { 
        
      const letters = /^[A-Za-z ]+$/
      if(inputtxt.match(letters))
      {
         return true;
      }
      else
      {
          return false;
      }

    }

    const nextBtn = () => {
     
        if(credentials.name=='' || !allLetters(credentials.name))
        {
            setState({...state,modal:true,message:'Please Enter A Valid Full Name',icon:'close-circle'})
        }else if(credentials.email=='' || !validateEmail(credentials.email))
        {
            setState({...state,modal:true,message:'Please Enter A Valid Email Address',icon:'close-circle'})
        }else if(credentials.phoneNumber=='')
        {
            setState({...state,modal:true,message:'Please Enter Phone Number',icon:'close-circle'})
        }else if(state.countryCode=='')
        {
            setState({...state,modal:true,message:'Please Select Country',icon:'close-circle'})
        }else {
            setState({...state,next:1})
        }

    
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

        setCredentials({...credentials,[name]:value})
    }

    const onSignup = () => {

        if(credentials.address=='')
        {
            setState({...state,modal:true,message:'Please Enter Address',icon:'close-circle'})
        }else if(credentials.password=='')
        {
            setState({...state,modal:true,message:'Please Enter Password',icon:'close-circle'})
        }else if(credentials.password_confirmation=='')
        {
            setState({...state,modal:true,message:'Please Enter Confirm Password',icon:'close-circle'})
        }else if(credentials.password != credentials.password_confirmation)
        {
            setState({...state,modal:true,message:'Password Mismatch',icon:'close-circle'})
        }else if(credentials.healthInsurance=='yes' && credentials.insurancePlan==0)
        {
            setState({...state,modal:true,message:'Please Select Insurance Plan',icon:'close-circle'})
        
        }else if(credentials.password.length < 8)
        {
            setState({...state,modal:true,message:'The password must be at least 8 characters ',icon:'close-circle'})
        
        }else
        {
            setState({...state,isLoading:true})
            props.signUp(credentials)
        }

        
    }
    
    const closeModal = () => {
        setState({...state,modal:false})
    }

    const onSelectCountry = (Country) => {
        setState({...state,country:Country,countryCode:Country.cca2})

       // console.log(Country)

    }

    return (

        <View style={styles.container}>
      
           <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0}} footerStyle={{height:130}}   visible={state.modal}>
                
                
                <View style={{height:130,flexDirection:'column',padding:10,justifyContent:'space-around',alignItems:'center',backgroundColor:'#5FB8B6'}}>
                    <Icon style={{fontSize:60,color:'#ffffff'}} type="Ionicons" name={state.icon}/>
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
                                            <Input style={styles.input} keyboardType="" placeholderTextColor="#000000" onChangeText={(text)=>handleChange('name',text)} value={credentials.name} placeholder='Full Name'/> 
                                        </Item>

                                        <Item rounded style={styles.email}>
                                            <Icon style={{color:"#000000"}} type="MaterialIcons" name="mail"/>
                                            <Input style={styles.input} keyboardType="email-address"  placeholderTextColor="#000000" onChangeText={(text)=>handleChange('email',text)} value={credentials.email} placeholder='Email'/> 
                                        </Item>

                                        <Item rounded style={styles.email}>
                                            <Icon style={{color:"#000000"}} type="Ionicons" name="call"/>
                                            <Input keyboardType='phone-pad'  keyboardType="phone-pad" style={styles.input} onChangeText={(text)=>handleChange('phoneNumber',text)} value={credentials.phoneNumber} placeholderTextColor="#000000" placeholder='Phone Number'/> 
                                        </Item>

                                            <Item rounded style={{ height:50, marginTop:20,paddingLeft:10,
                                            backgroundColor:'#BFFEFE',
                                            borderColor: "#BFFEFE",
                                            onBackgroundTextColor: '#000000',
                                            opacity: 1,
                                            width:'100%'}}>
                                            {state.countryCode!=''?null:<Icon style={{color:"#000000"}} type="Ionicons" name="flag"/>}  
                                          
                                            <CountryPicker theme={{
                                                fontSize:14,
                                                fontFamily:'Montserrat-Bold'
                                                
                                            }} containerButtonStyle={{paddingLeft:4}} withAlphaFilter={true}  withFilter={true} withFlag={true} onSelect={onSelectCountry} withCountryNameButton={true} countryCode={state.countryCode}/>
                                            {/* <Input style={styles.input}  placeholderTextColor="#000000" onChangeText={(text)=>handleChange('country',text)} value={credentials.country} placeholder='Country'/>  */}
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
                                    {/* <Input  style={styles.input} onChangeText={(text)=>handleChange('address',text)} name="address" value={credentials.address}  placeholderTextColor="#000000" placeholder='Address'/>  */}
                              
                                    <GooglePlacesAutocomplete
                                        placeholder='Address'
                                        placeholderTextColor='#000000'
                                        minLength={2} // minimum length of text to search
                                        autoFocus={false}
                                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                                        listViewDisplayed='false'    // true/false/undefined
                                        fetchDetails={true}
                                     //   renderDescription={row => row.description} // custom description render
                                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                       //     console.log(data, details);
                                               handleChange('address',data.description)
                                        }}
                                        enablePoweredByContainer={false}
                                        value={credentials.address}
                                        getDefaultValue={() => credentials.address}
                                      
                                        query={{
                                            // available options: https://developers.google.com/places/web-service/autocomplete
                                            key: 'AIzaSyCc9MOpE2wArUTUcA67RHFfpI-BfIHrDCs',
                                            language: 'en', // language of the results
                                        //    types: '(cities)' // default: 'geocode'
                                        }}
                                        style={{borderColor:'#BFFEFE'}}
                                        styles={{
                                            textInputContainer: {
                                               width: '90%',
                                               backgroundColor:'#BFFEFE',
                                               height:50,
                                                
                                            },
                                            textInput: {
                                                marginLeft: 0,
                                                marginRight: 0,
                                                height: 38,
                                                color: '#000000',
                                                fontSize: 14,
                                                fontFamily:'Montserrat-Bold',
                                                backgroundColor:'#BFFEFE',
                                            },

                                            description: {
                                                fontFamily:'Montserrat-Bold'
                                            },

                                        }}

                                        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                                        currentLocationLabel="Current location"
                                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                        GoogleReverseGeocodingQuery={{
                                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                        }}
                                        GooglePlacesSearchQuery={{
                                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                            rankby: 'distance',
                                            type: 'cafe'
                                        }}
                                        
                                        GooglePlacesDetailsQuery={{
                                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                            fields: 'formatted_address',
                                        }}
                                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                                       
                           />
                        
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
                                            <Picker.Item label="Select Insurance" value={0} />
                                            <Picker.Item label="Individual" value={1} />
                                            <Picker.Item label="Proud Parents" value={2} />
                                            <Picker.Item label="Retirement Seeker" value={3} />
                                            <Picker.Item label="Investment Seeker" value={4} />
                                            
                                        </Picker>
                                </Item>:null }
                              

                                <Item rounded style={styles.password}>
                                    <Icon style={{color:"#000000"}} type="Ionicons" name="key"/>
                                    <Input style={styles.input}  onChangeText={(text)=>handleChange('password',text)} value={credentials.password}   name="password" secureTextEntry={state.passwordVisible} placeholderTextColor="#000000" placeholder='Password'/>
                                    {state.passwordVisible?<Icon  onPress={() => setState({...state,passwordVisible:false})} style={{color:"#000000"}} type="Ionicons" name="eye"/>:<Icon onPress={() => setState({...state,passwordVisible:true})}  style={{color:"#000000"}} type="Ionicons" name="eye-off"/>}  
                                </Item>

                                <Item rounded style={styles.password}>
                                    <Icon style={{color:"#000000"}} type="Ionicons" name="lock"/>
                                    <Input style={styles.input} onChangeText={(text)=>handleChange('password_confirmation',text)} value={credentials.password_confirmation}  name="password_confirmation" secureTextEntry={state.confirmPasswordVisible} placeholderTextColor="#000000" placeholder='Confirm Password'/>
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
