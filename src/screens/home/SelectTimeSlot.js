import React, {useState,useEffect} from 'react'
import { View, StyleSheet,Text,ActivityIndicator,TouchableOpacity } from 'react-native'
import {Content,Icon,Button,H1,H3,Toast} from 'native-base'
import { connect } from 'react-redux'
import { getTimeSlots,loadingFlag,clearTimeSlots } from '../../redux/actions/appointmentActions'
import uuid from 'uuid/v1';
import Dialog from "react-native-dialog";
import { CreditCardInput } from "react-native-input-credit-card";
import Stripe from 'react-native-stripe-api';



function SelectTimeSlot(props) {
    
    const[state,setState] = useState({
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
        }
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
                appointmentType = "Video Call Appointemnt"
                appointmentIcon = "videocam"
            }else if(props.navigation.getParam('appointmentType')=='voice')
            {
              
                appointmentPrice = (props.navigation.getParam('doctor').voiceHourlyRate / 60) * props.timeSlots.timeRange
                appointmentType = "Voice Call Appointemnt"
                appointmentIcon = "call" 
            }else if(props.navigation.getParam('appointmentType')=='chat')
            {
            
                appointmentPrice = (props.navigation.getParam('doctor').chatHourlyRate / 60) * props.timeSlots.timeRange
                appointmentType = "Chat Appointemnt"
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


    const selectSlot = (booked,selectedTimeSlot) => {
        
        if(booked==0)
        {
            setState({...state,modal:true,selectedTimeSlot:selectedTimeSlot})
        }

    }
    
    const timeSlots = state.timeSlots.length > 0 ? (

        state.timeSlots.map(slot => {

            return (
            
                    <TouchableOpacity onPress={()=> selectSlot(slot.booked,slot.time)} key={uuid()} style={{borderColor:slot.booked==1?'#ff4444':'#5FB8B6',borderWidth:2,borderRadius:20,padding:8,marginTop:10,width:'24%',justifyContent:'center',alignItems:'center'}}>
                
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

    const pay = async() => {

        if(state.cardInfo.valid)
        {
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

                setState({...state,cardModal:false})
                Toast.show({
                    text: "Payment Successfull!",
                    buttonText: "Okay",
                    duration: 3000,
                    type: "success"
                  })
           // console.log(token.id)
            
        }else{

            Toast.show({
                text: "Invalid Card Information!",
                buttonText: "Okay",
                duration: 3000,
                type: "danger"
              })

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

              <Dialog.Container headerStyle={{margin:0}}  contentStyle={{borderRadius:20}}    visible={state.cardModal}>
                 
                 <View style={{height:450,flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
  
                        <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
                           <Icon onPress={() => setState({...state,cardModal:false})} style={{fontSize:28,color:'#5FB8B6',}} type="Ionicons" name="close-circle"/>
                        </View>
                      
                        <View style={{flexDirection:'row'}}>
                           <H3 style={{fontFamily:'Montserrat-Bold',textAlign:'center',paddingBottom:20}}>Card Information</H3>
                        </View>
                    
                        <View style={{backgroundColor:'#ffffff',height:325,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            
                            <CreditCardInput onChange={onChangeCard} />

                        </View>

                        <View style={{backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'center',alignItems:'center',paddingBottom:20}}>
                                    
                                <Button onPress={pay} rounded block style={styles.button3}>
                                     <Text style={{fontSize:16,fontFamily:'Montserrat-Bold',color:'#ffffff'}}>Pay ${state.appointmentPrice}</Text>
                                </Button>
                            
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
        checkTimeSlots:state.appointment.checkTimeSlots
    }
}



const mapDispatchToProps = (dispatch) => {

    return {
        getTimeSlots: (creds) => dispatch(getTimeSlots(creds)),
        loadingFlag:() => dispatch(loadingFlag()),
        clearTimeSlots:() => dispatch(clearTimeSlots()),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTimeSlot)