import React, {useState,useEffect} from 'react'
import { StyleSheet, View,Text,TouchableOpacity,RefreshControl,FlatList,ActivityIndicator,Linking  } from 'react-native';
import { Card, CardItem,Icon,Item,Input,Left,Body  } from 'native-base';
import { SimpleAnimation } from 'react-native-simple-animations';
import { getNotifications, clearNotificationsMessage,loadingFlagNotify } from '../../redux/actions/notificationsActions'
import { connect } from 'react-redux'
import moment from 'moment'

class MyListItem extends React.PureComponent {

    render() { 
        function daysRemaining(date,time) {
          
             var endDate =   date.split('-').join('');
             var endTime =   time.split('.').join('');
                 endTime = endTime.split(' ').join('')
      
             var exactdate = endDate+''+endTime
             var getDate = moment(exactdate, "YYYYMMDDhmma").fromNow();
            
            return  getDate
        }
      
      return (
      
                            <TouchableOpacity key={this.props.item.id} activeOpacity={1}>
                            <Card style={this.props.styles.card} >
                                <CardItem bordered style={{paddingTop:0,paddingBottom:0,paddingLeft:0,paddingRight:0}}>

                                <View style={{flex:1,flexDirection:'row'}}>
                                  
                                  
                                    <View style={{flex:5,alignItems:'center',justifyContent:'center',padding:15}}>
                                            <Left>
                                            <View style={this.props.styles.myButton}>
                                            <Icon name="notifications" style={{color:'#ffffff'}}/>
                                            </View>
                                            <Body>
                                                
                                                 <Text style={{fontSize:10,fontFamily:'Montserrat-Bold',color:'#000000'}}>New Appointment With <Text style={{fontSize:10,color:'#5FB8B6',fontFamily:'Montserrat-Bold'}}>{this.props.item.doctor}</Text> </Text>
                                                 <View style={{flexDirection:'row',alignItems:'center',width:'60%'}}>
                                                    <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="calendar"/>
                                                    <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12,paddingLeft:8}}>{this.props.item.appointmentDate}</Text> 
                                                    <Icon style={{color:'#5FB8B6',fontSize:14,paddingLeft:8}} type="Ionicons" name="time"/>
                                                    <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12,paddingLeft:8}}>{this.props.item.appointmentTime}</Text> 
                                                </View>
                                                <Text style={{fontSize:8,fontFamily:'Montserrat-Bold',color:'#000000'}}>{this.props.item.appointmentType} <Text style={{fontSize:10,color:'#5FB8B6',fontFamily:'Montserrat-Bold'}}>(${this.props.item.price})</Text> </Text>
                                               
                                            </Body>
                                        </Left>
                                    </View>
                        
                                    {/* <View style={{backgroundColor:'#5FB8B6',flex:1,alignItems:'center',justifyContent:'center'}} >
                                    
                                            <Text>
                                                <Icon  style={{fontSize:32,color:'#ffffff'}}  name="download"  />
                                            </Text>
                                        
                                                
                                        
                                    
                                    </View> */}
                                </View>
                               
                                <View style={{alignSelf:'flex-end',padding:5}}><Text style={{fontSize:10,fontFamily:'Montserrat-Bold',color:'#000000'}}>{daysRemaining(this.props.item.appointmentDate,this.props.item.appointmentTime)}</Text></View>
                                
                                </CardItem>
                            </Card>
                            </TouchableOpacity>




      )
    }

  }

function Notifications(props){

    const [state,setState] = useState({
        notifications:[],
        filtered:[],
        searchBar:false,
        page:1,
        loading :true,
        hasScrolled: false,
        isRefreshing:false
    })



    useEffect(()=>{
        setState({...state,loading:props.loading})
    },[props.loading])

    useEffect(()=>{

        if(props.notifications.length > 0 && props.checkNotifications==1)
        {
            setState(
                (state) =>({ 
                    ...state,
                    filtered: [...state.filtered,...props.notifications],
                    notifications : [...state.notifications,...props.notifications],
                    loading:false,
                    isRefreshing:false
                })
            )
          //  props.clearNotificationsMessage()

        }else if(state.notifications.length == 0 && props.checkNotifications==3){
            
        
            props.navigation.setParams({ showSearchBar: showSearchBar })
            setState({...state,loading:true})
            const pageNumber = {page:state.page}
            props.getNotifications(pageNumber)
        

        }else if(state.notifications.length == 0 && props.checkNotifications==2){
            
            setState({...state,loading:false})

        }
     
    },[props.notifications,props.checkNotifications])

    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        card :{
            elevation: 2,
            marginBottom:10
         },
        myButton :{
            padding: 5,
            height: 50,
            width: 50,  //The Width must be the same as the height
            borderRadius:100, //Then Make the Border Radius twice the size of width or Height   
            backgroundColor:'#5FB8B6',
            alignItems:'center',
            justifyContent:'center'
         
          }

    })

    const onSearch = (text) => {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];
        // If the search bar isn't empty
        if (text !== "") {
         
                      currentList = state.notifications;
                      newList = currentList.filter(item => {
                            
                      const doctor = item.doctor.toLowerCase();
                      const doctorFilter = text.toLowerCase();

                      const appointmentDate = item.appointmentDate.toLowerCase();
                      const appointmentDateFilter = text.toLowerCase();

                      const appointmentTime = item.appointmentTime.toLowerCase();
                      const appointmentTimeFilter = text.toLowerCase();

                      return doctor.includes(doctorFilter)  ||  appointmentDate.includes(appointmentDateFilter) || appointmentTime.includes(appointmentTimeFilter)
                    });

          }else {
                // If the search bar is empty, set newList to original task list
                  newList = state.notifications;
               
          }
            // Set the filtered state based on what our rules added to newList
              setState(
                (state) =>({ 
                  ...state,
                  filtered : newList 
                })
              )

    }
    const searchBar =   state.searchBar==true? 
                        (
                            <SimpleAnimation  style={{width:'100%',paddingLeft:15,paddingRight:15}} distance={200} delay={100} duration={700}  animate={true} direction="down" movementType="slide">
                                <Item  >
                                    <Icon style={{paddingLeft:10}} type="Ionicons" name="search" />
                                    <Input style={{fontFamily:'Montserrat-Regular',color:'#000000'}} type="text" id="search" onChangeText={onSearch}  placeholder="Search Notifications" />
                                </Item>
                            </SimpleAnimation>
                        ):null

         
    const showSearchBar = () => {
        setState((state)=>({
            ...state,
            searchBar:!state.searchBar
        }))
    }


    const renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it shows loadMore
        if(state.loading)
        {
            return (

                <ActivityIndicator
                    size='large' color="#5FB8B6"
                />

             )

        }else{
            
            if(props.notifications.length > 0)
            {
                return (
              
                    <TouchableOpacity onPress={() => handleLoadMore()} style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginBottom:10,backgroundColor:'#5FB8B6',height:25,width:'30%',alignSelf:'center'}}>
                        {/* <Button iconRight block style={styles.button2} > */}
                            
                                <Icon name='refresh' style={{fontSize:16,color:'#ffffff'}} type="Ionicons" />
                                <Text style={{color:'#ffffff',fontSize:11,fontFamily:'Montserrat-Black'}}>Load More</Text>
                    
                        {/* </Button> */}
                    </TouchableOpacity>
                
                )
            }else{
                
                if(state.notifications.length > 0)
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




    
    const handleLoadMore = () => {
      
        const page = state.page + 1; // increase page by 1
        setState({...state,page:page,loading:true})
        const pagenumber = {page:page}
        props.loadingFlagNotify()           
        props.getNotifications(pagenumber) // method for API call 
      
  }

    const onRefresh = () => {
   
        const page = 1; // increase page by 1
        setState({...state,page:page,notifications:[],filtered:[]})
        const pagenumber = {page:page}
        props.loadingFlagNotify()           
        props.getNotifications(pagenumber) // method for API call 

      }


    const _renderItem = ({item}) => (
        <MyListItem
             item={item}
             navigation={props.navigation}
             styles={styles}
        />
      )

    
    return (

        <View style={styles.container}>


                {searchBar}
                <View style={{flex:1,paddingBottom:0,padding:15}}>
                    
                        <FlatList
                            data={state.filtered}
                            extraData={state}
                            refreshControl={
                                <RefreshControl
                                refreshing={state.isRefreshing}
                                onRefresh={onRefresh}
                                colors={['#5FB8B6']}
                                />
                            }
                            renderItem={_renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ListFooterComponent={renderFooter}
                            onEndReachedThreshold={0.8}
                         />
                
                    </View>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        notificationsError: state.notifications.notificationsError,
        notifications: state.notifications.notifications,
        loading: state.notifications.loading,
        checkNotifications: state.notifications.checkNotifications
    }
}



const mapDispatchToProps = (dispatch) => {

    return {
        getNotifications: (creds) => dispatch(getNotifications(creds)),
        clearNotificationsMessage:()=>dispatch(clearNotificationsMessage()),
        loadingFlagNotify:() => dispatch(loadingFlagNotify()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
