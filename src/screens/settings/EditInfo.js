import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View,Image,KeyboardAvoidingView,Platform,TouchableOpacity} from 'react-native';
import { Card, CardItem,Icon,Input,Item,Button,Content,Radio,Picker,H3 } from 'native-base';
import profileImage from '../../../assets/dummy.png'
import { SimpleAnimation } from 'react-native-simple-animations';
import ImagePicker from 'react-native-image-picker';

function EditInfo(props){

    const [state,setState] =useState({
        next:0,
        passwordVisible:true,
        confirmPasswordVisible:true,
        insurance:'no',
        insurancePlan:0,
        profileImage:''
    
    })

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
        setState({...state,insurance:insurance})
    }

    const onChangeInsurance = (insurance) => {
        setState({...state,insurancePlan:insurance})
    }

    const onSignup = () => {
        console.log('hello')
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
                        profileImage: source
                    })  
                
            }
          });
    }

    return (

        <View style={styles.container}>
      
           <View style={{flex:1,backgroundColor:'#5FB8B6',height:180}}>
                         
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
                         
            </View>

            <View style={{flex:2,backgroundColor:'#ffffff',padding:20}}>
            <Card style={{elevation:10,height:500,bottom:130,borderRadius: 25 }}>
          
              <CardItem style={{ borderRadius: 25,height:500 }}>
              <Content> 
                    <KeyboardAvoidingView  keyboardVerticalOffset={Platform.select({ios: 0, android:0})}  behavior={Platform.select({ android: 'padding', ios: 'padding' })} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                       
                        {/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> */}
                          <TouchableOpacity onPress={selectImage}>
                            <View> 
                                <Image  source={state.profileImage!=''?state.profileImage:profileImage} style={{borderColor:'#5FB8B6',borderWidth:2,borderRadius:60,height: 120,width: 120,alignSelf:'center'}} /> 
                            </View>
                          </TouchableOpacity>
                  

                            {
                                state.next==0? 
                                <SimpleAnimation style={{width:'100%'}} distance={200} delay={50} duration={500} animateOnUpdate={true} direction="up" movementType="spring">
                                     <View> 
                                     

                                        <Item rounded style={styles.email}>
                                            <Icon style={{color:"#000000"}} type="Ionicons" name="contact"/>
                                            <Input style={styles.input}  placeholderTextColor="#000000" placeholder='Full Name'/> 
                                        </Item>

                                        <Item rounded style={styles.email}>
                                            <Icon style={{color:"#000000"}} type="MaterialIcons" name="mail"/>
                                            <Input style={styles.input}   placeholderTextColor="#000000" placeholder='Email'/> 
                                        </Item>

                                        <Item rounded style={styles.email}>
                                            <Icon style={{color:"#000000"}} type="Ionicons" name="call"/>
                                            <Input keyboardType='phone-pad' style={styles.input}   placeholderTextColor="#000000" placeholder='Phone Number'/> 
                                        </Item>

                                        <Button onPress={nextBtn} rounded block style={styles.button} >
                                            <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Next</Text>
                                        </Button>

                                     </View>
                             </SimpleAnimation>
                       :
                        
                                <SimpleAnimation style={{width:'100%'}} distance={200} delay={50} duration={500} useNativeDriver={true} animateOnUpdate={true} direction="left" movementType="spring">
                            <View> 
                              
                                <Item rounded style={styles.email}>
                                            <Icon style={{color:"#000000"}} type="Ionicons" name="flag"/>
                                            <Input style={styles.input}  placeholderTextColor="#000000" placeholder='Country'/> 
                                </Item>

                                <Item rounded style={styles.email}>
                                    <Icon style={{color:"#000000"}} type="Ionicons" name="pin"/>
                                    <Input  style={styles.input}  placeholderTextColor="#000000" placeholder='Address'/> 
                                </Item>

                                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:20}}>
                                    <Text style={{fontSize:14,fontFamily:'Montserrat-Bold',color:'#000000'}}> Health Insurance </Text>
                                    <Radio
                                        color={"#5FB8B6"}
                                        selectedColor={"#5FB8B6"}
                                        selected={state.insurance=='yes'?true:false}
                                        onPress={() => insurance('yes')}
                                    />
                                    <Text style={{fontSize:14,fontFamily:'Montserrat-Bold',color:'#000000'}}> Yes </Text>
                                    <Radio
                                        color={"#5FB8B6"}
                                        selectedColor={"#5FB8B6"}
                                        selected={state.insurance=='no'?true:false}
                                        onPress={() => insurance('no')}
                                    />
                                    <Text style={{fontSize:14,fontFamily:'Montserrat-Bold',color:'#000000'}}> No </Text>

                                </View>

                                 {state.insurance=='yes'? <Item rounded picker style={{backgroundColor:'#BFFEFE',justifyContent:'center',marginTop:20}}>
                                 <Icon style={{color:"#000000"}} type="Ionicons" name="medkit"/>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={ <Icon style={{color:'#000000'}} name="arrow-down" />}
                                            style={styles.pickerColor}
                                            placeholder="Select Insurance"
                                            placeholderStyle={{ color: "#000000",fontFamily:'Montserrat-Bold' }}
                                            placeholderIconColor="#000000"
                                            selectedValue={state.insurancePlan}
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
                              
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                        <View style={{width:'49%'}}>
                                            <Button onPress={backBtn} rounded block  style={styles.button}>
                                                    <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Back</Text>
                                            </Button>
                                        </View>

                                        <View style={{width:'49%'}}>
                                                <Button rounded block iconRight onPress={onSignup}  style={styles.button} >
                                                <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Save</Text>
                                            </Button>
                                        </View>
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



export default EditInfo