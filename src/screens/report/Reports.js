import React, {useState,useEffect} from 'react'
import { StyleSheet, View,Text,TouchableOpacity,RefreshControl,FlatList,ActivityIndicator,Linking  } from 'react-native';
import { Card, CardItem,Icon,Item,Input,Left,Body  } from 'native-base';
import { SimpleAnimation } from 'react-native-simple-animations';
import { getReports, clearReportsMessage,loadingFlagReport } from '../../redux/actions/reportsActions'
import { connect } from 'react-redux'


class MyListItem extends React.PureComponent {

    render() { 

      return (
      
                            <TouchableOpacity key={this.props.item.id} activeOpacity={1} onPress={ ()=>{ Linking.openURL(this.props.item.pdf)}}>
                            <Card style={this.props.styles.card} >
                                <CardItem style={{paddingTop:0,paddingBottom:0,paddingLeft:0,paddingRight:0}}>

                                <View style={{flex:1,flexDirection:'row'}}>
                                    <View style={{flex:5,alignItems:'center',justifyContent:'center',padding:15}}>
                                            <Left>
                                            <View style={this.props.styles.myButton}>
                                            <Icon name="clipboard" style={{color:'#ffffff'}}/>
                                            </View>
                                            <Body>
                                                 <Text style={{fontSize:12,fontFamily:'Montserrat-Bold',color:'#000000'}}>{ this.props.item.title}</Text>
                                                 <Text style={{fontSize:16,color:'#5FB8B6',fontFamily:'Montserrat-Bold'}}>{this.props.item.doctor}</Text>
                                                 <View style={{flexDirection:'row',alignItems:'center',width:'60%'}}>
                                                    <Icon style={{color:'#5FB8B6',fontSize:14}} type="Ionicons" name="calendar"/>
                                                    <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12,paddingLeft:8}}>{this.props.item.date}</Text> 
                                                    <Icon style={{color:'#5FB8B6',fontSize:14,paddingLeft:8}} type="Ionicons" name="time"/>
                                                    <Text style={{fontFamily:'Montserrat-Bold',color:'#000000',fontSize:12,paddingLeft:8}}>{this.props.item.time}</Text> 
                                                </View>
                                                
                                               
                                            </Body>
                                        </Left>
                                    </View>
                                    <View style={{backgroundColor:'#5FB8B6',flex:1,alignItems:'center',justifyContent:'center'}} >
                                    
                                            <Text>
                                                <Icon  style={{fontSize:32,color:'#ffffff'}}  name="download"  />
                                            </Text>
                                        
                                                {/* <Text style={{fontSize:12,color:'#ffffff'}}>VIEW</Text> */}
                                        
                                    
                                    </View>
                                </View>

                                </CardItem>
                            </Card>
                            </TouchableOpacity>




      )
    }

  }

function Reports(props){

    const [state,setState] = useState({
        reports:[],
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

        if(props.reports.length > 0 && props.checkReports==1)
        {
            setState(
                (state) =>({ 
                    ...state,
                    filtered: [...state.filtered,...props.reports],
                    reports : [...state.reports,...props.reports],
                    loading:false,
                    isRefreshing:false
                })
            )
            //props.clearReportsMessage()
  
        }else if(state.reports.length == 0 && props.checkReports==3){
            
        
            props.navigation.setParams({ showSearchBar: showSearchBar })
            setState({...state,loading:true})
            const pageNumber = {page:state.page}
            props.getReports(pageNumber)

        }else if(state.reports.length == 0 && props.checkReports==2){
            
            setState({...state,loading:false})
    
        }

    },[props.reports,props.checkReports])

    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        card :{
            elevation: 4,
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
         
                      currentList = state.reports;
                      newList = currentList.filter(item => {
                            
                      const doctor = item.doctor.toLowerCase();
                      const doctorFilter = text.toLowerCase();

                      const title = item.title.toLowerCase();
                      const titleFilter = text.toLowerCase();

                      const appointmentDate = item.appointmentDate.toLowerCase();
                      const appointmentDateFilter = text.toLowerCase();

                      const appointmentTime = item.appointmentTime.toLowerCase();
                      const appointmentTimeFilter = text.toLowerCase();

                      return doctor.includes(doctorFilter) || title.includes(titleFilter) ||  appointmentDate.includes(appointmentDateFilter) || appointmentTime.includes(appointmentTimeFilter)
                    });

          }else {
                // If the search bar is empty, set newList to original task list
                  newList = state.reports;
               
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
                                    <Input style={{fontFamily:'Montserrat-Regular',color:'#000000'}} type="text" id="search" onChangeText={onSearch}  placeholder="Search Reports" />
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
            if(props.reports.length > 0)
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

                if(state.reports.length > 0 )
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
        props.loadingFlagReport()           
        props.getReports(pagenumber) // method for API call 
      
  }

    const onRefresh = () => {
   
        const page = 1; // increase page by 1
        setState({...state,page:page,reports:[],filtered:[]})
        const pagenumber = {page:page}
        props.loadingFlagReport()           
        props.getReports(pagenumber) // method for API call 
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
        roportError: state.reports.roportError,
        reports: state.reports.reports,
        loading: state.reports.loading,
        checkReports: state.reports.checkReports
    }
}



const mapDispatchToProps = (dispatch) => {

    return {
        getReports: (creds) => dispatch(getReports(creds)),
        clearReportsMessage:()=>dispatch(clearReportsMessage()),
        loadingFlagReport:() => dispatch(loadingFlagReport())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
