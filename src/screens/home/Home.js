import React, {useState,useEffect} from 'react'
import { StyleSheet, View,Image,TouchableOpacity,Text,ImageBackground } from 'react-native';
import { Card, CardItem,H1,H3 } from 'native-base';
import myBookingImage from '../../../assets/My_booking.png'
import newBooking from '../../../assets/New_booking.png'
import watermark from '../../../assets/watermark.png'
import { connect } from 'react-redux'

function Home(props){

    const styles = StyleSheet.create({
        container:{
            flex:1
        }

    })

    return (

        <View style={styles.container}>

                       {/* <View style={{flex:1,backgroundColor:'#5FB8B6',alignItems:'center',justifyContent:'space-around'}}> */}
                       <ImageBackground source={watermark} style={{width: '100%', height: '100%',flex:1,backgroundColor:'#5FB8B6',alignItems:'center',justifyContent:'space-around'}}> 
                                {/* <View style={{alignSelf:'flex-start',paddingLeft:10}}>
                                    <Text style={{fontFamily:'Montserrat-Black',color:'#ffffff'}}>
                                       Welcome {props.user.name}
                                    </Text>
                                </View> */}
                            
                               <View >
                                  <H1 style={{fontFamily:'Montserrat-Black',color:'#ffffff'}}>HOME</H1>
                               </View>
                               <View>
                                
                               </View> 
                               </ImageBackground> 
                       {/* </View> */}
                       <View style={{flex:2,backgroundColor:'#ffffff',padding:20}}>
                    
                           <Card style={{elevation:8,height:200,bottom:110,borderRadius: 15 }}>
                            
                                    <CardItem style={{ borderRadius: 15,flexDirection:'column',flex:1,justifyContent:'space-around',alignItems:'center' }}>
                                       <TouchableOpacity style={{width:'100%',flexDirection:'column',flex:1,justifyContent:'space-around',alignItems:'center' }} onPress={() => props.navigation.navigate('NewBooking')}>
                                            <View> 
                                                <Image  source={newBooking} style={{ height: 110,width: 80}}/> 
                                            </View>
                                            <H3 style={{color:'#000000',fontFamily:'Montserrat-Bold'}}>
                                                New Booking 
                                            </H3>
                                        </TouchableOpacity>
                                    </CardItem>
                                
                            </Card>
                    
                            <Card style={{elevation:8,height:200,bottom:90,borderRadius: 15 }}>
                                <CardItem  style={{ borderRadius: 15,flexDirection:'column',flex:1,justifyContent:'space-around',alignItems:'center' }}>
                                    <TouchableOpacity  style={{width:'100%', flexDirection:'column',flex:1,justifyContent:'space-around',alignItems:'center' }} onPress={() => props.navigation.navigate('MyAppointments')}>
                            
                                        <View> 
                                            <Image  source={myBookingImage} style={{ height: 110,width: 110}}/> 
                                        </View>
                                        <H3 style={{color:'#000000',fontFamily:'Montserrat-Bold'}}>
                                            My Bookings 
                                        </H3>
                                    </TouchableOpacity>
                                </CardItem>
                            
                            </Card>
                    
                       </View>
              
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
     
    }
}

export default connect(mapStateToProps, null)(Home)
