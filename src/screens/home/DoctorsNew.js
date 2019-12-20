import React, {useState,useEffect} from 'react'
import { StyleSheet, View,Text,TouchableOpacity,RefreshControl,FlatList,SafeAreaView,ScrollView } from 'react-native';
import { Card, CardItem,Content,Icon,Item,Input,Thumbnail,Body,Left,Button,Spinner} from 'native-base';
import { SimpleAnimation } from 'react-native-simple-animations';
import image from '../../../assets/doctorImage.png'
import StarRating from 'react-native-star-rating'
import { getDoctors, clearDoctorsMessage } from '../../redux/actions/doctorsActions'
//import SpinnerOverlay from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import Dialog from "react-native-dialog";



function Doctors(props){
    const DATA = [
                // {name:'Dr John Simpson',category:'Heart Surgeon',videoHourlyRate:'40',voiceHourlyRate:'30',chatHourlyRate:'20',startTime:'09.00 AM',endTime:'05.00 PM',rating:5,id:1},
                // {name:'Dr Shamroz Naseer',category:'Kidney Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'01.00 PM',rating:4.5,id:2},
                // {name:'Dr Asim Azhar',category:'Plastic Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'06.00 PM',rating:4,id:3},
                // {name:'Dr Hamza Sattar',category:'Transplant Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'12.00 PM',rating:3,id:4},
                // {name:'Dr John Simpson',category:'Heart Surgeon',videoHourlyRate:'40',voiceHourlyRate:'30',chatHourlyRate:'20',startTime:'09.00 AM',endTime:'05.00 PM',rating:5,id:5},
                // {name:'Dr Ali Naseer',category:'Kidney Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'01.00 PM',rating:4.5,id:6},
                // {name:'Dr Razzaq Azhar',category:'Plastic Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'06.00 PM',rating:4,id:7},
                // {name:'Dr Nadeem Sattar',category:'Transplant Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'12.00 PM',rating:3,id:8},
                // {name:'Dr Adnan Azhar',category:'Plastic Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'06.00 PM',rating:4,id:9},
                // {name:'Dr Talha Sattar',category:'Transplant Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'12.00 PM',rating:3,id:10}
                {
                    title: 'Main dishes',
                    data: ['Pizza', 'Burger', 'Risotto'],
                  },
                  {
                    title: 'Sides',
                    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
                  },
                  {
                    title: 'Drinks',
                    data: ['Water', 'Coke', 'Beer'],
                  },
                  {
                    title: 'Desserts',
                    data: ['Cheese Cake', 'Ice Cream'],
                  },
            ];


    const [state,setState] = useState({
        doctors:[],
        filtered:[],
        page:1,
        searchBar:false,
        isLoading:true,
        message:'',
        icon:'',
        modal:false,
        loader:true
    })
    const [refreshing, setRefreshing] = useState(false)

    useEffect(()=>{
        props.navigation.setParams({ showSearchBar: showSearchBar })
        const page = {page:state.page}
        props.getDoctors(page)
     
     
    },[])


    useEffect(()=>{
  
        if(props.doctors.length > 0)
        {
       
            setState(
                (state) =>({ 
                  ...state,
                  filtered : props.doctors,
                  doctors : props.doctors,
                  isLoading:false,
                  loader:false
                })
            )
        }
        
        if(props.doctorError)
        {
            setState({...state,isLoading:false,modal:true,loader:false,message:props.doctorError,icon:'checkmark-circle'})
            props.clearDoctorsMessage()
        }
        
     setRefreshing(false)
    },[props.doctors,props.doctorError])

    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        button:{
            backgroundColor:'#5FB8B6',
            height:25,
            width:'60%'
        },
        header: {
            fontSize: 32,
        },
        container: {
            flex: 1,
           
            marginHorizontal: 16,
          },
    })

    const doctors = state.filtered.length?(
     
        state.filtered.map(doctor => {

            var currentTime = new Date().getHours() +'.' + new Date().getMinutes() 
        
            var time = doctor.endTime;
            var hours = Number(time.match(/^(\d+)/)[1]);
            var minutes = Number(time.match(/.(\d+)/)[1]);
            var AMPM = time.match(/\s(.*)$/)[1];
            if(AMPM == "PM" && hours<12) hours = hours+12;
            if(AMPM == "AM" && hours==12) hours = hours-12;
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if(hours<10) sHours = "0" + sHours;
            if(minutes<10) sMinutes = "0" + sMinutes;
            var endTime = sHours + "." + sMinutes
          
           //.log(currentTime+' < '+endTime)
            var available = false
            if(Number(currentTime)<Number(endTime))
            {
             //   console.log('hello')
                available = true
            }

            return (
                <SimpleAnimation key={doctor.id}  style={{width:'100%'}} distance={200} delay={300} duration={700} animate={true} direction="up" movementType="spring">
                <Card  style={{elevation:6,height:150,borderRadius:15,marginBottom:15 }}>
                            
                    <CardItem  style={{ borderRadius: 15,flex:1,flexDirection:'column',alignItems:'center',justifyContent:'space-between' }}>
                       
                        <View style={{flex:2,flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                            <Left>
                                <Thumbnail large source={image} />
                                <Body>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:14}}>{ doctor.name  }</Text>
                                        <View style={{width: 10, height: 10, borderRadius: 10/2, backgroundColor: available?'#90ee90':'orange'}}></View>
                                    </View>
                                  
                                    <Text style={{color:'#5FB8B6',fontFamily:'Montserrat-Bold',fontSize:12}}>{ doctor.category }</Text>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'90%'}}>
                                       <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="videocam"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>${doctor.videoHourlyRate}/hr</Text> 
                                       <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="call"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>${doctor.voiceHourlyRate}/hr</Text> 
                                       <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="chatboxes"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>${doctor.chatHourlyRate}/hr</Text> 
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'70%'}}>
                                       <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="time"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>{doctor.startTime}</Text> 
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#5FB8B6',fontSize:10}}>TO</Text> 
                                       <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>{doctor.endTime}</Text> 
                                    
                                    </View>
                                </Body>
                            </Left>
                        </View>

                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                            <View style={{width:'50%'}}>
                            <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={12}
                                    containerStyle={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'50%'}}
                                    rating={doctor.rating}
                                    fullStarColor="orange"
                                    emptyStarColor="orange"
                            />
                            </View>
                            <View style={{width:'50%',flexDirection:'row',justifyContent:'flex-end'}}>
                                <Button onPress={() => props.navigation.navigate('AskAQuestion',{doctor:doctor})}  rounded block style={styles.button} >
                                   <Text style={{color:'#ffffff',fontSize:10,fontFamily:'Montserrat-Black'}}>BOOK NOW</Text>
                                </Button>
                            </View>

                        </View>
                    

                    </CardItem>
            
                </Card>
                </SimpleAnimation>
            )
        })

    ) : <Text style={{fontFamily:'Montserrat-Black',textAlign:'center',color:'#000000'}}>No Doctor Found!</Text>

    
    const onSearch = (text) => {

        // Variable to hold the original version of the list
        let currentList = []
        // Variable to hold the filtered list before putting into state
        let newList = []
        // If the search bar isn't empty
        if (text !== "") {
         
                currentList = state.doctors;
                
                newList = currentList.filter(item => {
                        
                    const name = item.name.toLowerCase();
                    const nameFilter = text.toLowerCase();

                    return name.includes(nameFilter)
                });

          }else{
                 // If the search bar is empty, set newList to original task list
                  newList = state.doctors;
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
                            <SimpleAnimation  style={{width:'100%'}} distance={200} delay={100} duration={400}  animate={true} direction="down" movementType="slide">
                                <Item  style={{elevation:2}}>
                                    <Icon style={{paddingLeft:10}} type="Ionicons" name="search" />
                                    <Input style={{fontFamily:'Montserrat-Regular',color:'#000000'}} type="text" id="search" onChangeText={onSearch}  placeholder="Search Doctor" />
                                </Item>
                            </SimpleAnimation>
                        ):null

         
    const showSearchBar = () => {
        setState((state)=>({
            ...state,
            searchBar:!state.searchBar
        }))
    }

    const closeModal = () => {
        setState({...state,modal:false})
    }


    const onRefreshDoctors = React.useCallback(() => {
        
            setRefreshing(true)
            let pageNumber = state.page+1
            let page = {page:pageNumber}
            setState({...state,page:pageNumber})
            props.getDoctors(page)
 
      }, [state.page,state.loader]);




    return (

        <View style={styles.container}>
                {/* <SpinnerOverlay
                    visible={state.isLoading}
                    color="#5FB8B6"
                /> */}

            <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0}} footerStyle={{height:130}}   visible={state.modal}>
                
                
                <View style={{height:130,flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'#5FB8B6'}}>
                    <Icon style={{fontSize:60,color:'#ffffff'}} type="Ionicons" name={state.icon}/>
                    <Text style={{fontFamily:'Montserrat-Black',color:'#ffffff'}}> {state.message} </Text>
                </View>
                <View style={{height:130,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                    <View style={{width:'70%'}}>
                        <Button onPress={closeModal} rounded block style={styles.button} >
                            <Text style={{fontSize:20,fontFamily:'Montserrat-Black',color:'#ffffff'}}>OK</Text>
                        </Button>
                    </View>
                
                </View>
            
            </Dialog.Container>

                {searchBar}
                {/* <Content 
                 contentContainerStyle={{flexGrow:1}} 
                 refreshControl={
                    <RefreshControl colors={['#5FB8B6']} refreshing={refreshing} onRefresh={onRefreshDoctors} tintColor="#5FB8B6" />
                  } 
                > */}
                   
                        <View style={{flex:1,paddingBottom:0,paddingTop:20}}>
                            {/* {doctors.length>1?doctors:null} */}
                          
                            <SafeAreaView>
                      

                     
                            {state.filtered.length>0?
                            <FlatList
                                    data={state.filtered}
                                    initialNumToRender={4}
                                   
                                    onEndReached={() =>  { 
                                        console.log('hello') 
                                        setState({...state,loader:true}) 
                                    }}
                               
                                
                                    renderItem={({ item }) =>{


                                        var currentTime = new Date().getHours() +'.' + new Date().getMinutes() 
        
                                        var time = item.endTime;
                                        var hours = Number(time.match(/^(\d+)/)[1]);
                                        var minutes = Number(time.match(/.(\d+)/)[1]);
                                        var AMPM = time.match(/\s(.*)$/)[1];
                                        if(AMPM == "PM" && hours<12) hours = hours+12;
                                        if(AMPM == "AM" && hours==12) hours = hours-12;
                                        var sHours = hours.toString();
                                        var sMinutes = minutes.toString();
                                        if(hours<10) sHours = "0" + sHours;
                                        if(minutes<10) sMinutes = "0" + sMinutes;
                                        var endTime = sHours + "." + sMinutes
                                      
                                       //.log(currentTime+' < '+endTime)
                                        var available = false
                                        if(Number(currentTime)<Number(endTime))
                                        {
                                         //   console.log('hello')
                                            available = true
                                        }



                                        return (
                                                <TouchableOpacity onPress={() => props.navigation.navigate('AskAQuestion',{doctor:item})} >

                                               
                                                    <Card  style={{elevation:6,height:150,borderRadius:15,marginBottom:15 }}>
                                                                
                                                        <CardItem  style={{ borderRadius: 15,flex:1,flexDirection:'column',alignItems:'center',justifyContent:'space-between' }}>
                                                        
                                                            <View style={{flex:2,flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                                                                <Left>
                                                                    <Thumbnail large source={image} />
                                                                    <Body>
                                                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                                            <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:14}}>{ item.name  }</Text>
                                                                            <View style={{width: 10, height: 10, borderRadius: 10/2, backgroundColor: available?'#90ee90':'orange'}}></View>
                                                                        </View>
                                                                    
                                                                        <Text style={{color:'#5FB8B6',fontFamily:'Montserrat-Bold',fontSize:12}}>{ item.category }</Text>
                                                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'90%'}}>
                                                                        <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="videocam"/>
                                                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>${item.videoHourlyRate}/hr</Text> 
                                                                        <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="call"/>
                                                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>${item.voiceHourlyRate}/hr</Text> 
                                                                        <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="chatboxes"/>
                                                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>${item.chatHourlyRate}/hr</Text> 
                                                                        </View>
                                                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'70%'}}>
                                                                        <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="time"/>
                                                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>{item.startTime}</Text> 
                                                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#5FB8B6',fontSize:10}}>TO</Text> 
                                                                        <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>{item.endTime}</Text> 
                                                                        
                                                                        </View>
                                                                    </Body>
                                                                </Left>
                                                            </View>
                                    
                                                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                                                                <View style={{width:'50%'}}>
                                                                <StarRating
                                                                        disabled={false}
                                                                        maxStars={5}
                                                                        starSize={12}
                                                                        containerStyle={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'50%'}}
                                                                        rating={item.rating}
                                                                        fullStarColor="orange"
                                                                        emptyStarColor="orange"
                                                                />
                                                                </View>
                                                                <View style={{width:'50%',flexDirection:'row',justifyContent:'flex-end'}}>
                                                                    <Button onPress={() => props.navigation.navigate('AskAQuestion',{doctor:item})}  rounded block style={styles.button} >
                                                                    <Text style={{color:'#ffffff',fontSize:10,fontFamily:'Montserrat-Black'}}>BOOK NOW</Text>
                                                                    </Button>
                                                                </View>
                                    
                                                            </View>
                                                        
                                    
                                                        </CardItem>
                                                
                                                    </Card>
                                                    </TouchableOpacity>
                                        )
                                    }}
                                    keyExtractor={item => item.id}
                                    
                            />  :null}
                             {state.loader==true?<Spinner  color="#5FB8B6" />:null}
                         
                        </SafeAreaView>
              
                    </View>
                
                    
                {/* </Content> */}
        </View>
        
    )
    
}


const mapStateToProps = (state) => {
    return {
        doctorError: state.doctors.doctorError,
        doctors: state.doctors.doctors
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getDoctors: (creds) => dispatch(getDoctors(creds)),
        clearDoctorsMessage:()=>dispatch(clearDoctorsMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Doctors)