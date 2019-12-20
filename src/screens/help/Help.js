import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { Textarea,H3,Button,Content } from 'native-base'
const Help = () => {

    const styles = StyleSheet.create({
        button:{
            marginTop:20,
            backgroundColor:'#5FB8B6',
            height:50,
            width:'100%'
        }
    })
    
    return (
        <View style={{flex:1,padding:20}}>
            <Content contentContainerStyle={{flexGrow:1}}>
                <View style={{flex:1,justifyContent:'space-around'}}>
                    <H3 style={{fontFamily:'Montserrat-Bold'}}>Your Question:</H3>
                    <Textarea style={{borderRadius:10,borderColor:'#5FB8B6',borderWidth:2}} rowSpan={10} />
                    <Button rounded block style={styles.button} >
                        <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Submit</Text>
                    </Button>
                </View>
            </Content>
           
        </View>
    )
}

export default Help
