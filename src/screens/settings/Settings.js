import React, {useState,useEffect} from 'react'
import { StyleSheet, View,Text,TouchableOpacity} from 'react-native';
import { Card, CardItem,Content,Icon,Item,Input  } from 'native-base';
import { SimpleAnimation } from 'react-native-simple-animations';



function Settings(props){

    const [state,setState] = useState({
      
      
    })

    const styles = StyleSheet.create({
        container:{
            flex:1
        }

    })
    

    const logout = () => {
        props.navigation.navigate('Logout')
    }

    return (

        <View style={styles.container}>
              
                <Content contentContainerStyle={{flexGrow:1}}>
                  <SimpleAnimation  style={{width:'100%'}} distance={200} delay={400} duration={700} animate={true} direction="up" movementType="spring">
               
                       <View style={{flex:1,paddingBottom:0,padding:20}}>
                          <TouchableOpacity onPress={()=> props.navigation.navigate('EditInfo')}>
                        
                                <Card  style={{elevation:6,height:70,borderRadius:8,marginBottom:15 }}>
                                            
                                    <CardItem  style={{ borderRadius: 8,flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center' }}>
                                    
                                            <Text style={{color:'#000000',fontFamily:'Montserrat-Bold',fontSize:16}}>
                                                Edit Information
                                            </Text>

                                            <Icon style={{fontSize:30}} type="Ionicons" name="arrow-round-forward"/>
                                    

                                    </CardItem>
                            
                                </Card>
                            
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> props.navigation.navigate('ChangePassword')}>
                    
                                <Card  style={{elevation:6,height:70,borderRadius:8,marginBottom:15 }}>
                                            
                                    <CardItem  style={{ borderRadius: 8,flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center' }}>
                                    
                                            <Text style={{color:'#000000',fontFamily:'Montserrat-Bold',fontSize:16}}>
                                                Change Password
                                            </Text>

                                            <Icon style={{fontSize:30}} type="Ionicons" name="arrow-round-forward"/>
                                    

                                    </CardItem>
                            
                                </Card>
                            
                            </TouchableOpacity>
                            <TouchableOpacity onPress={logout}>
                    
                                <Card  style={{elevation:6,height:70,borderRadius:8,marginBottom:15 }}>
                                            
                                    <CardItem  style={{ borderRadius: 8,flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center' }}>
                                    
                                            <Text style={{color:'#000000',fontFamily:'Montserrat-Bold',fontSize:16}}>
                                                Logout
                                            </Text>

                                            <Icon style={{fontSize:30}} type="Ionicons" name="arrow-round-forward"/>
                                    

                                    </CardItem>
                            
                                </Card>
                            
                            </TouchableOpacity>
                       </View>
                    </SimpleAnimation>
                </Content>
        </View>
    )
}

export default Settings