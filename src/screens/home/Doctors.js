import React, {useState,useEffect} from 'react'
import { StyleSheet, View,Text,TouchableOpacity,RefreshControl,FlatList,ActivityIndicator } from 'react-native';
import { Card, CardItem,Icon,Item,Input,Thumbnail,Body,Left,Button} from 'native-base';
import { SimpleAnimation } from 'react-native-simple-animations';
import image from '../../../assets/doctorImage.png'
import StarRating from 'react-native-star-rating'
import { getDoctors, clearDoctorsMessage,loadingFlag } from '../../redux/actions/doctorsActions'
import { connect } from 'react-redux'



class MyListItem extends React.PureComponent {

    render() { 

        var currentTime = new Date().getHours() +'.' + new Date().getMinutes() 
        var time = this.props.item.endTime;
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
      
    
        var available = false
        if(Number(currentTime)<Number(endTime))
        {
       
            available = true
        }

      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AskAQuestion',{doctor:this.props.item})} >

                                               
        <Card  style={{elevation:6,height:150,borderRadius:15,marginBottom:15 }}>
                    
            <CardItem  style={{ borderRadius: 15,flex:1,flexDirection:'column',alignItems:'center',justifyContent:'space-between' }}>
            
                <View style={{flex:2,flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                    <Left>
                        <Thumbnail large source={image} />
                        <Body>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:14}}>{ this.props.item.name  }</Text>
                                <View style={{width: 10, height: 10, borderRadius: 10/2, backgroundColor: available?'#90ee90':'orange'}}></View>
                            </View>
                        
                            <Text style={{color:'#5FB8B6',fontFamily:'Montserrat-Bold',fontSize:12}}>{ this.props.item.category }</Text>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'90%'}}>
                            <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="videocam"/>
                            <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>${this.props.item.videoHourlyRate}/hr</Text> 
                            <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="call"/>
                            <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>${this.props.item.voiceHourlyRate}/hr</Text> 
                            <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="chatboxes"/>
                            <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>${this.props.item.chatHourlyRate}/hr</Text> 
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'70%'}}>
                            <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="time"/>
                            <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>{this.props.item.startTime}</Text> 
                            <Text style={{fontFamily:'Montserrat-Bold',color:'#5FB8B6',fontSize:10}}>TO</Text> 
                            <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:10}}>{this.props.item.endTime}</Text> 
                            
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
                            rating={this.props.item.rating}
                            fullStarColor="orange"
                            emptyStarColor="orange"
                    />
                    </View>
                    <View style={{width:'50%',flexDirection:'row',justifyContent:'flex-end'}}>
                        <Button onPress={() => props.navigation.navigate('AskAQuestion',{doctor:this.props.item})}  rounded block style={{backgroundColor:'#5FB8B6',height:25,width:'60%'}} >
                        <Text style={{color:'#ffffff',fontSize:10,fontFamily:'Montserrat-Black'}}>BOOK NOW</Text>
                        </Button>
                    </View>

                </View>
            

            </CardItem>
    
        </Card>
        </TouchableOpacity>
      )
    }



  }


function Doctors(props){
   

    const [state,setState] = useState({
        doctors:[],
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
 
        if(props.doctors.length > 0 && props.checkDoctors==1)
        {
            setState(
                (state) =>({ 
                    ...state,
                    filtered: [...state.filtered,...props.doctors],
                    doctors : [...state.doctors,...props.doctors],
                    loading:false,
                    isRefreshing:false
                })
            )
           // props.clearDoctorsMessage()
            
        }else if(state.doctors.length == 0 && props.checkDoctors==3){
            
         
            props.navigation.setParams({ showSearchBar: showSearchBar })
            setState({...state,loading:true})
            const pageNumber = {page:state.page}
            props.getDoctors(pageNumber)

        }else if(state.doctors.length == 0 && props.checkDoctors==2){
            
            setState({...state,loading:false})
    
        }

    },[props.doctors,props.checkDoctors])

  

    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        button:{
            backgroundColor:'#5FB8B6',
            height:25,
            width:'60%'
        },
        button2:{
            backgroundColor:'#5FB8B6',
            height:25,
            width:'35%'
        },
        header: {
            fontSize: 32,
        },
        container: {
            flex: 1,
           
            marginHorizontal: 16,
          },
    })

 
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
                                <Item  style={{}}>
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

            if(props.doctors.length > 0)
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
                return (
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <Text style={{color:'#000000',fontFamily:'Montserrat-Black'}}>No Record Found!</Text>
                    </View>
                )
            }

        }
        
    }

    const handleLoadMore = () => {
      
   
          const page = state.page + 1; // increase page by 1
          setState({...state,page:page,loading:true})
          const pagenumber = {page:page}
          props.loadingFlag()           
          props.getDoctors(pagenumber) // method for API call 
        
    }

    const onRefresh = () => {
   
        const page = 1; // increase page by 1
        setState({...state,page:page,doctors:[],filtered:[]})
        const pagenumber = {page:page}
        props.loadingFlag()           
        props.getDoctors(pagenumber) // method for API call 
      }

      const _renderItem = ({item}) => (
        <MyListItem
             item={item}
             navigation={props.navigation}
        />
      )


    return (

        <View style={styles.container}>

                {searchBar}
                <View style={{flex:1,paddingBottom:0,paddingTop:10}}>
                    
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
        doctorError: state.doctors.doctorError,
        doctors: state.doctors.doctors,
        loading: state.doctors.loading,
        checkDoctors: state.doctors.checkDoctors
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getDoctors: (creds) => dispatch(getDoctors(creds)),
        clearDoctorsMessage:()=>dispatch(clearDoctorsMessage()),
        loadingFlag:() => dispatch(loadingFlag())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Doctors)