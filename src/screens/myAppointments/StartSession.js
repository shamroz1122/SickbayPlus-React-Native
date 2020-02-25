import React,{useEffect,useState} from 'react'
import { View, Text,StyleSheet,Image,TouchableOpacity,Platform,PermissionsAndroid,Linking } from 'react-native'
import { GiftedChat,Send,Bubble,MessageText  } from 'react-native-gifted-chat'
import {Thumbnail,Icon,Button,Textarea} from 'native-base';
import { connect } from 'react-redux'
import image from '../../../assets/dummy.png'
import loader from '../../../assets/loader.gif'
import logo from '../../../assets/logo.png'
import { sendMessage,appendNotificationMessage,uploadChatHistory,clearMsgCheck,updateAppointmentStatus,doctorRatings } from '../../redux/actions/appointmentActions'
import CountDown from 'react-native-countdown-component';
import moment from 'moment'
import Dialog from "react-native-dialog";
import TwilioVoice from 'react-native-twilio-programmable-voice'
import Spinner from 'react-native-loading-spinner-overlay';
// import TwilioVideoCall from './TwilioVideoCall'
import StarRating from 'react-native-star-rating'


const StartSession = (props) => {

    const [state,setState] = useState({
        messages: [
            // {
            //   _id: 1,
            //   text: 'Hello developer',
            //   createdAt: new Date(),
            //   user: {
            //     _id: 1,
            //     name: 'React Native',
            //     avatar: 'https://placeimg.com/140/140/any',
            //   },
            // }
             // {
            //   _id: 1,
            //   text: 'Hello developer',
            //   createdAt: new Date(),
            //   user: {
            //     _id: 2,
            //     name: 'React Native',
            //     avatar: 'https://placeimg.com/140/140/any',
            //   },
            // }

            
          ],
          remainingTime:0,
          msg:'',
          icon:'',
          modal:false,
          sessionEnded:false,
          lastMessage:{},
          microPhone:false,
          hangup:false,
          callingLoader:false,
          deviceReady:false,
          mutedValue:false,
          review:'',
          starCount:0
    })
   

   // add listeners (flowtype notation)
   // add listeners (flowtype notation)

   TwilioVoice.addEventListener('deviceReady', function(data) {
        // no data
       // console.log('ready')
        setState((state) => ({
            ...state,
            microPhone:true,
            deviceReady:true
        }))
    })

    TwilioVoice.addEventListener('deviceNotReady', function(data) {
        //console.log('notready')
        // {
        //     err: string
        // }
    })

    TwilioVoice.addEventListener('connectionDidConnect', function(data) {
      
         setState(
            (state) =>({ 
                ...state,
                hangup:true,
                microPhone:false,
                callingLoader:false,
                callingLoader:false

            })
         )


    //    console.log('connectionDidConnect',data)
        // Android
        // {
        //     call_sid: string,  // Twilio call sid
        //     call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
        //     call_from: string, // "+441234567890"
        //     call_to: string,   // "client:bob"
        // }
        // iOS
        // {
        //     call_sid: string,  // Twilio call sid
        //     call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
        //     from: string,      // "+441234567890" // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
        //     to: string,        // "client:bob"    // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
        // }
    })


    TwilioVoice.addEventListener('connectionDidDisconnect', function(data: mixed) {


    //    console.log('connectionDidDisconnect',data)
        setState(
            (state) =>({ 
                ...state,
                hangup:false,
                microPhone:true,
                callingLoader:false
            })
         )

   //     console.log('connectionDidDisconnect',data)
        //   | null
        //   | {
        //       err: string
        //     }
        //   | Android
        //     {
        //         call_sid: string,  // Twilio call sid
        //         call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
        //         call_from: string, // "+441234567890"
        //         call_to: string,   // "client:bob"
        //         err?: string,
        //     }
        //   | iOS
        //     {
        //         call_sid: string,  // Twilio call sid
        //         call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
        //         call_from?: string, // "+441234567890"
        //         call_to?: string,   // "client:bob"
        //         from?: string,      // "+441234567890" // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
        //         to?: string,        // "client:bob"    // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
        //         error?: string,                        // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
        //     }
    })



    // Android Only
    TwilioVoice.addEventListener('deviceDidReceiveIncoming', function(data) {
      //  console.log('deviceDidReceiveIncoming',data)
        // {
        //     call_sid: string,  // Twilio call sid
        //     call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
        //     call_from: string, // "+441234567890"
        //     call_to: string,   // "client:bob"
        // }
    })

  

    const _deviceDidReceiveIncoming = (incomingCall) => {
      //  console.log('incoming call',incomingCall)
    }

    const initTelephony = async(accessToken) =>  {

        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
              {
                title: 'SickbayPlus Microphone Permission',
                message:
                  'SickbayPlus App needs access to your Microphone ' +
                  'so you can make calls with doctor.',
               // buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'Ok',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                const success = await TwilioVoice.initWithToken(accessToken)
             //   console.log('response ',success.initialized)
                if(success.initialized)
                {
                    TwilioVoice.getActiveCall()
                    .then(incomingCall => {
                        if (incomingCall){
                            _deviceDidReceiveIncoming(incomingCall)
                        }
                    })
                }
             
            } else {
                alert("Microphone permission denied. You can't make a call with your doctor without microphone Permission.")
           
            }
          } catch (err) {
            console.log(err);
          }

    }


     // iOS Only
    const initTelephonyWithUrl = (url) => {
        TwilioVoice.initWithTokenUrl(url)
        try {
            TwilioVoice.configureCallKit({
                appName:       'TwilioVoiceExample',                  // Required param
                imageName:     'my_image_name_in_bundle',             // OPTIONAL
                ringtoneSound: 'my_ringtone_sound_filename_in_bundle' // OPTIONAL
            })
        } catch (err) {
            console.log('error message ios',err)
        }
    }

    useEffect(() => {
       
        //  console.log('voice ',props.twilioVoiceClientToken)
        //  console.log('to ',props.clientTo)
    // console.log('doctor token ',props.doctorToken)

      //  console.log(props.chatMessage)
                setState(
                    (state) =>({ 
                        ...state,
                        messages: props.chatMessage,
                        // modal:true,
                        // message:'Thank you for your time.',
                        // icon:'checkmark-circle'
                    })
                )
                

              
                if(props.twilioVoiceClientToken!='')
                {
                        initTelephony(props.twilioVoiceClientToken)

                    if(Platform.OS==='ios')
                    {
                        initTelephonyWithUrl()
                    }
                }


             let startingTime = props.navigation.getParam('appointment').date+' '+props.navigation.getParam('appointment').time
           //  let startingTime = "2020-02-06 5:30 PM"
             startingTime = moment(startingTime,'YYYY-MM-DD h:mm A')
          
              let endingTime = props.navigation.getParam('appointment').appointmentEdningTime
           //  let endingTime = "2020-02-06 5:45 PM"
             endingTime = moment(endingTime,'YYYY-MM-DD h:mm A')
         
             var currentTime = moment() //todays date
           

                if(endingTime >= currentTime && currentTime >= startingTime)
                {
                    var remainingTime = moment.duration(endingTime.diff(currentTime)).as('seconds')

                    setState(
                        (state) =>({ 
                            ...state,
                            remainingTime:remainingTime,
                            sessionEnded:true
                        })
                     )
                  
                }else{ 

                    if(props.navigation.getParam('appointment').appointmentStatus!='Completed')
                    {

                        setState(
                            (state) =>({ 
                                ...state,
                                message:'Appointemnt Session Already Ended.',
                                sessionEnded:false,
                                modal:true,
                                icon:'close-circle'
                            })
                         )
                        
                    }
                    
                 
                }
      
         
    }, [props.chatMessage,props.twilioClientToken,props.clientTo,props.clientFrom,props.user])

    useEffect(() => {
       
        if(props.msgSent)
        {
            let appointment_id =  props.navigation.getParam('appointment').id
            let data2 = {chat_history:JSON.stringify(state.lastMessage),appointment_id:appointment_id}
            props.uploadChatHistory(data2)
            props.clearMsgCheck()
        }

    }, [props.msgSent,props.msgSentCheck,props.chatMessage])


    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        button:{
            marginTop:20,
            backgroundColor:'#5FB8B6',
            height:50,
            width:'100%'
        },

    })

   const onSend = (messages = []) => {
       // console.log(messages[0].text)
        // setState(previousState => ({
        //   messages: GiftedChat.append(previousState.messages, messages),
        // }))
       // console.log('HELOO ',JSON.stringify(messages[0]))
            setState((state) => ({
                ...state,
                lastMessage:messages[0]
            }))

            props.appendNotificationMessage(messages[0])
            let appointment_id =  props.navigation.getParam('appointment').id

            //  let appointment_id =  props.navigation.getParam('appointment').id
            // let data2 = {chat_history:state.lastMessage,appointment_id:appointment_id}
            // props.uploadChatHistory(data2)


            var data = { 
                'msgID':messages[0]._id,
                "data": {
                    "notification": {
                        "body": messages[0].text,
                        "title": props.user.name,
                        "click_action": "https://shm.ranksol.com/sickbay/appointment-chat/"+appointment_id,
                    
                    }
                },
                "to": props.doctorToken// props.navigation.getParam('appointment').device_token //"di9cEPpuXhJiPAR-77UysN:APA91bGoJOC12CuON6Q7sOFx7wquPYTFlU5LxLy8aitkQSD90ccDFzfGZ9JhMwBcIwm3UgHcvahpSsk1REDkK5uiN7mF8-0M-Ls_l09wkp9lSSroT3uTskFKc1LfHoDveQHPgQxU_oIt"
            }
     
        props.sendMessage(data)
        
    }

    const userAvatar = () => {
        return  (
            <Thumbnail source={image} />
        )
    }

    const renderLoading = () => {

        return (
            
            <View style={{flex:1,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center'}}>
                    
                <View style={{height:100,justifyContent:'space-between',alignItems:'center'}}>
                <Image  source={loader} style={{ height: 80,width: 80,alignSelf:'center'}}/> 
                    {/* <Thumbnail source={loader} /> */}
                    <Text style={{color:'#5FB8B6',fontFamily:'Montserrat-Bold'}}>Connecting....</Text>
                </View>

            </View>
        )
        
    }

    const renderActions = () => {

        return (
            
            <TouchableOpacity  style={{marginBottom:7,marginLeft:10}}>
                   <Icon style={{color:'#5FB8B6',fontSize:30}} type="Ionicons" name="attach"/>
            </TouchableOpacity>

        )
        
    }

    const renderChatFooter = () => {

        return (
            
            <TouchableOpacity  style={{marginBottom:7,paddingHorizontal:10,flexDirection:'row',justifyContent:'flex-end'}}>
                   <Icon style={{color:'#5FB8B6',fontSize:30}} type="Ionicons" name="videocam"/>
            </TouchableOpacity>

        )
        
    }

    const renderFooter = () => {

        return (
            <View style={{padding:10}}>
              <Text style={{color:'#000000',fontFamily:'Montserrat-Regular'}} >User is typing...</Text>
            </View>
        )
        
    }
    
    const renderSend = (props) => {
        return (
            <Send
                {...props}
            >
                <View style={{justifyContent:"center", alignItems:"center", paddingHorizontal: 10,paddingVertical:10}}>
                    <Icon style={{color:'#5FB8B6',fontSize:30}} type="Ionicons" name="send"/>
                 </View>
            </Send>
        )
        
    }

   const renderBubble = (props) =>
    { 
        return (
            
            <Bubble {...props} 
                textStyle={{ 
                    left:{fontFamily:'Montserrat-Regular'},
                    right: { fontFamily:'Montserrat-Regular' },
                
                }}
                wrapperStyle={{
                    right: {
                       backgroundColor: '#5FB8B6'
                    }
                }} />
        )
  }

  const onPressActionButton = () =>
  { 
     console.log('hello')
  }
     
  const renderChatEmpty  = () =>
  { 
    return (
        <View style={{flex:1,flexDirection:'column-reverse',justifyContent:'center',alignItems:'center'}}>
               
               
               {state.messages.length == 0 && props.navigation.getParam('appointment').appointmentStatus=='Completed'? <Text style={{color:'#000000',fontFamily:'Montserrat-Regular',padding:10,textAlign:'center',transform: [{rotateX:'180deg'}]}}>No Chat History </Text>:
               <View style={{flex:1,flexDirection:'column-reverse',justifyContent:'center',alignItems:'center'}} > 
                   <Text style={{color:'#000000',fontFamily:'Montserrat-Regular',padding:10,textAlign:'center',transform: [{rotateX:'180deg'}]}}>You are officially connected with </Text>
                   <Text style={{color:'#5FB8B6',fontFamily:'Montserrat-Bold',textAlign:'center',transform: [{rotateX:'180deg'}]}}>{props.navigation.getParam('appointment').name}</Text>
               </View>}
               
        </View>
           
    )
    
  }

  const renderCustomView  = (props) =>
  { 
      //console.log('props here',props)
     
    return (
        
            props.currentMessage.failed==1?<Text  style={{color:'red',fontFamily:'Montserrat-Regular',fontSize:10,textAlign:'right'}}>Failed!</Text>:null
           
    )
    
  }

  const dialVoiceCall  = () =>
  { 
    setState(
        (state) =>({ 
            ...state,
            callingLoader:true
        })
     )
  

     TwilioVoice.connect({To: props.clientTo,From:props.clientFrom})
    
  }
  
  const hangUp = () => {
      
      // hangup
      TwilioVoice.disconnect()
  }
    const mute = (mutedValue) => {
      
        setState(
            (state) =>({ 
                ...state,
                mutedValue:mutedValue
            })
         )

        // hangup
        TwilioVoice.setMuted(mutedValue)
    }

    const onChangeReview = (text) => {
        setState(
            (state) =>({ 
                ...state,
                review:text
            })
         )
    }

  
    return (
       
        <View style={styles.container}>

           <Spinner
              overlayColor="rgba(0, 0, 0, 0.3)"
              visible={state.callingLoader}
              color = "#5FB8B6"
              textStyle={{color:'#ffffff'}}
              customIndicator={ <Image  source={loader} style={{ height: 80,width: 80,alignSelf:'center'}}/> }
              textContent = "Calling..."
            />


             {/* <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0}} footerStyle={{height:130}} visible={state.modal}>
                 
                 <View style={{height:130,flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'#5FB8B6'}}>
                      <Icon style={{fontSize:60,color:'#ffffff'}} type="Ionicons" name={state.icon} />
                      <Text style={{fontFamily:'Montserrat-Bold',color:'#ffffff'}}> {state.message} </Text>
                 </View>

                 <View style={{height:130,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                     <View style={{width:'70%'}}>
                         <Button onPress={()=> {
                             
                             setState({...state,modal:false})
                             props.navigation.navigate('MyAppointments')
                         }} rounded block style={styles.button} >
                             <Text style={{fontSize:20,fontFamily:'Montserrat-Black',color:'#ffffff'}}>OK</Text>
                         </Button>
                     </View>
                     
                 </View>
                 
              </Dialog.Container> */}

              
             <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0}} footerStyle={{height:state.sessionEnded==false?300:130}} visible={state.modal}>
                 
                 <View style={{height:state.sessionEnded==false?300:130,flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'#5FB8B6'}}>
                      <Icon style={{fontSize:60,color:'#ffffff'}} type="Ionicons" name={state.icon} />
                      <Text style={{fontFamily:'Montserrat-Bold',color:'#ffffff'}}> {state.message} </Text>
                   
                      {!state.sessionEnded?  <StarRating
                                disabled={false}
                                maxStars={5}
                                starSize={24}
                                containerStyle={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'50%'}}
                                selectedStar={(rating) => setState({...state,starCount:rating})}
                                rating={state.starCount}
                                fullStarColor="orange"
                                emptyStarColor="#ffffff"
                                containerStyle={{}}
                                starStyle={{padding:2}}
                        />:null}
                
                        {!state.sessionEnded? <Textarea style={{borderRadius:10,fontFamily:'Montserrat-Bold',borderColor:'#ffffff',backgroundColor:'#ffffff',width:250,borderWidth:2}} rowSpan={3} onChangeText={onChangeReview} placeholder="Comments..." />:null}
                  
                 </View>

                 <View style={{height:130,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                     <View style={{width:'70%'}}>
                         <Button onPress={()=> {
                             
                             setState({...state,modal:false})
                             let data = {appointment_id:props.navigation.getParam('appointment').id,user_id:props.navigation.getParam('appointment').doctor_id,rating:state.starCount,comment:state.review}
                             props.doctorRatings(data)
                             props.navigation.navigate('MyAppointments')
                         }} rounded block style={styles.button} >
                             <Text style={{fontSize:20,fontFamily:'Montserrat-Black',color:'#ffffff'}}>OK</Text>
                         </Button>
                     </View>
                     
                 </View>
                 
              </Dialog.Container>

             {props.navigation.getParam('appointment').appointmentStatus=='Completed'?null: <View style={{flexDirection:'row',height:50,justifyContent:'flex-end',alignItems:'center',padding:10}}>
                   
                
                   {/* {state.hangup==true?
                         <View style={{flexDirection:'row',justifyContent:'space-between',width:'40%'}}>
                            <TouchableOpacity onPress={hangUp} style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center'}}>
                                    <Icon style={{fontSize:30,color:'red'}} type="MaterialCommunityIcons" name="phone-off" />
                                    <Text style={{fontFamily:"'Montserrat-Regular",color:'#000000',fontSize:10}}>Hangup</Text>
                            </TouchableOpacity>

                                     
                                        {state.mutedValue? 
                                        <TouchableOpacity onPress={() => mute(!state.mutedValue)} style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center'}}>
                                            <Icon style={{fontSize:30,color:'#0099CC'}} type="MaterialCommunityIcons" name="microphone" />
                                            <Text style={{fontFamily:"'Montserrat-Regular",color:'#000000',fontSize:10}}>Unmute</Text>
                                        </TouchableOpacity>:
                                        <TouchableOpacity onPress={() => mute(!state.mutedValue)} style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center'}}> 
                                            <Icon style={{fontSize:30,color:'#0099CC'}} type="MaterialCommunityIcons" name="microphone-off" />
                                            <Text style={{fontFamily:"'Montserrat-Regular",color:'#000000',fontSize:10}}>Mute</Text>
                                        </TouchableOpacity>}
                                       
                        
                             </View>:null}  */}

                   {/* {props.navigation.getParam('appointment').appointmentType=='voice' && state.microPhone==true?<TouchableOpacity onPress={dialVoiceCall} style={{width:'40%'}}>
                       <Icon style={{fontSize:30,color:'#5FB8B6'}} type="Ionicons" name="call" />
                    </TouchableOpacity>:null}  */}
                    
              
                  {props.navigation.getParam('appointment').appointmentType=='voice'?<TouchableOpacity onPress={ ()=>{ Linking.openURL(props.navigation.getParam('appointment').url)}}  style={{width:'40%'}}>
                       <Icon style={{fontSize:30,color:'#5FB8B6'}} type="Ionicons" name="call" />
                   </TouchableOpacity>:null} 

                   {props.navigation.getParam('appointment').appointmentType=='video'?<TouchableOpacity onPress={ ()=>{ Linking.openURL(props.navigation.getParam('appointment').url)}} style={{width:'40%'}}>
                       <Icon style={{fontSize:30,color:'#5FB8B6'}} type="Ionicons" name="videocam" />
                   </TouchableOpacity>:null} 


                   <View style={{width:'60%',flexDirection:'row',justifyContent:'flex-end'}}>
                    <Text style={{fontFamily:'Montserrat-Bold',color:'#000000'}}>Remaining  Time: </Text>
                        {state.sessionEnded?<CountDown
                            until={state.remainingTime}
                            onFinish={() => {
                                // hangup
                                    TwilioVoice.disconnect()
                                    props.updateAppointmentStatus({appointment_id:props.navigation.getParam('appointment').id})
                                    setState({...state,message:'Thank you for your time.',sessionEnded:false,modal:true,icon:'checkmark-circle'})
                                    }
                                }
                        // onPress={() => alert('hello')}
                            size={10}
                            digitStyle={{backgroundColor: '#5FB8B6'}}
                            digitTxtStyle={{fontFamily:'Montserrat-Bold'}}
                            timeToShow={['M', 'S']}
                        
                        />:null}
                  </View>
                  

             </View>}

             {/* <TWIVideoView>

             </TWIVideoView> */}
                                {/* <TwilioVideoCall>
                                    
                                </TwilioVideoCall> */}
                                {/* <TwilioVideoBrowser>
                                    
                                </TwilioVideoBrowser> */}
             <GiftedChat
                alwaysShowSend={props.navigation.getParam('appointment').appointmentStatus=='Completed'?false:true}
                showUserAvatar={true}
                renderChatEmpty={renderChatEmpty}
             //   onPressActionButton={onPressActionButton}
               
                renderBubble={renderBubble}
                textInputStyle={{color:'#000000',fontFamily:'Montserrat-Regular'}}
                renderInputToolbar={props.navigation.getParam('appointment').appointmentStatus=='Completed'?() => null:undefined}
                messages={state.messages}
               // renderActions={renderActions}
                //renderChatFooter={renderChatFooter}
                isLoadingEarlier={true}
                renderLoading={renderLoading}
                onSend={messages => onSend(messages)}
                renderCustomView={renderCustomView}
            //    renderFooter={renderFooter}
                renderSend={renderSend}
                user={{
                    _id: props.user.id,
                    avatar: props.user.image

                }}
             />
      
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        chatMessage: state.appointment.chatMessage,
        uploadChat: state.appointment.uploadChat,
        uploadChatError: state.appointment.uploadChatError,
        msgSent: state.appointment.msgSent,
        msgSentCheck: state.appointment.msgSentCheck,
        twilioVoiceClientToken:state.appointment.twilioVoiceClientToken,
        twilioVideoClientToken:state.appointment.twilioVideoClientToken,
        clientTo:state.appointment.clientTo,
        clientFrom:state.appointment.clientFrom,
        roomName:state.appointment.roomName,
        doctorToken:state.appointment.doctorToken
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage:(data) => dispatch(sendMessage(data)),
        appendNotificationMessage:(data) => dispatch(appendNotificationMessage(data)),
        uploadChatHistory:(data)=> dispatch(uploadChatHistory(data)),
        clearMsgCheck:() => dispatch(clearMsgCheck()),
        updateAppointmentStatus:(data) => dispatch(updateAppointmentStatus(data)),
        doctorRatings:(data) => dispatch(doctorRatings(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartSession)