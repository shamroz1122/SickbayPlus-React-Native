import React from 'react'
import { StyleSheet, View} from 'react-native';
import { Card, CardItem,H1,H3,Thumbnail,Text,Icon } from 'native-base';
import image from '../../../assets/doctorImage.png'

function MyProfile(props){

    const styles = StyleSheet.create({
        container:{
            flex:1
        }
    })

    return (

        <View style={styles.container}>

                       <View style={{flex:1,backgroundColor:'#5FB8B6',alignItems:'center',justifyContent:'space-around'}}>
                               <View >
                                  <H1 style={{fontFamily:'Montserrat-Black',color:'#ffffff'}}>MY PROFILE</H1>
                               </View>
                               <View>
                                
                               </View> 
                       </View>

                       <View style={{flex:2,backgroundColor:'#ffffff',padding:20}}>
              
                            <Card style={{elevation:8,height:350,bottom:110,borderRadius: 15}}>
                            
                                <CardItem   style={{ borderRadius: 15,flex:1,flexDirection:'column',justifyContent:'space-between' }}>
                                    <Thumbnail style={{borderColor:'#5FB8B6',borderWidth:2}} large source={image} />
                                    <H3 style={{fontFamily:'Montserrat-Bold'}}>SHAMROZ NASEER</H3>
                                    <Text style={{fontFamily:'Montserrat-Bold',fontSize:10,color:'#5FB8B6'}}>Patient(s) ID No: 248446 </Text>
                                    <View style={{borderBottomColor: '#5FB8B6',borderBottomWidth: 1,width:'10%'}}/>
                                    <View style={{flexDirection:'row',alignItems:'center'}}> 
                                       <Icon style={{color:'#5FB8B6',fontSize:16,paddingLeft:10}} type="Ionicons" name="mail"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',fontSize:14,color:'#000000'}}>shamroz@gmail.com </Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}> 
                                       <Icon style={{color:'#5FB8B6',fontSize:16,paddingLeft:10}} type="Ionicons" name="call"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',fontSize:14,color:'#000000'}}>+234 4587 895 </Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}> 
                                       <Icon style={{color:'#5FB8B6',fontSize:16,paddingLeft:10}} type="Ionicons" name="flag"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',fontSize:14,color:'#000000'}}>Nigeria </Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}> 
                                       <Icon style={{color:'#5FB8B6',fontSize:16,paddingLeft:10}} type="Ionicons" name="pin"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',fontSize:14,color:'#000000'}}>85 Allen Ave, Allen, Ikeja, Nigeria </Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}> 
                                       <Icon style={{color:'#5FB8B6',fontSize:16,paddingLeft:10}} type="Ionicons" name="medkit"/>
                                       <Text style={{fontFamily:'Montserrat-Bold',fontSize:14,color:'#000000'}}>Health Insurance <Text style={{color:'#5FB8B6'}}>(Yes) </Text> </Text>
                                    </View>
                                </CardItem>
                     
                             </Card>

                       </View>
              
        </View>
    )
}

export default MyProfile