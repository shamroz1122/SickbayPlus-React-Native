import React, {useState,useEffect} from 'react'
import { StyleSheet, View,Text,TouchableOpacity,RefreshControl,FlatList,ActivityIndicator } from 'react-native';
import { Card, CardItem,Icon,Item,Input  } from 'native-base';
import { SimpleAnimation } from 'react-native-simple-animations';
import { getCategories, clearCategoryMessage,loadingFlag } from '../../redux/actions/categoriesActions'
import { connect } from 'react-redux'


class MyListItem extends React.PureComponent {

    render() { 

      return (
           <TouchableOpacity onPress={()=>this.props.navigation.navigate('Doctors')}>
                    
                    <Card  style={{elevation:6,height:70,borderRadius:8,marginBottom:15 }}>
                                
                        <CardItem  style={{ borderRadius: 8,flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center' }}>
                        
                                <Text style={{color:'#000000',fontFamily:'Montserrat-Bold',fontSize:16}}>
                                {this.props.item.title}
                                </Text>

                                <Icon style={{fontSize:30}} type="Ionicons" name="arrow-round-forward"/>
                        
                        </CardItem>
                
                    </Card>
                 
            </TouchableOpacity>
      )
    }

  }

function SelectCategory(props){

    const [state,setState] = useState({
        categories:[],
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

        if(props.categories.length > 0 && props.checkCategories==true)
        {
            setState(
                (state) =>({ 
                    ...state,
                    filtered: [...state.filtered,...props.categories],
                    categories : [...state.categories,...props.categories],
                    loading:false,
                    isRefreshing:false
                })
            )
            props.clearCategoryMessage()
            
        }else if(state.categories.length == 0 && props.checkCategories==false){
            
        
            props.navigation.setParams({ showSearchBar: showSearchBar })
            setState({...state,loading:true})
            const pageNumber = {page:state.page}
            props.getCategories(pageNumber)

        }

    },[props.categories,props.checkCategories])

    const styles = StyleSheet.create({
        container:{
            flex:1
        }

    })

    const onSearch = (text) => {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];
        // If the search bar isn't empty
        if (text !== "") {
         
                      currentList = state.categories;
                     
                      newList = currentList.filter(item => {
                            
                      const name = item.title.toLowerCase();
                      const nameFilter = text.toLowerCase();

                      return name.includes(nameFilter)
                    });

          }else {
                // If the search bar is empty, set newList to original task list
                  newList = state.categories;
               
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
                                    <Input style={{fontFamily:'Montserrat-Regular',color:'#000000'}} type="text" id="search" onChangeText={onSearch}  placeholder="Search Category" />
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
            return (

                <TouchableOpacity onPress={() => handleLoadMore()} style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginBottom:10,backgroundColor:'#5FB8B6',height:25,width:'30%',alignSelf:'center'}}>
                    {/* <Button iconRight block style={styles.button2} > */}
                        
                            <Icon name='refresh' style={{fontSize:16,color:'#ffffff'}} type="Ionicons" />
                            <Text style={{color:'#ffffff',fontSize:11,fontFamily:'Montserrat-Black'}}>Load More</Text>
                
                    {/* </Button> */}
                </TouchableOpacity>
               
            
            )
        }
        
    }




    
    const handleLoadMore = () => {
      
   
        const page = state.page + 1; // increase page by 1
        setState({...state,page:page,loading:true})
        const pagenumber = {page:page}
        props.loadingFlag()           
        props.getCategories(pagenumber) // method for API call 
      
  }

    const onRefresh = () => {
   
        const page = 1; // increase page by 1
        setState({...state,page:page,categories:[],filtered:[]})
        const pagenumber = {page:page}
        props.loadingFlag()           
        props.getCategories(pagenumber) // method for API call 
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
        categoryError: state.categories.categoryError,
        categories: state.categories.categories,
        loading: state.categories.loading,
        checkCategories: state.categories.checkCategories
    }
}



const mapDispatchToProps = (dispatch) => {

    return {
        getCategories: (creds) => dispatch(getCategories(creds)),
        clearCategoryMessage:()=>dispatch(clearCategoryMessage()),
        loadingFlag:() => dispatch(loadingFlag())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory)
