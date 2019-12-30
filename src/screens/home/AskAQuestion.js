import React, {useState,useEffect} from 'react'
import { StyleSheet, View,TouchableOpacity,Text,KeyboardAvoidingView } from 'react-native';
import { Card, CardItem,H3,Icon,Thumbnail,Textarea,Content,Button,Item,Input,Radio,Picker } from 'native-base'
import uuid from 'uuid/v1';
import image from '../../../assets/doctorImage.png'
import ImagePicker from 'react-native-image-picker';
import Dialog from "react-native-dialog";

function AskAQuestion(props){

    const [state,setState] = useState({
                question:'',
                images:[],
                modal:false,
                modal2:false,
                gender:'male',
                appType:'',
                age:0,
                message:'',
                weight:''
    })

    useEffect(()=>{
     
    },[])


    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        button:{
          
            backgroundColor:'#5FB8B6',
            height:30,
            width:'30%'
        },
        button2:{
            marginTop:20,
            backgroundColor:'#5FB8B6',
            height:50,
            width:'100%'
        },
    })

 
    const selectImage = () => {

        const options = {
            title: 'Select Medical Report or Other Image',
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
                        images: [...state.images,{key:uuid(),src:source,}]
                    })  
                
            }
          });
    }

    const attachments = state.images.length?(
            state.images.map(image => {
                    
                    return(
                        <View key={image.key} style={{flexDirection:'row'}}>
                              <Thumbnail style={{width:50,borderRadius:6,height:50,marginLeft:10}} square source={image.src} />
                              <Icon onPress={() => removeImage(image.key)} style={{fontSize:18,color:'#5FB8B6'}} type="Ionicons" name="close-circle"/>
                        </View>
                    )
            })
    ):null

    const closeModal = () => {
        setState({...state,modal:!state.modal})
    }
    const closeModal2 = () => {
        setState({...state,modal2:!state.modal2})
    }
    const removeImage = (key) => {

        var newImages = state.images.filter(image=>{
            return image.key !== key; 
          });
  
          setState((state)=>({
            ...state,
            images: newImages
          })
        )

    }

    const onChangeQuestion = (text) => {
        setState({...state,question:text})
    }
    
    const onChangeWeight = (text) => {
        setState({...state,weight:text})
    }
    const nextPage = () => {

        if(state.question=='')
        {
         
            setState({...state,message:'Please ask a question or write down any query about your disease.',modal2:true})

        }else if (state.weight==''){

            setState({...state,modal2:true,message:'Please enter your estimated weight.'})

        }else if (state.age==0){

            setState({...state,modal2:true,message:'Please select your age range.'})
        }else if (state.appType==''){

            setState({...state,modal2:true,message:'Please select appointment type.'})

        }
        else{

            const appointmentDetails = {
                                        question:state.question,
                                        appointemntType:state.appType,
                                        gender:state.gender,
                                        weight:state.weight,
                                        age:state.age
                                       }
            props.navigation.navigate('SelectAppointmentDate',{doctor:props.navigation.getParam('doctor'),appointemntType:state.appType,appointmentDetails:appointmentDetails})
        
        }
        
    }



    return (

        <View style={styles.container}>

                <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0}} footerStyle={{height:130}}   visible={state.modal}>
                 
                    <View style={{height:130,flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'#5FB8B6'}}>
                        <Icon style={{fontSize:60,color:'#ffffff'}} type="Ionicons" name="close-circle"/>
                        <Text style={{fontFamily:'Montserrat-Black',color:'#ffffff'}}>You can attach upto 5 images</Text>
                    </View>
                    <View style={{height:130,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                        <View style={{width:'70%'}}>
                            <Button onPress={closeModal} rounded block style={styles.button2} >
                                <Text style={{fontSize:20,fontFamily:'Montserrat-Black',color:'#ffffff'}}>OK</Text>
                            </Button>
                        </View>
                        
                    </View>
                 
                 </Dialog.Container>

                 <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0}} footerStyle={{height:130}}   visible={state.modal2}>
                 
                    <View style={{height:130,flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'#5FB8B6'}}>
                        <Icon style={{fontSize:60,color:'#ffffff'}} type="Ionicons" name="close-circle"/>
                        <Text style={{fontFamily:'Montserrat-Black',color:'#ffffff',padding:10}}>{state.message}</Text>
                    </View>
                    <View style={{height:130,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                        <View style={{width:'70%'}}>
                            <Button onPress={closeModal2} rounded block style={styles.button2} >
                                <Text style={{fontSize:20,fontFamily:'Montserrat-Black',color:'#ffffff'}}>OK</Text>
                            </Button>
                        </View>
                        
                    </View>
                
                 </Dialog.Container>

                <Content contentContainerStyle={{flexGrow:1}}>
                       <View style={{flex:1,backgroundColor:'#5FB8B6',height:180}}>
                         
                            <View>
                                <TouchableOpacity onPress={()=>props.navigation.navigate('Doctors')}>
                                        <View style={{flexDirection:'row',paddingLeft:15,paddingTop:15}}>
                                            <Icon style={{color:'#ffffff',fontSize:25}} type="Ionicons" name="arrow-round-back"/>
                                        </View> 
                                </TouchableOpacity>
                            </View>
                          
                            <View style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center',bottom:22}} >
                                <H3 style={{fontFamily:'Montserrat-Black',color:'#ffffff'}}>ASK A QUESTION</H3>
                            </View> 
                            
                       </View>
                       <View style={{flex:1,backgroundColor:'#ffffff',paddingLeft:20,paddingRight:20,height:150}}>
                     
                           <Card style={{elevation:8,height:200,borderRadius: 15,bottom:110 }}>
                            
                                    <CardItem   style={{ borderRadius: 15,flex:1,flexDirection:'column',justifyContent:'space-between' }}>
                                        <Thumbnail style={{borderColor:'#5FB8B6',borderWidth:2}} large source={image} />
                                        <H3 style={{fontFamily:'Montserrat-Bold'}}>{props.navigation.getParam('doctor').name} </H3>
                                        <Text style={{fontFamily:'Montserrat-Bold',fontSize:16,color:'#5FB8B6'}}>{props.navigation.getParam('doctor').category} </Text>
                                        <View style={{borderBottomColor: '#5FB8B6',borderBottomWidth: 1,width:'10%'}}/>
                                  
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'80%'}}>
                                         
                                          <View style={{flexDirection:'row',padding:0}}>
                                             <Icon style={{color:'#5FB8B6',fontSize:16,paddingLeft:10}} type="Ionicons" name="videocam"/>
                                             <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12}}>${props.navigation.getParam('doctor').videoHourlyRate}/hr</Text> 
                                          </View>

                                          <View style={{flexDirection:'row'}}>
                                            <Icon style={{color:'#5FB8B6',fontSize:16,paddingLeft:10}} type="Ionicons" name="call"/>
                                            <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12}}>${props.navigation.getParam('doctor').voiceHourlyRate}/hr</Text> 
                                          </View>

                                          <View style={{flexDirection:'row'}}>
                                            <Icon style={{color:'#5FB8B6',fontSize:16,paddingLeft:10}} type="Ionicons" name="chatboxes"/>
                                            <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12}}>${props.navigation.getParam('doctor').chatHourlyRate}/hr</Text> 
                                          </View>
                                       
                                        </View>

                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%'}}>
                                            <View style={{flexDirection:'row',width:'30%',justifyContent:'space-around',alignItems:'center'}}>
                                               <Icon style={{color:'#5FB8B6',fontSize:14,paddingLeft:15}} type="Ionicons" name="time"/>
                                               <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12}}>{props.navigation.getParam('doctor').startTime}</Text> 
                                            </View>
                                            <View style={{flexDirection:'row',width:'30%',justifyContent:'space-around'}}>
                                                <Text style={{fontFamily:'Montserrat-Bold',color:'#5FB8B6',fontSize:12}}>TO</Text> 
                                                <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12}}>{props.navigation.getParam('doctor').endTime}</Text> 
                                            </View>
                                        </View>
                                  
                                    </CardItem>
                             
                            </Card>
                          
                       </View>
                       <KeyboardAvoidingView style={{justifyContent:'space-between',flex:1,flexDirection:'column',paddingLeft:20,bottom:30,paddingRight:20,height:325}} keyboardVerticalOffset={Platform.select({ios: 0, android: -700})}  behavior="padding">
                       {/* <View style={{justifyContent:'space-between',flex:2,flexDirection:'column',bottom:50,paddingLeft:20,paddingRight:20}}> */}
                                       
                                
                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12}}>Your Question:</Text>
                                     
                                       <Textarea style={{borderRadius:10,borderColor:'#5FB8B6',borderWidth:2}} rowSpan={3} onChangeText={onChangeQuestion} />
                                      
                                        <View style={{flexDirection:'row',alignItems:'center'}}> 
                                           <Icon style={{color:'#5FB8B6',fontSize:16}} type="Ionicons" name="link"/>
                                           <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',paddingLeft:5,fontSize:12}}>Attach medical report and images: <Text style={{color:'#cccccc',fontSize:10}}>(Optional)</Text></Text>
                                        </View>

                                         <View style={{flexDirection:'row'}}> 
                                           <TouchableOpacity onPress={state.images.length<5?selectImage:closeModal}>
                                               <View style={{width:50,borderRadius:6,height:50,borderWidth:1,borderColor:'#5FB8B6',alignItems:'center',justifyContent:'center'}}>
                                               <Icon style={{color:'#5FB8B6',fontSize:32}} type="Ionicons" name="add"/>
                                               </View>
                                           </TouchableOpacity>
                                           {attachments}
                                        </View>

                                        {/* <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'space-around'}}> 
                                          
                                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12}}>Age: </Text>
                                                       <Item style={{borderColor:'#5FB8B6',width:'30%'}} >
                                                           <Input   />
                                                       </Item>
                                               
                                            
                                                   <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12}}>Weight: </Text>
                                                   <Item style={{borderColor:'#5FB8B6',width:'30%'}} >
                                                       <Input style={{fontSize:10,fontFamily:'Montserrat-Bold'}}  />
                                                   </Item>
                                             
                                        </View> */}
                                        <View style={{flexDirection:'row',alignItems:'center'}}> 
                                                
                                                <View style={{width:'50%',flexDirection:'row',alignItems:'center'}}>
                                                    <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12}}>Age: </Text>
                                                    <Item style={{borderColor:'#5FB8B6',width:'70%'}}>
                                                        <Picker
                                                        note
                                                        mode="dropdown"
                                                        style={{height:25}}
                                                        selectedValue={state.age}
                                                        onValueChange={(age)=>setState({...state,age:age})}
                                                        >
                                                        <Picker.Item label="0-10" value="0-10" />
                                                        <Picker.Item label="10-20" value="10-20" />
                                                        <Picker.Item label="20-30" value="20-30" />
                                                        <Picker.Item label="30-40" value="30-40" />
                                                        <Picker.Item label="40-50" value="40-50" />
                                                        <Picker.Item label="50-60" value="50-60" />
                                                        <Picker.Item label="60-70" value="60-70" />
                                                        <Picker.Item label="70-80" value="70-80" />
                                                        <Picker.Item label="80-90" value="80-90" />
                                                        <Picker.Item label="90-100" value="90-100" />
                                                        
                                                        </Picker>
                                                    </Item>
                                                </View>
                                                <View style={{width:'50%',flexDirection:'row',alignItems:'center'}}>
                                                  <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12}}>Weight: </Text>
                                                   <Item style={{borderColor:'#5FB8B6',width:'70%',height:25}} >
                                                       <Input onChangeText={onChangeWeight} style={{fontSize:10,fontFamily:'Montserrat-Bold'}}  />
                                                   </Item>
                                                </View>
                                            
                                             
                                        </View>

                                       <View style={{flexDirection:'row',alignItems:'center'}}> 

                                               <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12}}>Gender:</Text>
                                               <Radio
                                                   onPress={() => setState({...state, gender: 'male'})}
                                                   color={"#5FB8B6"}
                                                   selectedColor={"#5FB8B6"}
                                                   selected={state.gender == 'male'}
                                                   style={{paddingLeft:15}}
                                               />
                                               <Text onPress={() => setState({...state,gender: 'Female'})} style={{fontFamily:'Montserrat-Bold',color:'#000000',paddingLeft:5,fontSize:10}}>Male</Text>
                                               <Radio
                                                   onPress={() => setState({...state,gender: 'female'})}
                                                   color={"#5FB8B6"}
                                                   selectedColor={"#5FB8B6"}
                                                   selected={state.gender == 'female'}
                                                   style={{paddingLeft:15}}
                                               />
                                               <Text onPress={() => setState({...state,gender: 'Female'})} style={{fontFamily:'Montserrat-Bold',color:'#000000',paddingLeft:5,fontSize:10}}>Female</Text>
                                               <Radio
                                                   onPress={() => setState({...state,gender: 'other'})}
                                                   color={"#5FB8B6"}
                                                   selectedColor={"#5FB8B6"}
                                                   selected={state.gender == 'other'}
                                                   style={{paddingLeft:15}}
                                               />
                                               <Text onPress={() => setState({...state,gender: 'other'})} style={{color:'#000000',fontFamily: 'Montserrat-Bold',paddingLeft:5,fontSize:10}}>Other</Text>
                                        
                                         </View>

                                          <View style={{flexDirection:'row'}}> 

                                                   <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12}}>Appointment Type:</Text>
                                           
                                                  <TouchableOpacity onPress={()=>setState({...state,appType:'video'})}><Icon style={{color:state.appType=='video'?'#5FB8B6':'#000000',fontSize:22,paddingLeft:20}} type="Ionicons" name="videocam"/></TouchableOpacity> 
                                                  
                                                  <TouchableOpacity onPress={()=>setState({...state,appType:'voice'})}><Icon style={{color:state.appType=='voice'?'#5FB8B6':'#000000',fontSize:22,paddingLeft:30}} type="Ionicons" name="call"/></TouchableOpacity> 
                                                  
                                                  <TouchableOpacity onPress={()=>setState({...state,appType:'chat'})}><Icon style={{color:state.appType=='chat'?'#5FB8B6':'#000000',fontSize:22,paddingLeft:30}} type="Ionicons" name="chatboxes"/></TouchableOpacity> 
                                           
                                          </View>


                                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}> 
                                          <Button onPress={nextPage}  rounded block style={styles.button} >
                                             <Text style={{color:'#ffffff',fontSize:14,fontFamily:'Montserrat-Black'}}>Next</Text>
                                           </Button>
                                       </View> 

                               {/* </View> */}
                              </KeyboardAvoidingView>

                       </Content>
        </View>
    )
}

export default AskAQuestion