import React, {useState,useEffect} from 'react'
import { StyleSheet, View,Image,Text,TouchableOpacity } from 'react-native';
import { Card, CardItem,Content } from 'native-base';
import generalMedicineImage from '../../../assets/General_medicine.png'
import pediatricsImage from '../../../assets/Pediatrics.png'
import specialistImage from '../../../assets/Specialist.png'
import medLabImage from '../../../assets/Medlab.png'
import pharmacistImage from '../../../assets/pharmacist.png'
import chatImage from '../../../assets/chatWithUs.png'
function NewBooking(props){

    const styles = StyleSheet.create({
        container:{
            flex:1
        }

    })

    return (

        <View style={styles.container}>
                <Content contentContainerStyle={{flexGrow:1}}>

          
                       <View style={{flex:1,flexDirection:'row',paddingBottom:0,justifyContent:'space-between',padding:20}}>
                           <View style={{width:'48%'}}>
                               <TouchableOpacity onPress={()=> props.navigation.navigate('Doctors')}>
                                   <Card style={{elevation:8,height:170,borderRadius: 8 }}>
                            
                                        <CardItem  style={{ borderRadius: 8,flexDirection:'column',flex:1,justifyContent:'space-around',alignItems:'center' }}>
                                    
                                                <View> 
                                                    <Image  source={generalMedicineImage} style={{ height: 91,width: 100}}/> 
                                                </View>
                                                <Text style={{color:'#000000',fontFamily:'Montserrat-Bold',fontSize:15}}>
                                                    General Medicine
                                                </Text>

                                        </CardItem>
                                
                                    </Card>
                               </TouchableOpacity>
                           </View>

                           <View style={{width:'48%'}}>
                                    <TouchableOpacity onPress={()=> props.navigation.navigate('SelectCategory')}>

                                       <Card style={{elevation:8,height:170,borderRadius: 8 }}>
                                
                                            <CardItem  style={{ borderRadius: 8,flexDirection:'column',flex:1,justifyContent:'space-around',alignItems:'center' }}>
                                        
                                                    <View> 
                                                        <Image  source={specialistImage} style={{ height: 91,width: 80}}/> 
                                                    </View>
                                                    <Text style={{color:'#000000',fontFamily:'Montserrat-Bold',fontSize:15}}>
                                                       Specialist
                                                    </Text>

                                            </CardItem>
                                    
                                        </Card>
                                    </TouchableOpacity>
                           </View>
                          
                       </View>

                       <View style={{flex:1,paddingTop:0,paddingBottom:0,flexDirection:'row',justifyContent:'space-between',padding:20}}>
                           <View style={{width:'48%'}}>
                               <TouchableOpacity onPress={()=> props.navigation.navigate('Doctors')}>
                                  
                                   <Card style={{elevation:8,height:170,borderRadius: 8 }}>
                            
                                        <CardItem  style={{ borderRadius: 8,flexDirection:'column',flex:1,justifyContent:'space-around',alignItems:'center' }}>
                                    
                                                <View> 
                                                    <Image  source={pediatricsImage} style={{ height: 91,width: 106}}/> 
                                                </View>
                                                <Text style={{color:'#000000',fontFamily:'Montserrat-Bold',fontSize:15}}>
                                                   Pediatrics
                                                </Text>

                                        </CardItem>
            
                                    </Card>
                                </TouchableOpacity>
                           </View>



                           <View style={{width:'48%'}}>
                                   <Card style={{elevation:8,height:170,borderRadius: 8 }}>
                            
                                        <CardItem  style={{ borderRadius: 8,flexDirection:'column',flex:1,justifyContent:'space-around',alignItems:'center' }}>
                                    
                                                <View> 
                                                    <Image  source={pharmacistImage} style={{ height: 96,width: 75}}/> 
                                                </View>
                                                <Text style={{color:'#000000',fontFamily:'Montserrat-Bold',fontSize:15}}>
                                                     Pharmacist
                                                </Text>

                                        </CardItem>
                                
                                    </Card>
                           </View>

                       </View>

                       <View style={{flex:1,paddingTop:0,paddingBottom:0,flexDirection:'row',justifyContent:'space-between',padding:20}}>
                   


                        <View style={{width:'48%'}}>
                                   <Card style={{elevation:8,height:170,borderRadius: 8 }}>
                            
                                        <CardItem  style={{ borderRadius: 8,flexDirection:'column',flex:1,justifyContent:'space-around',alignItems:'center' }}>
                                    
                                                <View> 
                                                    <Image  source={medLabImage} style={{ height: 91,width: 90}}/> 
                                                </View>
                                                <Text style={{color:'#000000',fontFamily:'Montserrat-Bold',fontSize:15}}>
                                                    MedLab
                                                </Text>

                                        </CardItem>
                                
                                    </Card>
                           </View>

                           <View style={{width:'48%'}}>
                                   <Card style={{elevation:8,height:170,borderRadius: 8 }}>
                            
                                        <CardItem  style={{ borderRadius: 8,flexDirection:'column',flex:1,justifyContent:'space-around',alignItems:'center' }}>
                                    
                                                <View> 
                                                    <Image  source={chatImage} style={{ height: 85,width: 95}}/> 
                                                </View>
                                                <Text style={{color:'#000000',fontFamily:'Montserrat-Bold',fontSize:15}}>
                                                    Chat With Us
                                                </Text>

                                        </CardItem>
                                
                                    </Card>
                           </View>


                       </View>

                      
                    </Content>
        </View>
    )
}

export default NewBooking