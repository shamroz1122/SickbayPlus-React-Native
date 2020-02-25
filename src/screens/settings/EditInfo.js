import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View,Image,KeyboardAvoidingView,Platform,TouchableOpacity,ImageBackground} from 'react-native';
import { Card, CardItem,Icon,Input,Item,Button,Content,Radio,Picker,H3,Spinner } from 'native-base';
import profileImage from '../../../assets/dummy.png'
import { SimpleAnimation } from 'react-native-simple-animations';
import ImagePicker from 'react-native-image-picker';
import watermark from '../../../assets/watermark.png'
import CountryPicker from 'react-native-country-picker-modal'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Dialog from "react-native-dialog";
import { editInfo, clearMessage } from '../../redux/actions/authActions'
import { connect } from 'react-redux'
import momentTZ from 'moment-timezone';
import RNPicker from "rn-modal-picker";

function EditInfo(props){

    
        const [credentials,setCredentials] = useState({
                name:'',
                email:'',
                phoneNumber:'',
                country:{},
                address:'',
                healthInsurance:'no',
                insurancePlan:0,
                password:'',
                image:'',
                timezone:''
        })

        const [state,setState] = useState({
            next:0,
            countryCode:'',
            passwordVisible:true,
            isLoading:false,
            message:'',
            icon:'',
            modal:false,
            profileImage:profileImage,
            serverImage:false,
            placeHolderText: "",
            selectTimeZone:''
            
        })

        useEffect( ()=>{
            
            if (props.isUpdated) {
                setState({...state,isLoading:false,modal:true,message:'Information Updated Successfully.',icon:'checkmark-circle'})
                props.clearMessage()
            }else{
              

                setCredentials((credentials) => ({
                    ...credentials,
                    name:props.user.name,
                    email:props.user.email,
                    phoneNumber:props.user.phone,
                    address:props.user.address,
                    healthInsurance:props.user.health_insurance,
                    insurancePlan: Number(props.user.insurance_plan),
                    password:props.user.plain_pass,
                    country:props.user.country_object,
                    timezone:props.user.timezone==null?'':props.user.timezone
                }))

                setState((state) => ({
                    ...state,
                    countryCode:props.user.country_code,
                    profileImage:props.user.image,
                    serverImage:true,
                    placeHolderText:props.user.timezone==null?"Select Timezone":props.user.timezone
                }))

            }
    
            if(props.updateError)
            {
                setState({...state,isLoading:false,modal:true,message:props.updateError,icon:'close-circle'})
                props.clearMessage()
            }
    
        },[props.updateError,props.isUpdated,props.user]) 


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
        },

        searchBarContainerStyle: {
            marginBottom: 10,
            flexDirection: "row",
            height: 40,
            shadowOpacity: 1.0,
            shadowRadius: 5,
            shadowOffset: {
              width: 1,
              height: 1
            },
            backgroundColor: "rgba(255,255,255,1)",
            shadowColor: "#d3d3d3",
            borderRadius: 10,
            elevation: 3,
            marginLeft: 10,
            marginRight: 10,
            fontFamily:'Montserrat-Bold',
          },
        
          selectLabelTextStyle: {
            color: "#000",
            textAlign: "left",
            width: "99%",
            padding: 15,
            flexDirection: "row",
            fontFamily:'Montserrat-Bold',
          },

          placeHolderTextStyle: {
            color: "#000000",
            padding: 15,
            width:'99%',
            flexDirection: "row",
            fontFamily:'Montserrat-Bold',
          },
        //   dropDownImageStyle: {
        //     marginLeft: 10,
        //     width: 10,
        //     height: 10,
        //     alignSelf: "center"
        //   },
          listTextViewStyle: {
            color: "#000",
            marginVertical: 10,
            flex: 0.9,
            marginLeft: 20,
            marginHorizontal: 10,
            textAlign: "left",
            fontFamily:'Montserrat-Bold',
          },

          pickerStyle: {
            fontFamily:'Montserrat-Bold',
            color:'#000000',
            flexDirection: "row",
      
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

    
      }

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

    const onEdit = () => {

        if(credentials.address=='')
        {
            setState({...state,modal:true,message:'Please Enter Address',icon:'close-circle'})
        }else if(credentials.timezone=='')
        {
            setState({...state,modal:true,message:'Please Select Timezone',icon:'close-circle'})
        }else if(credentials.password=='')
        {
            setState({...state,modal:true,message:'Please Enter Password',icon:'close-circle'})
        }else if(credentials.password_confirmation=='')
        {
            setState({...state,modal:true,message:'Please Enter Confirm Password',icon:'close-circle'})
        }else if(credentials.healthInsurance=='yes' && credentials.insurancePlan==0)
        {
            setState({...state,modal:true,message:'Please Select Insurance Plan',icon:'close-circle'})
        
        }else if(credentials.password.length < 8)
        {
            setState({...state,modal:true,message:'The password must be at least 8 characters ',icon:'close-circle'})
        
        }else
        {
         
            setState({...state,isLoading:true})
            props.editInfo(credentials)
        }

        
    }
    
    const closeModal = () => {
        setState({...state,modal:false})
    }

    const onSelectCountry = (Country) => {

        setCredentials({...credentials,country:JSON.stringify(Country)})

        setState({...state,countryCode:Country.cca2})

    }

    const selectImage = () => {

        const options = {
            title: 'Select Profile Image',
            mediaType:'photo',
            tintColor:'#5FB8B6',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };


        ImagePicker.showImagePicker(options, (response) => {
           // console.log('Response = ', response);
          
            if (response.didCancel) {
           //   console.log('User cancelled image picker');
            } else if (response.error) {
           //   console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
           //   console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri }
            
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              
                    setState({
                        ...state,
                        profileImage: source,
                        serverImage:false
                    })  
                    setCredentials({...credentials,image:response.data})
            }
          })
        }

        var time_zones =  momentTZ.tz.names()

        time_zones = time_zones.map((str, index) =>{

                var timezoneName = str.split('/')
                var newTimezoneName =  timezoneName[1]+' '+'('+str+ ')'

                if(timezoneName[1]!=undefined)
                {
                    return { name: newTimezoneName, id: index + 1, value:str }
                }else{
                    return { name: str, id: index + 1, value:str }
                }
        
            
        } );

        const selectedValue = (index, item) => {
            setCredentials({...credentials, timezone: item.value });
            setState({...state, selectTimeZone: item.name });
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
                             <H3 style={{fontFamily:'Montserrat-Black',color:'#ffffff'}}>EDIT INFO</H3>
                         </View> 
                    </ImageBackground>
            {/* </View> */}

            <View style={{flex:2,backgroundColor:'#ffffff',padding:20}}>
            <Card style={{elevation:10,height:500,bottom:130,borderRadius: 25 }}>
          
              <CardItem style={{ borderRadius: 25,height:500 }}>
              <Content> 
                    <KeyboardAvoidingView  keyboardVerticalOffset={Platform.select({ios: 0, android:0})}  behavior={Platform.select({ android: 'padding', ios: 'padding' })} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                       
                        {/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> */}
                          <TouchableOpacity onPress={selectImage}>
                                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'flex-end'}}> 
                                    <Image source={ state.serverImage==false?state.profileImage:{uri: state.profileImage} } style={{borderColor:'#5FB8B6',borderWidth:2,borderRadius:60,height: 120,width: 120,alignSelf:'center'}} /> 
                                    <Icon style={{color:"#5FB8B6",fontSize:22,marginRight:10,bottom:22}} type="Ionicons" name="camera"/>

                                </View>
                          </TouchableOpacity>
                  

                          {
                                state.next==0? 
                                <SimpleAnimation style={{width:'100%',bottom:22}} distance={200} delay={50} duration={500} animate={true} direction="up" movementType="spring">
                                     <View> 
                                      
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
                                            {state.countryCode!='' || props.user.country_code?null:<Icon style={{color:"#000000"}} type="Ionicons" name="flag"/>}  
                                          
                                            <CountryPicker theme={{
                                                fontSize:14,
                                                fontFamily:'Montserrat-Bold'
                                                
                                            }} containerButtonStyle={{paddingLeft:4}} withAlphaFilter={true}  withFilter={true} withFlag={true} onSelect={onSelectCountry} withCountryNameButton={true} countryCode={state.countryCode}/>
                                            {/* <Input style={styles.input}  placeholderTextColor="#000000" onChangeText={(text)=>handleChange('country',text)} value={credentials.country} placeholder='Country'/>  */}
                                        </Item>

                                        <Button onPress={nextBtn} rounded block style={styles.button} >
                                            <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Next</Text>
                                        </Button>

                                       
                                     </View>
                             </SimpleAnimation>
                       :
                        
                          <SimpleAnimation style={{width:'100%',bottom:22}} distance={200} delay={50} duration={500} useNativeDriver={true} animate={true} direction="left" movementType="spring">
                            <View> 
                             
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
                               
                                <Item rounded picker style={{backgroundColor:'#BFFEFE',justifyContent:'center',marginTop:20}}>
                                    <Icon style={{color:"#000000",marginLeft:50}} type="Ionicons" name="globe"/>
                                    <RNPicker
                                        dataSource={time_zones}
                                        dummyDataSource={time_zones}
                                        defaultValue={false}
                                        pickerTitle={"Select Timezone"}
                                        showSearchBar={true}
                                        disablePicker={false}
                                        changeAnimation={"none"}
                                        searchBarPlaceHolder={"Search By City or Capital..."}
                                        showPickerTitle={true}
                                        searchBarContainerStyle={styles.searchBarContainerStyle}
                                        pickerStyle={styles.pickerStyle}
                                        pickerItemTextStyle={styles.listTextViewStyle}
                                        selectedLabel={state.selectTimeZone}
                                        placeHolderLabel={state.placeHolderText}
                                        selectLabelTextStyle={styles.selectLabelTextStyle}
                                        placeHolderTextStyle={styles.placeHolderTextStyle}
                                        selectedValue={(index, item) => selectedValue(index, item)}
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

                        
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                           {state.isLoading?null: <View style={{width:'49%'}}>
                                                <Button onPress={backBtn} rounded block  style={styles.button}>
                                                        <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Back</Text>
                                                    </Button> 
                                            </View>}

                                        {state.isLoading?null:<View style={{width:'49%'}}>
                                               <Button  rounded block iconRight onPress={onEdit}  style={styles.button} >
                                                <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Update</Text>
                                            </Button> 
                                        </View>}

                                        {state.isLoading?<View style={{width:'100%'}}><Spinner color='#5FB8B6' /></View> :null}
                                </View>

                              
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
        isUpdated: state.auth.isUpdated,
        user: state.auth.user,
        updateError:state.auth.updateError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editInfo: (creds) => dispatch(editInfo(creds)),
        clearMessage:()=>dispatch(clearMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInfo)