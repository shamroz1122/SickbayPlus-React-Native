import React, {useState,useEffect} from 'react'
import { View, StyleSheet,Text,ActivityIndicator,TouchableOpacity } from 'react-native'
import {Content,Icon,Button,H1,H3,Toast,Thumbnail, Spinner} from 'native-base'
import { connect } from 'react-redux'
import { getTimeSlots,loadingFlag,clearTimeSlots,bookingAppointment,clearAppointmentMessages } from '../../redux/actions/appointmentActions'
import uuid from 'uuid/v1';
import Dialog from "react-native-dialog";
import { CreditCardInput } from "react-native-input-credit-card";
import Stripe from 'react-native-stripe-api';
import confirmImage from '../../../assets/Booking_confirmed.png'
import AsyncStorage from '@react-native-community/async-storage';

function SelectTimeSlot(props) {
    
    const[state,setState] = useState({
        loading:false,
        timeSlots:[],
        modal:false,
        selectedTimeSlot:'',
        appointmentPrice:0,
        appointmentType:'',
        appointmentIcon:'',
        cardModal:false,
        cardInfo:{
            "status": {
                "cvc": "incomplete",
                "expiry": "incomplete",
                "number": "incomplete"
            },
            "valid": false,
            "values": {
                "cvc": "",
                "expiry": "",
                "number": "",
                "type": undefined
            }
        },
        bookingConfirmedModal:false,
        cardValidations:false
    })

    const styles = StyleSheet.create({

        container:{
            flex:1
        },
        textStyle:{
            color:'#000000',
            fontFamily:'Montserrat-Bold',
            fontSize:14
        },
     
        button:{
            backgroundColor:'#5FB8B6',
            height:45,
            width:'40%',
            elevation:0
        }
        ,
        button2:{
            backgroundColor:'#ffffff',
            borderColor:'#5FB8B6',
            borderWidth:1.5,
            height:45,
            width:'40%',
            elevation:0
            
        },
        button3: {
            backgroundColor:'#5FB8B6',
            height:45,
            width:'90%',
            elevation:0,
            
        }
    })

    useEffect(()=>{
    
        if( Object.keys(props.timeSlots).length > 0 && props.checkTimeSlots==true)
        {
            let appointmentPrice
            let appointmentType
            let appointmentIcon
            if(props.navigation.getParam('appointmentType')=='video')
            {
         
                appointmentPrice = (props.navigation.getParam('doctor').videoHourlyRate / 60) * props.timeSlots.timeRange
                appointmentType = "Video Call Appointment"
                appointmentIcon = "videocam"
            }else if(props.navigation.getParam('appointmentType')=='voice')
            {
              
                appointmentPrice = (props.navigation.getParam('doctor').voiceHourlyRate / 60) * props.timeSlots.timeRange
                appointmentType = "Voice Call Appointment"
                appointmentIcon = "call" 
            }else if(props.navigation.getParam('appointmentType')=='chat')
            {
            
                appointmentPrice = (props.navigation.getParam('doctor').chatHourlyRate / 60) * props.timeSlots.timeRange
                appointmentType = "Chat Appointment"
                appointmentIcon = "chatboxes"
            }
          

            setState({...state,timeSlots:props.timeSlots.timeSlots,appointmentPrice:appointmentPrice,appointmentIcon:appointmentIcon,appointmentType:appointmentType})
            props.clearTimeSlots()

        }else if(state.timeSlots.length == 0 && props.checkTimeSlots==false){
          
            props.loadingFlag()
            const date = {date:props.navigation.getParam('date')}
            props.getTimeSlots(date)
          
        }
        
    },[props.timeSlots,props.checkTimeSlots])

    useEffect(() => {
    
        if(props.msgBookAppointment)
        {
            setState({...state,isloading:false})
            Toast.show({
                text: "Error While Booking Appointment",
                buttonText: "Okay",
                duration: 3000,
                type: "danger"
              })
        }

        if(props.bookAppointment)
        {
            setState((state)=>({
                ...state,
                cardInfo:{
                    "status": {
                        "cvc": "incomplete",
                        "expiry": "incomplete",
                        "number": "incomplete"
                    },
                    "valid": false,
                    "values": {
                        "cvc": "",
                        "expiry": "",
                        "number": "",
                        "type": undefined
                    },
                    isloading:false,
                    cardModal:false,
                    bookingConfirmedModal:true
                }
            }))
            setState({...state,isloading:false,cardModal:false,bookingConfirmedModal:true})
        }
        
        props.clearAppointmentMessages()
    }, [props.bookAppointment,props.msgBookAppointment])


    const selectSlot = (booked,selectedTimeSlot) => {
        
        if(booked==0)
        {
            setState({...state,modal:true,selectedTimeSlot:selectedTimeSlot})
        }

    }
    
    const timeSlots = state.timeSlots.length > 0 ? (

        state.timeSlots.map(slot => {

            return (
            
                    <TouchableOpacity onPress={()=> selectSlot(slot.booked,slot.time)} key={uuid()} style={{borderColor:slot.booked==1?'#ff4444':'#5FB8B6',borderWidth:2,borderRadius:20,padding:4,marginTop:10,width:'24%',justifyContent:'center',alignItems:'center'}}>
                
                         <Text style={{color:slot.booked==1?'#ff4444':'#5FB8B6',fontFamily:'Montserrat-Bold'}}>{slot.time}</Text>
                        
                    </TouchableOpacity>
             
            )
        })

    ) :null

    const closeModal = () => {
        setState({...state,modal:false})
    }


    if(props.loading)
    {
        return (
            <View style={{paddingTop:10}}>
                <ActivityIndicator
                    size='large' color="#5FB8B6"
                />
            </View>
        )
    }

    const onChangeCard = (form) => {
        setState({...state,cardInfo:form})
    }

    const myAppointments = () => {
        setState({...state,bookingConfirmedModal:false})
        props.navigation.navigate('MyAppointments')
    }

    const pay = async() => {
         
        if(state.cardInfo.valid)
        {
            setState({...state,isloading:true,cardValidations:false})

            const apiKey = 'pk_test_0nNa4PTPVvf2PCA3Aqz1cYZ200krXucZiU'
            const client = new Stripe(apiKey)
            
            // Create a Stripe token with new card infos
            const expiry = state.cardInfo.values.expiry.split('/')

            const token = await client.createToken({
                   number: state.cardInfo.values.number ,
                   exp_month: expiry[0], 
                   exp_year: expiry[1], 
                   cvc: state.cardInfo.values.cvc
                })

                const User = await AsyncStorage.getItem('User');
                const parsedUser = JSON.parse(User)
         
                const appointment = {
                    token:token.id,
                    date:props.navigation.getParam('date').dateString,
                    time:state.selectedTimeSlot,
                    appointmentType:state.appointmentType,
                    appointmentPrice:state.appointmentPrice,
                    appointmentDetails:props.navigation.getParam('appointmentDetails'),
                    doctor_id:props.navigation.getParam('doctor').id,
                    patient_id: parsedUser.id
                }
                props.bookingAppointment(appointment)

           // console.log(token.id)
            
        }else{
            setState({...state,cardValidations:true})
            // Toast.show({
            //     text: "Invalid Card Information!",
            //     buttonText: "Okay",
            //     duration: 3000,
            //     position: "top",
            //     type: "danger"
            //   })

        }

    }

    return (

        <View style={styles.container}>

            <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0,borderRadius:20}} footerStyle={{height:130}}   visible={state.modal}>
                 
             
                 <View style={{height:250,flexDirection:'column',justifyContent:'center'}}>

                        <View style={{backgroundColor:'#ffffff',height:150,flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                                <H3 style={{fontFamily:'Montserrat-Bold',color:'#000000'}} >
                                    Confirm Booking For
                                </H3>

                                 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                  <Icon style={{color:'#5FB8B6',fontSize:16,paddingRight:5}} type="Ionicons" name="logo-usd"/>
                                  <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:16}} >Service Fee: <Text style={{color:'#5FB8B6',fontFamily:'Montserrat-Bold'}}>${state.appointmentPrice}</Text></Text> 
                                </View>

                                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Icon style={{color:'#5FB8B6',fontSize:16,paddingRight:5}} type="Ionicons" name={state.appointmentIcon}/>
                                    <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:16}} >{state.appointmentType}</Text> 
                                </View>

                                <View style={{borderBottomColor: '#5FB8B6',borderBottomWidth: 1,width:'10%'}}/>
                              
                                <H1 style={{fontFamily:'Montserrat-Bold',color:'#000000'}} >
                                    {state.selectedTimeSlot}
                                </H1>

                        </View>
                        <View style={{backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                    
                                <Button onPress={closeModal}  rounded block style={styles.button2}>
                                    <Text style={{fontSize:20,fontFamily:'Montserrat-Regular',color:'#5FB8B6'}}>Cancel</Text>
                                </Button>
                        
                                <Button onPress={()=>setState({...state,modal:false,cardModal:true})} rounded block style={styles.button}>
                                    <Text style={{fontSize:20,fontFamily:'Montserrat-Regular',color:'#ffffff'}}>OK</Text>
                                </Button>
                            
                        </View>
                    
                 </View>
            
                 
              </Dialog.Container>

              <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0,borderRadius:20}} footerStyle={{height:130}}   visible={state.bookingConfirmedModal}>
                 
             
                 <View style={{height:400,flexDirection:'column',justifyContent:'space-around'}}>

                        <View style={{flexDirection:'row',alignSelf:'flex-end',padding:10}}>
                           <Icon onPress={() => setState({...state,bookingConfirmedModal:false})} style={{fontSize:28,color:'#5FB8B6',}} type="Ionicons" name="close-circle"/>
                        </View>

                        <View style={{backgroundColor:'#ffffff',height:275,flexDirection:'column',justifyContent:'space-around',alignItems:'center',paddingTop:20}}>
                                 <H3 style={{fontFamily:'Montserrat-Bold',color:'#000000'}} >
                                    Booking Confirmed
                                 </H3>

                                 <Thumbnail square large source={confirmImage} />
                                 <H3 style={{fontFamily:'Montserrat-Bold',color:'#000000'}} >
                                     {props.navigation.getParam('doctor').name}
                                 </H3>
                               
                                 <Text style={{fontFamily:'Montserrat-Bold',fontSize:16,color:'#5FB8B6'}}>{props.navigation.getParam('doctor').category} </Text>
                                 <View style={{borderBottomColor: '#5FB8B6',borderBottomWidth: 1,width:'10%'}}/>
                                
                                 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Icon style={{color:'#5FB8B6',fontSize:16,paddingRight:5}} type="Ionicons" name="logo-usd"/>
                                    <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:16}} >Payed Fee: <Text style={{color:'#5FB8B6',fontFamily:'Montserrat-Bold'}}>${state.appointmentPrice}</Text></Text> 
                                 </View>

                                 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                    <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                        <Icon style={{color:'#5FB8B6',fontSize:18,paddingRight:8}} type="Ionicons" name="time"/>
                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:16,paddingRight:10}}>{state.selectedTimeSlot}</Text> 
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                        <Icon style={{color:'#5FB8B6',fontSize:18,paddingRight:8}} type="Ionicons" name="calendar"/>
                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:16}}>{props.navigation.getParam('date').dateString}</Text> 
                                    </View>
                                 </View>
                                 
                                 {/* <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                  <Icon style={{color:'#5FB8B6',fontSize:16,paddingRight:5}} type="Ionicons" name="logo-usd"/>
                                  <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:16}} >Payed Fee: <Text style={{color:'#5FB8B6',fontFamily:'Montserrat-Bold'}}>${state.appointmentPrice}</Text></Text> 
                                </View>

                                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Icon style={{color:'#5FB8B6',fontSize:16,paddingRight:5}} type="Ionicons" name={state.appointmentIcon}/>
                                    <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:16}} >{state.appointmentType}</Text> 
                                </View>

                                <View style={{borderBottomColor: '#5FB8B6',borderBottomWidth: 1,width:'10%'}}/>
                              
                                <H1 style={{fontFamily:'Montserrat-Bold',color:'#000000'}} >
                                    {state.selectedTimeSlot}
                                </H1> */}

                        </View>



                        <View style={{backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'center',alignItems:'center',paddingBottom:20}}>
                                    
                                    <Button onPress={myAppointments} rounded block style={styles.button3}>
                                         <Text style={{fontSize:16,fontFamily:'Montserrat-Bold',color:'#ffffff'}}>My Appointments</Text>
                                    </Button>
                                
                        </View>
               
                    
                 </View>
            
                 
              </Dialog.Container>


              <Dialog.Container headerStyle={{margin:0}}  contentStyle={{borderRadius:20}}    visible={state.cardModal}>
                 
                 <View style={{height:475,flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
  
                        <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
                           <Icon onPress={() => setState({...state,cardModal:false,cardValidations:false})} style={{fontSize:28,color:'#5FB8B6',}} type="Ionicons" name="close-circle"/>
                        </View>
                      
                        <View style={{flexDirection:'row'}}>
                           <H3 style={{fontFamily:'Montserrat-Bold',textAlign:'center',paddingBottom:20}}>Card Information</H3>
                        </View>
                    
                        <View style={{backgroundColor:'#ffffff',height:350,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <CreditCardInput onChange={onChangeCard}  />
                         
                        </View>

                        <View style={{flexDirection:'row'}}>
                           {state.cardValidations?<Text style={{marginBottom:20,color:'red'}}>Invalid Card Information!</Text>:null} 
                        </View>
                    
                                
                        <View style={{backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'center',alignItems:'center',paddingBottom:20}}>
                                    
                               {state.isloading?<Spinner  color="#5FB8B6"  />:<Button onPress={pay} rounded block style={styles.button3}>
                                     <Text style={{fontSize:16,fontFamily:'Montserrat-Bold',color:'#ffffff'}}>Pay ${state.appointmentPrice}</Text>
                                </Button>} 
                        </View>
                    
                   </View>
            
              </Dialog.Container>
              
            <Content contentContainerStyle={{flexGrow:1,padding:15}}>

                <View style={{flex:1}}>

                    <View style={{flexDirection:'row',justifyContent:'space-around'}} >

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={{borderBottomColor: '#ff4444',borderBottomWidth: 4,width:'10%',marginRight:5}}/>
                            <Text style={styles.textStyle}>Booked</Text>
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <View style={{borderBottomColor: '#5FB8B6',borderBottomWidth: 4,width:'10%',marginRight:5}}/>
                            <Text style={styles.textStyle}>Available</Text>
                        </View>

                        {/* <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                            <View style={{borderBottomColor: '#0099CC',borderBottomWidth: 4,width:'10%',marginRight:5}}/>
                            <Text style={styles.textStyle}>Selected</Text>
                        </View> */}
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around',paddingTop:5,flexWrap:'wrap',alignItems:'center'}} >
                    
                            {timeSlots}
                       
                    </View>

                </View>

            </Content>
            
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        timeSlotsError: state.appointment.timeSlotsError,
        timeSlots: state.appointment.timeSlots,
        loading:state.appointment.loading,
        checkTimeSlots:state.appointment.checkTimeSlots,
        bookAppointment:state.appointment.bookAppointment,
        msgBookAppointment:state.appointment.msgBookAppointment,
    }
}



const mapDispatchToProps = (dispatch) => {

    return {
        getTimeSlots: (creds) => dispatch(getTimeSlots(creds)),
        loadingFlag:() => dispatch(loadingFlag()),
        clearTimeSlots:() => dispatch(clearTimeSlots()),
        bookingAppointment:(appointment) => dispatch(bookingAppointment(appointment)),
        clearAppointmentMessages:() => dispatch(clearAppointmentMessages())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTimeSlot)