import React, {useState,useEffect} from 'react'
import { StyleSheet, View,TouchableOpacity,Text } from 'react-native';
import { Card, CardItem,H3,Icon,Thumbnail,Content} from 'native-base'
import {Calendar} from 'react-native-calendars';
import image from '../../../assets/dummyDoctor.png'

console.disableYellowBox = true
function SelectAppointmentDate(props){

    const [state,setState] = useState({
               
            
    })
 

    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        button:{
          
            backgroundColor:'#5FB8B6',
            height:30,
            width:'30%'
        },
    })


    return (

        <View style={styles.container}>
               
                <Content contentContainerStyle={{flexGrow:1}}>
                       <View style={{flex:1,backgroundColor:'#5FB8B6',height:180}}>
                         
                            <View>
                                <TouchableOpacity onPress={()=>props.navigation.navigate('AskAQuestion')}>
                                        <View style={{flexDirection:'row',paddingLeft:15,paddingTop:15}}>
                                            <Icon style={{color:'#ffffff',fontSize:25}} type="Ionicons" name="arrow-round-back"/>
                                        </View> 
                                </TouchableOpacity>
                            </View>
                          
                            <View style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center',bottom:22}} >
                                <H3 style={{fontFamily:'Montserrat-Black',color:'#ffffff'}}>SELECT DATE</H3>
                            </View> 
                            
                       </View>
                       <View style={{flex:1,backgroundColor:'#ffffff',paddingLeft:20,paddingRight:20,height:150}}>
                     
                           <Card style={{elevation:8,height:200,borderRadius: 15,bottom:110 }}>
                            
                                    <CardItem   style={{ borderRadius: 15,flex:1,flexDirection:'column',justifyContent:'space-between' }}>
                                        <Thumbnail style={{borderColor:'#5FB8B6',borderWidth:2}} large source={props.navigation.getParam('doctor').image==null?image:{uri:props.navigation.getParam('doctor').image}} />
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
                       <View style={{justifyContent:'center',flex:1,flexDirection:'column',paddingLeft:20,bottom:40,paddingRight:20,height:300}}>
                       <Calendar 
                       current={Date()}
                       minDate={Date()}
                       onDayPress={(day) =>props.navigation.navigate('SelectTimeSlot',{date:day,appointmentDetails:props.navigation.getParam('appointmentDetails'), appointmentType:props.navigation.getParam('appointemntType'),doctor:props.navigation.getParam('doctor')}) }
                       theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#5FB8B6',
                        todayTextColor: '#ffffff',
                        todayBackgroundColor: '#5FB8B6',
                        dayTextColor: '#000000',
                        textDisabledColor: '#d9e1e8',
                        arrowColor: '#5FB8B6',
                        monthTextColor: '#000000',
                        textDayFontFamily: 'Montserrat-Bold',
                        textMonthFontFamily: 'Montserrat-Bold',
                        textDayHeaderFontFamily: 'monospace',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 14,
                        textMonthFontSize: 20,
                        textDayHeaderFontSize: 12,
                        textDayHeaderFontFamily: 'Montserrat-Bold'
                      }}
                       />
                       </View>

                    </Content>

        </View>
    )
}

export default SelectAppointmentDate