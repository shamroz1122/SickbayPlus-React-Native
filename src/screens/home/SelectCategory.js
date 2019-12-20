import React, {useState,useEffect} from 'react'
import { StyleSheet, View,Text,TouchableOpacity} from 'react-native';
import { Card, CardItem,Content,Icon,Item,Input,Button  } from 'native-base';
import { SimpleAnimation } from 'react-native-simple-animations';
import { getCategories, clearCategoryMessage } from '../../redux/actions/categoriesActions'
import SpinnerOverlay from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import Dialog from "react-native-dialog";


function SelectCategory(props){

    const [state,setState] = useState({
        categories:[
         
        ],
        filtered:[
          
        ],
        searchBar:false,
        isLoading:false,
        message:'',
        icon:'',
        modal:false
    })


    useEffect(()=>{
        props.navigation.setParams({ showSearchBar: showSearchBar });

        setState(
            (state) =>({ 
              ...state,
              isLoading:true
            })
        )

        props.getCategories()
     
    },[])


    useEffect(()=>{

        if(props.categories.length)
        {
            setState(
                (state) =>({ 
                  ...state,
                  filtered : props.categories,
                  categories : props.categories,
                  isLoading:false,
                })
            )
        }
        
        if(props.categoryError)
        {
            setState({...state,isLoading:false,modal:true,message:props.categoryError,icon:'checkmark-circle'})
            props.clearCategoryMessage()
        }
        

    },[props.categories,props.categoryError])


    const styles = StyleSheet.create({
        container:{
            flex:1
        }

    })

    const categories = state.filtered.length?(
     
        state.filtered.map(category => {

            return (
                
                <TouchableOpacity key={category.id} onPress={()=>props.navigation.navigate('Doctors')}>
                    
                    <Card  style={{elevation:6,height:70,borderRadius:8,marginBottom:15 }}>
                                
                        <CardItem  style={{ borderRadius: 8,flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center' }}>
                        
                                <Text style={{color:'#000000',fontFamily:'Montserrat-Bold',fontSize:16}}>
                                {category.title}
                                </Text>

                                <Icon style={{fontSize:30}} type="Ionicons" name="arrow-round-forward"/>
                        

                        </CardItem>
                
                    </Card>
                 
                </TouchableOpacity>
            )
        })

    ) : null


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
                            <SimpleAnimation  style={{width:'100%'}} distance={200} delay={100} duration={700}  animate={true} direction="down" movementType="slide">
                                <Item  style={{elevation:2}}>
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
    
    const closeModal = () => {
        setState({...state,modal:false})
    }

    
    return (

        <View style={styles.container}>

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

                <SpinnerOverlay
                    visible={state.isLoading}
                    color="#5FB8B6"
                />

                {searchBar}
                <Content contentContainerStyle={{flexGrow:1}}>
                  {/* <SimpleAnimation  style={{width:'100%'}} distance={200} delay={400} duration={700} animate={true} direction="up" movementType="spring"> */}
               
                       <View style={{flex:1,paddingBottom:0,padding:20}}>
                           {categories}
                       </View>
                    {/* </SimpleAnimation> */}
                </Content>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        categoryError: state.categories.categoryError,
        categories: state.categories.categories
    }
} 

const mapDispatchToProps = (dispatch) => {

    return {
        getCategories: (creds) => dispatch(getCategories(creds)),
        clearCategoryMessage:()=>dispatch(clearCategoryMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory)
