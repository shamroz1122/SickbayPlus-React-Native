import React, {useState,useEffect} from 'react'
import { StyleSheet, View,Text,TouchableOpacity,RefreshControl,FlatList,ActivityIndicator,Platform} from 'react-native';
import { Card, CardItem,Content,Icon,Item,Input,Thumbnail,Body,Left,Button,Tabs,Tab} from 'native-base';
import { SimpleAnimation } from 'react-native-simple-animations';
import image from '../../../assets/dummyDoctor.png'
import StarRating from 'react-native-star-rating'
import { connect } from 'react-redux'
import { getAppoitments,loadingFlag,fetchChatHistory,fetchVoiceTwilioClientToken,fetchVideoTwilioClientToken,clearTwilioClientToken,appendNotificationMessage } from '../../redux/actions/appointmentActions'
import Spinner from 'react-native-loading-spinner-overlay';
import PushNotification from "react-native-push-notification";
import uuid from 'uuid/v1';
import Dialog from "react-native-dialog";

class MyListItem extends React.PureComponent {
    render() {

        var appointType;
        var label;
        if(this.props.appointment.appointmentType=='video')
        {
            appointType = 'videocam'
            label = 'Video Call Appointment'

        }else if(this.props.appointment.appointmentType=='voice')
        {
            appointType = 'call'
            label = 'Voice Call Appointment'

        }else if(this.props.appointment.appointmentType=='chat'){
            
            appointType = 'chatboxes'
            label = 'Chat Appointment'
        }

        
        var status = 'pending'
        var pendingAppStyle = this.props.styles.pendingButton

        if(this.props.appointment.started==1){
          
            status = 'Started'
            var pendingAppStyle = this.props.styles.startedButton

        }else if(this.props.appointment.started==2){
        
            status = 'Expired'
            var pendingAppStyle = this.props.styles.expiredButton

        }else{
            
            status = 'Pending'
            var pendingAppStyle = this.props.styles.pendingButton

        }
 
        
        return (

            
          <TouchableOpacity onPress={() => {

                if(this.props.appointment.started==1 || this.props.appointment.appointmentStatus=='Completed'){

                    
                    let data2 = {appointment_id:this.props.appointment.id}  

                    this.props.fetchChatHistory(data2,this.props.appointment)
                   

                }
          }} >

            <Card style={{elevation:6,height:150,borderRadius:15,marginBottom:15 }}>
                        
                <CardItem  style={{ borderRadius: 15,flex:1,flexDirection:'column',alignItems:'center',justifyContent:'space-between' }}>
                   
                    <View style={{flex:2,flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                        <Left>
                            <Thumbnail large source={this.props.appointment.image==null?image:{uri:this.props.appointment.image} } />
                            <Body>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:14}}>{ this.props.appointment.name  }</Text>
                                
                                </View>
                              
                                <Text style={{color:'#5FB8B6',fontFamily:'Montserrat-Bold',fontSize:12}}>{ this.props.appointment.category }</Text>

                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                   <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="logo-usd"/>
                                   <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10,paddingLeft:8}}>Payed Fee: <Text style={{color:'#5FB8B6'}}>${this.props.appointment.appointmentPrice} </Text></Text> 
          
                                </View>

                                <View style={{flexDirection:'row',alignItems:'center',width:'60%'}}>
                                   <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="calendar"/>
                                   <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10,paddingLeft:8}}>{this.props.appointment.date}</Text> 
                                   <Icon style={{color:'#5FB8B6',fontSize:14,paddingLeft:8}} type="Ionicons" name="time"/>
                                   <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10,paddingLeft:8}}>{this.props.appointment.time}</Text> 
                                </View>

                                <View style={{flexDirection:'row',alignItems:'center',width:'60%'}}>
                                    <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name={appointType}/>
                                    <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10,paddingLeft:8}}>{label}</Text> 
                                </View>
                            </Body>
                        </Left>
                    </View>

                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',width:'100%'}}>
                    
                        {this.props.appointment.appointmentStatus=='Pending' ?<View style={{width:'50%',flexDirection:'row',justifyContent:'flex-end'}}>
                            <TouchableOpacity  onPress={() => {

                                            if(this.props.appointment.started==1){

                                                
                                                let data2 = {appointment_id:this.props.appointment.id}  

                                                this.props.fetchChatHistory(data2,this.props.appointment)
                                            

                                            }
                                        }} 

                                    rounded block style={pendingAppStyle} >
                             
                                <Text style={{color:'#ffffff',fontSize:10,fontFamily:'Montserrat-Black'}}>  {status} </Text> 
                            
                            </TouchableOpacity>
                        </View> 
                        : <View style={{width:'50%',flexDirection:'row',justifyContent:'flex-end'}}>
                                <TouchableOpacity onPress={() => {

                                        if(this.props.appointment.appointmentStatus=='Completed'){

                                            
                                            let data2 = {appointment_id:this.props.appointment.id}  

                                            this.props.fetchChatHistory(data2,this.props.appointment)
                                        

                                        }
                                        }} rounded block style={this.props.styles.completedButton}>
                              
                                   <Text style={{color:'#ffffff',fontSize:10,fontFamily:'Montserrat-Black'}}>Completed</Text>
                                </TouchableOpacity>
                            </View>}

                      

                    </View>
                

                </CardItem>
        
            </Card>
            </TouchableOpacity>
        )




    }
  }


function MyAppointments(props){ 

    const [state,setState] = useState({
        pendingAppointments:[],
        pendingfiltered:[],
        completedAppointments:[],
        completedfiltered:[],
        loading:true,
        pendingPage:1,
        completedPage:1,
        isPendingRefreshing:false,
        isCompletedRefreshing:false,
        searchBar:false,
        tab:0,
        appointmentData:{},
        spinnerLoading:false,
        modal:false
    })

    useEffect(()=>{
        pushNotifications()
        props.navigation.setParams({ showSearchBar: showSearchBar });
     
    },[])


    const pushNotifications = (token) => {

        PushNotification.configure({
          // (optional) Called when Token is generated (iOS and Android)
    
          popInitialNotification: function(notification) {
    
             if (notification)
             { 
               
                  this.handleOnPushNotification(notification); 
                
             }
          },
    
          // (required) Called when a remote or local notification is opened or received
     
          onNotification: function(notification) {
            console.log(notification)
            // if(currentState ==='active')
            // {
            // //  PushNotification.cancelAllLocalNotifications()
            // }
        
              //  store.dispatch(appendNotificationMessage(msg))
    
              //  console.log('notification',notification)
            
                if(notification.type=='reminder') {
                    // store.dispatch(recieveNotificationMessage(msg))
                    //  navigateToChat(notification.appointemnt)
                    onRefreshPending()
                    onRefreshCompleted()
                         
                }else{
                    var appointment_data = JSON.parse(notification.appointment)
                    let msg = {
                        _id: uuid(),
                        text: notification.message,
                        createdAt: new Date(),
                        user: {
                          _id:  notification.user_id,
                          name: notification.title,
                          avatar:appointment_data.image,
                        },
                      }

                      store.dispatch(appendNotificationMessage(msg))
                }
    
                // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
                 if (Platform.OS === 'ios') {

                   notification.finish(PushNotificationIOS.FetchResult.NoData);
                    
                 }
            
          },
         
          // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
          senderID: "274302893670",
         
          // IOS ONLY (optional): default: all - Permissions to register.
          permissions: {
            alert: true,
            badge: true,
            sound: true
          },
         
          // Should the initial notification be popped automatically
          // default: true
          popInitialNotification: false,
         
          /**
           * (optional) default: true
           * - Specified if permissions (ios) and token (android and ios) will requested or not,
           * - if not, you must call PushNotificationsHandler.requestPermissions() later
           */
           requestPermissions: true
        });
    
      }


    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        pendingButton:{
            backgroundColor:'orange',
            height:25,
            width:'60%',
            borderRadius:20,
            elevation:10,
            alignItems:'center',
            justifyContent:'center'
        },
        startedButton:{
            backgroundColor:'#0099CC',
            height:25,
            width:'60%',
            borderRadius:20,
            elevation:10,
            alignItems:'center',
            justifyContent:'center'
        },
        expiredButton:{
            backgroundColor:'#CC0000',
            height:25,
            width:'60%',
            borderRadius:20,
            elevation:10,
            alignItems:'center',
            justifyContent:'center'
        },
        completedButton:{
            backgroundColor:'#5FB8B6',
            height:25,
            width:'60%',
            borderRadius:20,
            elevation:10,
            alignItems:'center',
            justifyContent:'center'
        },
        button:{
            marginTop:20,
            backgroundColor:'#5FB8B6',
            height:50,
            width:'100%'
        },

    })
    useEffect(()=>{

            setState({...state,loading:props.loading})

    },[props.loading])



    useEffect(() => {
        setState({...state,spinnerLoading:false})
        if(props.fetchResult==1)
        { 
            props.navigation.navigate('StartSession',{appointment:state.appointmentData})
        }else if(props.fetchResult==2){
         
            setTimeout(() => {
                setState({...state,modal:true})
            }, 600);
          
       
        }

    }, [props.fetchResult,props.fetchResultCheck,props.doctorToken])



 


    useEffect(()=>{

        if(props.pendingAppointments.length > 0 && props.checkPendingAppointment==1)
        { 
            
          //  console.log('pending Appointemnts',state.pendingAppointments)
            setState(
                (state) =>({ 
                    ...state,
                    pendingfiltered: [...state.pendingfiltered,...props.pendingAppointments],
                    pendingAppointments : [...state.pendingAppointments,...props.pendingAppointments],
                    loading:false,
                    isPendingRefreshing:false
                })
            )
      
        }else if(props.pendingAppointments.length == 0 && props.checkPendingAppointment==3){
            
            props.navigation.setParams({ showSearchBar: showSearchBar })

            setState(
                (state) =>({ 
                    ...state,
                    loading:true,
                    pendingAppointments:[],
                    pendingfiltered:[]
                })
             )

            //  setInterval(()=>{
       
            //     onRefreshPending()
            //     onRefreshCompleted()
            // },60000)

            setTimeout(()=> {
                const pageNumber = {page:state.pendingPage,status:'pending'}
                props.getAppoitments(pageNumber)
            },400)
            
        

        }else if(props.pendingAppointments.length == 0 && props.checkPendingAppointment==2){
       
       
            setState({...state,loading:false})
    
        }

    },[props.pendingAppointments,props.checkPendingAppointment])


    useEffect(()=>{
 
      
        if(props.completedAppointments.length > 0 && props.checkCompletedAppointment==1)
        { 
        
            setState(
                (state) =>({ 
                    ...state,
                    completedfiltered: [...state.completedfiltered,...props.completedAppointments],
                    completedAppointments : [...state.completedAppointments,...props.completedAppointments],
                    loading:false,
                    isCompletedRefreshing:false
                })
            )
      
            
        }else if(props.completedAppointments.length == 0 && props.checkCompletedAppointment==3){
            
         


            props.navigation.setParams({ showSearchBar: showSearchBar })
            setState(
                (state) =>({ 
                    ...state,
                    loading:true,
                    completedAppointments:[],
                    completedfiltered:[]
                })
             )
            // setState({...state,loading:true,completedAppointments:[],completedfiltered:[]})
      
            setTimeout(()=> {
                const pageNumber = {page:state.completedPage,status:'completed'}
                props.getAppoitments(pageNumber)
            },400)

       

        }else if(props.completedAppointments.length == 0 && props.checkCompletedAppointment==2){
         
            setState({...state,loading:false})
    
        }

    },[props.completedAppointments,props.checkCompletedAppointment])



   
    const onPendingSearch = (text) => {

        // Variable to hold the original version of the list
        let currentList = []
        // Variable to hold the filtered list before putting into state
        let newList = []
        // If the search bar isn't empty
        if (text !== "") {
         
                currentList = state.pendingAppointments;
                
                newList = currentList.filter(item => {
                        
                    const name = item.name.toLowerCase();
                    const nameFilter = text.toLowerCase();
                    
                    const date = item.date
                    const dateFilter = text

                    const time = item.time
                    const timeFilter = text

               

                    return name.includes(nameFilter) || date.includes(dateFilter) || time.includes(timeFilter)
          
                });

          }else{
                 // If the search bar is empty, set newList to original task list
                  newList = state.pendingAppointments;
          }

          // Set the filtered state based on what our rules added to newList
            setState(
                (state) =>({ 
                    ...state,
                    pendingfiltered : newList 
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
         
                currentList = state.completedAppointments;
                
                newList = currentList.filter(item => {
                        
                    const name = item.name.toLowerCase();
                    const nameFilter = text.toLowerCase();

                    const date = item.date
                    const dateFilter = text

                    const time = item.time
                    const timeFilter = text

                    const price = item.appointmentPrice
                    const priceFilter = text

                    return name.includes(nameFilter) || date.includes(dateFilter) || time.includes(timeFilter) || price.includes(priceFilter)
          
                });

          }else{
                 // If the search bar is empty, set newList to original task list
                  newList = state.completedAppointments;
          }

          // Set the filtered state based on what our rules added to newList
            setState(
                (state) =>({ 
                    ...state,
                    completedfiltered : newList 
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

    const renderPendingFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it shows loadMore
        if(state.loading)
        {
            return (

                <ActivityIndicator
                    size='large' color="#5FB8B6"
                />

             )

        }else{

           if(props.pendingAppointments.length > 0)
           // if(state.doctors.length > 0)
            {
                return (
                    <TouchableOpacity onPress={() => handlePendingLoadMore()} style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginBottom:10,backgroundColor:'#5FB8B6',height:25,width:'30%',alignSelf:'center'}}>
                        {/* <Button iconRight block style={styles.button2} > */}
                            
                                <Icon name='refresh' style={{fontSize:16,color:'#ffffff'}} type="Ionicons" />
                                <Text style={{color:'#ffffff',fontSize:11,fontFamily:'Montserrat-Black'}}>Load More</Text>
                    
                        {/* </Button> */}
                    </TouchableOpacity>
                )
            }else{

                if(state.pendingAppointments.length > 0)
                {
                    return (
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <Text style={{color:'#000000',fontFamily:'Montserrat-Black'}}>No More Records Found!</Text>
                        </View>
                    )
                }else{
                    return (
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <Text style={{color:'#000000',fontFamily:'Montserrat-Black'}}>No Record Found!</Text>
                        </View>
                    )
                }
            

            }

        }
        
    }


    const renderCompletedFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it shows loadMore
        if(state.loading)
        {
            return (

                <ActivityIndicator
                    size='large' color="#5FB8B6"
                />

             )

        }else{

           if(props.completedAppointments.length > 0)
           // if(state.doctors.length > 0)
            {
                return (
                    <TouchableOpacity onPress={() => handleCompletedLoadMore()} style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginBottom:10,backgroundColor:'#5FB8B6',height:25,width:'30%',alignSelf:'center'}}>
                        {/* <Button iconRight block style={styles.button2} > */}
                            
                                <Icon name='refresh' style={{fontSize:16,color:'#ffffff'}} type="Ionicons" />
                                <Text style={{color:'#ffffff',fontSize:11,fontFamily:'Montserrat-Black'}}>Load More</Text>
                    
                        {/* </Button> */}
                    </TouchableOpacity>
                )
            }else{
                if(state.completedAppointments.length > 0)
                {
                    return (
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <Text style={{color:'#000000',fontFamily:'Montserrat-Black'}}>No More Records Found!</Text>
                        </View>
                    )
                }else{
                    return (
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <Text style={{color:'#000000',fontFamily:'Montserrat-Black'}}>No Record Found!</Text>
                        </View>
                    )
                }
             
            }

        }
        
    }


    const handlePendingLoadMore = () => {
      
        const page = state.pendingPage + 1; // increase page by 1
        setState({...state,pendingPage:page,loading:true})
        const pagenumber = {page:page,status:'pending'}
        props.loadingFlag()           
        props.getAppoitments(pagenumber) // method for API call 
      
  }

    const handleCompletedLoadMore = () => {
        
        const page = state.completedPage + 1; // increase page by 1
        setState({...state,completedPage:page,loading:true})
        const pagenumber = {page:page,status:'completed'}
        props.loadingFlag()           
        props.getAppoitments(pagenumber) // method for API call 
    
    }


  const onRefreshPending = () => {
    
      const page = 1; // increase page by 1
      setState({...state,pendingPage:page,pendingAppointments:[],pendingfiltered:[]})
      const pagenumber = {page:page,status:'pending'}
      props.loadingFlag()           
      props.getAppoitments(pagenumber) // method for API call 
    }

    const onRefreshCompleted = () => {
        const page = 1; // increase page by 1
        setState({...state,completedPage:page,completedAppointments:[],completedfiltered:[]})
        const pagenumber = {page:page,status:'completed'}
        props.loadingFlag()           
        props.getAppoitments(pagenumber) // method for API call 
  
    }
  
    const _renderItem = ({item}) => (
        <MyListItem
             appointment={item} 
             styles={styles}
             navigation={props.navigation}
             fetchChatHistory={fetchChatHistory}
        />
      )


      const fetchChatHistory = (data,appointment) => {
        
        //   if(props.chatMessage.length > 0)
        //   {
        //     props.navigation.navigate('StartSession',{appointment:appointment})
        //   }else{

            setState({...state,appointmentData:appointment,spinnerLoading:true})

            if(appointment.appointmentType=='voice')
            {
                let twilioClientTokenData = {appointment_id:appointment.id,type:'patient',token_type:'audio'}
                props.fetchVoiceTwilioClientToken(twilioClientTokenData)

            }else if(appointment.appointmentType=='video'){

                let twilioClientTokenData = {appointment_id:appointment.id,type:'patient',token_type:'video'}
                props.fetchVideoTwilioClientToken(twilioClientTokenData)

            }else{

                props.clearTwilioClientToken()
                
            }
               props.fetchChatHistory(data)

            
       //   }
          
      }

    return (

        <View style={styles.container}>
            <Spinner
              overlayColor="rgba(0, 0, 0, 0.3)"
              visible={state.spinnerLoading}
              color = "#5FB8B6"
            />

            <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0}} footerStyle={{height:130}}   visible={state.modal}>
                 
                 <View style={{height:130,flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'#5FB8B6'}}>
                      <Icon style={{fontSize:60,color:'#ffffff'}} type="Ionicons" name="close-circle"/>
                      <Text style={{fontFamily:'Montserrat-Bold',color:'#ffffff'}}> Your doctor is not ready. </Text>
                 </View>
                 <View style={{height:130,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                     <View style={{width:'70%'}}>
                         <Button onPress={()=> setState({...state,modal:false,spinnerLoading:false})} rounded block style={styles.button} >
                             <Text style={{fontSize:20,fontFamily:'Montserrat-Black',color:'#ffffff'}}>OK</Text>
                         </Button>
                     </View>
                     
                 </View>
                 
              </Dialog.Container>



                {searchBar}
                <Tabs onChangeTab={({ i }) => setState((state)=>({...state,tab:i} ))} tabContainerStyle={{ height: 40 }}  tabBarUnderlineStyle={{backgroundColor:'#5FB8B6'}}>
                 
                   <Tab heading="Pending" activeTextStyle={{color:"#5FB8B6",fontFamily: 'Montserrat-Regular'}} activeTabStyle={{backgroundColor:'#ffffff'}}  tabStyle={{backgroundColor:'#5FB8B6'}}  textStyle={{color:'#ffffff',fontFamily: 'avant-grade'}}>
                         <Content refreshControl={
                            <RefreshControl
                                colors={["#5FB8B6"]}
                                refreshing={state.isPendingRefreshing}
                                onRefresh={onRefreshPending}
                                tintColor="#5FB8B6"
                            />
                            } 
                            contentContainerStyle={{flexGrow:1}}>
                            <SimpleAnimation  style={{width:'100%'}} distance={200} delay={400} duration={700} animate={true} direction="up" movementType="spring">
                                
                                
                                <View style={{flex:1,paddingBottom:0,padding:20}}>
                                <FlatList
                                    data={state.pendingfiltered}
                                    renderItem={_renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    ListFooterComponent={renderPendingFooter}
                                    onEndReachedThreshold={0.8}
                                />
                                </View>


                            </SimpleAnimation>
                        </Content>
                    </Tab>
                 
                    <Tab heading="Completed" activeTextStyle={{color:"#5FB8B6",fontFamily: 'Montserrat-Regular'}} activeTabStyle={{backgroundColor:'#ffffff'}}  tabStyle={{backgroundColor:'#5FB8B6'}}  textStyle={{color:'#ffffff',fontFamily: 'avant-grade'}}>
                         <Content  
                          refreshControl={
                            <RefreshControl
                                colors={["#5FB8B6"]}
                                refreshing={state.isCompletedRefreshing}
                                onRefresh={onRefreshCompleted}
                                tintColor="#5FB8B6F"
                            />
                            } 
                           contentContainerStyle={{flexGrow:1}}>
                                <SimpleAnimation  style={{width:'100%'}} distance={200} delay={400} duration={700} animate={true} direction="up" movementType="spring">
                                
                                
                                <View style={{flex:1,paddingBottom:0,padding:20}}>
                                    <FlatList
                                        data={state.completedfiltered}
                                        renderItem={_renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        ListFooterComponent={renderCompletedFooter}
                                        onEndReachedThreshold={0.8}
                                    />
                                </View>


                                </SimpleAnimation>
                            </Content>
                    </Tab>
                 
                </Tabs>
             
          </View>
        
    )
    
}



const mapStateToProps = state => {
    return {
      pendingAppointments: state.appointment.pendingAppointments,
      completedAppointments: state.appointment.completedAppointments,
      checkCompletedAppointment: state.appointment.checkCompletedAppointment,
      checkPendingAppointment: state.appointment.checkPendingAppointment,
      loading: state.doctors.loading,
      fetchResult: state.appointment.fetchResult,
      chatMessage:state.appointment.chatMessage,
      fetchResultCheck:state.appointment.fetchResultCheck,
      doctorToken:state.appointment.doctorToken
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      getAppoitments: data => dispatch(getAppoitments(data)),
      loadingFlag:() => dispatch(loadingFlag()),
      fetchChatHistory:(data) => dispatch(fetchChatHistory(data)),
      fetchVoiceTwilioClientToken:(data) => dispatch(fetchVoiceTwilioClientToken(data)),
      fetchVideoTwilioClientToken:(data) => dispatch(fetchVideoTwilioClientToken(data)),
      clearTwilioClientToken:() => dispatch(clearTwilioClientToken()),
      appendNotificationMessage:(msg) => dispatch(appendNotificationMessage(msg))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MyAppointments)