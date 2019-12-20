import React, {useState,useEffect} from 'react'
import { StyleSheet, View,Text,TouchableOpacity} from 'react-native';
import { Card, CardItem,Content,Icon,Item,Input,Thumbnail,Body,Left,Button,Tabs,Tab} from 'native-base';
import { SimpleAnimation } from 'react-native-simple-animations';
import image from '../../../assets/doctorImage.png'
import StarRating from 'react-native-star-rating'

function MyAppointments(props){

    const [state,setState] = useState({
        MyPendingAppointments:[
            {name:'Dr John Simpson',category:'Heart Surgeon',price:'5',scheduledTime:'09.00 AM',date:'2020-01-19',appointmentType:'video',id:1},
            {name:'Dr Shamroz Naseer',category:'Kidney Surgeon',price:'5',scheduledTime:'11.00 AM',date:'2020-01-20',appointmentType:'voice',id:2},
            {name:'Dr Asim Azhar',category:'Plastic Surgeon',price:'5',scheduledTime:'12.00 PM',date:'2020-01-25',appointmentType:'chat',id:3},
            {name:'Dr Hamza Sattar',category:'Transplant Surgeon',price:'5',scheduledTime:'01.00 PM',date:'2020-01-29',appointmentType:'chat',id:4}
        ],
        Pendingfiltered:[
            {name:'Dr John Simpson',category:'Heart Surgeon',price:'5',scheduledTime:'09.00 AM',date:'2020-01-19',appointmentType:'video',id:1},
            {name:'Dr Shamroz Naseer',category:'Kidney Surgeon',price:'5',scheduledTime:'11.00 AM',date:'2020-01-20',appointmentType:'voice',id:2},
            {name:'Dr Asim Azhar',category:'Plastic Surgeon',price:'5',scheduledTime:'12.00 PM',date:'2020-01-25',appointmentType:'chat',id:3},
            {name:'Dr Hamza Sattar',category:'Transplant Surgeon',price:'5',scheduledTime:'01.00 PM',date:'2020-01-29',appointmentType:'chat',id:4}
        ],

        MyCompletedAppointments:[
            {name:'Dr John Simpson',category:'Heart Surgeon',price:'5',scheduledTime:'09.00 AM',date:'2020-01-19',appointmentType:'video',id:1},
            {name:'Dr Shamroz Naseer',category:'Kidney Surgeon',price:'5',scheduledTime:'11.00 AM',date:'2020-01-20',appointmentType:'voice',id:2},
            {name:'Dr Asim Azhar',category:'Plastic Surgeon',price:'5',scheduledTime:'12.00 PM',date:'2020-01-25',appointmentType:'chat',id:3},
            {name:'Dr Hamza Sattar',category:'Transplant Surgeon',price:'5',scheduledTime:'01.00 PM',date:'2020-01-29',appointmentType:'chat',id:4}
        ],
        Completedfiltered:[
            {name:'Dr John Simpson',category:'Heart Surgeon',price:'5',scheduledTime:'09.00 AM',date:'2020-01-19',appointmentType:'video',id:1},
            {name:'Dr Shamroz Naseer',category:'Kidney Surgeon',price:'5',scheduledTime:'11.00 AM',date:'2020-01-20',appointmentType:'voice',id:2},
            {name:'Dr Asim Azhar',category:'Plastic Surgeon',price:'5',scheduledTime:'12.00 PM',date:'2020-01-25',appointmentType:'chat',id:3},
            {name:'Dr Hamza Sattar',category:'Transplant Surgeon',price:'5',scheduledTime:'01.00 PM',date:'2020-01-29',appointmentType:'chat',id:4}
        ],
        searchBar:false,
        tab:0
       
    })

    useEffect(()=>{
        props.navigation.setParams({ showSearchBar: showSearchBar });
     
    },[])

    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        pendingButton:{
            backgroundColor:'orange',
            height:25,
            width:'60%'
        },
        completedButton:{
            backgroundColor:'#5FB8B6',
            height:25,
            width:'60%'
        }

    })

    const MyPendingAppointments = state.Pendingfiltered.length?(
     
        state.Pendingfiltered.map(appointment => {
            var appointType;
            var label;
            if(appointment.appointmentType=='video')
            {
                appointType = 'videocam'
                label = 'Video Call Appointemnt'

            }else if(appointment.appointmentType=='voice')
            {
                appointType = 'call'
                label = 'Voice Call Appointemnt'

            }else if(appointment.appointmentType=='chat'){
                
                appointType = 'chatboxes'
                label = 'Chat Appointemnt'
            }
            return (
                
                <Card key={appointment.id} style={{elevation:6,height:150,borderRadius:15,marginBottom:15 }}>
                            
                    <CardItem  style={{ borderRadius: 15,flex:1,flexDirection:'column',alignItems:'center',justifyContent:'space-between' }}>
                       
                        <View style={{flex:2,flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                            <Left>
                                <Thumbnail large source={image} />
                                <Body>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:14}}>{ appointment.name  }</Text>
                                    
                                    </View>
                                  
                                    <Text style={{color:'#5FB8B6',fontFamily:'Montserrat-Bold',fontSize:12}}>{ appointment.category }</Text>

                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                       <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="logo-usd"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10,paddingLeft:8}}>Payed Fee: <Text style={{color:'#5FB8B6'}}>${appointment.price} </Text></Text> 
              
                                    </View>

                                    <View style={{flexDirection:'row',alignItems:'center',width:'60%'}}>
                                       <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="calendar"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10,paddingLeft:8}}>{appointment.date}</Text> 
                                       <Icon style={{color:'#5FB8B6',fontSize:14,paddingLeft:8}} type="Ionicons" name="time"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10,paddingLeft:8}}>{appointment.scheduledTime}</Text> 
                                    </View>

                                    <View style={{flexDirection:'row',alignItems:'center',width:'60%'}}>
                                        <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name={appointType}/>
                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10,paddingLeft:8}}>{label}</Text> 
                                    </View>
                                </Body>
                            </Left>
                        </View>

                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',width:'100%'}}>
                        
                            <View style={{width:'50%',flexDirection:'row',justifyContent:'flex-end'}}>
                                <Button rounded block style={styles.pendingButton} >
                                   <Text style={{color:'#ffffff',fontSize:10,fontFamily:'Montserrat-Black'}}>Pending</Text>
                                </Button>
                            </View>

                        </View>
                    

                    </CardItem>
            
                </Card>
            )
        })

    ) : null


    const MyCompletedAppointments = state.Completedfiltered.length?(
     
        state.Completedfiltered.map(appointment => {

            var appointType;
            if(appointment.appointmentType=='video')
            {
                appointType = 'videocam'

            }else if(appointment.appointmentType=='voice')
            {
                appointType = 'call'

            }else if(appointment.appointmentType=='chat'){
                
                appointType = 'chatboxes'
            }

            return (
                
                <Card key={appointment.id} style={{elevation:6,height:150,borderRadius:15,marginBottom:15 }}>
                            
                    <CardItem  style={{ borderRadius: 15,flex:1,flexDirection:'column',alignItems:'center',justifyContent:'space-between' }}>
                       
                        <View style={{flex:2,flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                            <Left>
                                <Thumbnail large source={image} />
                                <Body>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:14}}>{ appointment.name  }</Text>
                                    
                                    </View>
                                  
                                    <Text style={{color:'#5FB8B6',fontFamily:'Montserrat-Bold',fontSize:12}}>{ appointment.category }</Text>

                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                       <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="logo-usd"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10,paddingLeft:8}}>Payed Fee: <Text style={{color:'#5FB8B6'}}>${appointment.price} </Text></Text> 
              
                                    </View>

                                    <View style={{flexDirection:'row',alignItems:'center',width:'60%'}}>
                                       <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="calendar"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10,paddingLeft:8}}>{appointment.date}</Text> 
                                       <Icon style={{color:'#5FB8B6',fontSize:14,paddingLeft:8}} type="Ionicons" name="time"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10,paddingLeft:8}}>{appointment.scheduledTime}</Text> 
                                    </View>
                                    
                                    <View style={{flexDirection:'row',alignItems:'center',width:'60%'}}>
                                       <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name={appointType}/>
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10,paddingLeft:8}}>Appointment</Text> 
                                    </View>

                                </Body>
                            </Left>
                        </View>

                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',width:'100%'}}>
                        
                            <View style={{width:'50%',flexDirection:'row',justifyContent:'flex-end'}}>
                                <Button rounded block style={styles.completedButton} >
                                   <Text style={{color:'#ffffff',fontSize:10,fontFamily:'Montserrat-Black'}}>Completed</Text>
                                </Button>
                            </View>

                        </View>
                    

                    </CardItem>
            
                </Card>
            )
        })

    ) : null


    
    const onPendingSearch = (text) => {

        // Variable to hold the original version of the list
        let currentList = []
        // Variable to hold the filtered list before putting into state
        let newList = []
        // If the search bar isn't empty
        if (text !== "") {
         
                currentList = state.MyPendingAppointments;
                
                newList = currentList.filter(item => {
                        
                    const name = item.name.toLowerCase();
                    const nameFilter = text.toLowerCase();
                    
                    const date = item.date
                    const dateFilter = text

                    const time = item.scheduledTime
                    const timeFilter = text

                    return name.includes(nameFilter) || date.includes(dateFilter)|| time.includes(timeFilter)
                });

          }else{
                 // If the search bar is empty, set newList to original task list
                  newList = state.MyPendingAppointments;
          }

          // Set the filtered state based on what our rules added to newList
            setState(
                (state) =>({ 
                    ...state,
                    Pendingfiltered : newList 
                })
            )

    }
    const onCompletedSearch = (text) => {

        // Variable to hold the original version of the list
        let currentList = []
        // Variable to hold the filtered list before putting into state
        let newList = []
        // If the search bar isn't empty
        if (text !== "") {
         
                currentList = state.MyCompletedAppointments;
                
                newList = currentList.filter(item => {
                        
                    const name = item.name.toLowerCase();
                    const nameFilter = text.toLowerCase();

                    const date = item.date
                    const dateFilter = text

                    const time = item.scheduledTime
                    const timeFilter = text

                    return name.includes(nameFilter) || date.includes(dateFilter)|| time.includes(timeFilter)
                });

          }else{
                 // If the search bar is empty, set newList to original task list
                  newList = state.MyCompletedAppointments;
          }

          // Set the filtered state based on what our rules added to newList
            setState(
                (state) =>({ 
                    ...state,
                    Completedfiltered : newList 
                })
            )

    }

    const searchBar =   state.searchBar==true? 
                        (
                            <SimpleAnimation  style={{width:'100%'}} distance={200} delay={100} duration={700}  animate={true} direction="down" movementType="slide">
                                <Item  >
                                    <Icon style={{paddingLeft:10}} type="Ionicons" name="search" />
                                    <Input style={{fontFamily:'Montserrat-Regular',color:'#000000',fontSize:14}} type="text" id="search" onChangeText={state.tab==0?onPendingSearch:onCompletedSearch}  placeholder={state.tab==0?"Search Pending Appointment":"Search Completed Appointment"} />
                                </Item>
                            </SimpleAnimation>
                        ):null

         
    const showSearchBar = () => {
        setState((state)=>({
            ...state,
            searchBar:!state.searchBar
        }))
    }

    return (

        <View style={styles.container}>
                {searchBar}
                <Tabs onChangeTab={({ i }) => setState((state)=>({...state,tab:i} ))} tabContainerStyle={{ height: 40 }}  tabBarUnderlineStyle={{backgroundColor:'#5FB8B6'}}>
                    <Tab heading="Pending" activeTextStyle={{color:"#5FB8B6",fontFamily: 'Montserrat-Regular'}} activeTabStyle={{backgroundColor:'#ffffff'}}  tabStyle={{backgroundColor:'#5FB8B6'}}  textStyle={{color:'#ffffff',fontFamily: 'avant-grade'}}>
                         <Content contentContainerStyle={{flexGrow:1}}>
                                <SimpleAnimation  style={{width:'100%'}} distance={200} delay={400} duration={700} animate={true} direction="up" movementType="spring">
                                
                                
                                <View style={{flex:1,paddingBottom:0,padding:20}}>
                                    {MyPendingAppointments}
                                </View>


                                </SimpleAnimation>
                            </Content>
                    </Tab>
                    <Tab heading="Completed" activeTextStyle={{color:"#5FB8B6",fontFamily: 'Montserrat-Regular'}} activeTabStyle={{backgroundColor:'#ffffff'}}  tabStyle={{backgroundColor:'#5FB8B6'}}  textStyle={{color:'#ffffff',fontFamily: 'avant-grade'}}>
                         <Content contentContainerStyle={{flexGrow:1}}>
                            <SimpleAnimation  style={{width:'100%'}} distance={200} delay={400} duration={700} animate={true} direction="up" movementType="spring">
                                
                                
                                <View style={{flex:1,paddingBottom:0,padding:20}}>
                                    {MyCompletedAppointments}
                                </View>


                            </SimpleAnimation>
                        </Content>
                    </Tab>
                </Tabs>
             
          </View>
        
    )
    
}

export default MyAppointments