import React,{useState} from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { Textarea,H3,Button,Content,Icon } from 'native-base'
import { connect } from 'react-redux'
import {help} from '../../redux/actions/authActions'
import Dialog from "react-native-dialog";

const Help = (props) => {

    const [state,setState] = useState({
        isLoading:false,
        modal:false,
        message:'',
        helpText:''
    })


    const styles = StyleSheet.create({
        button:{
            marginTop:20,
            backgroundColor:'#5FB8B6',
            height:50,
            width:'100%'
        }
    })




    const submitHelp = () => {

        if(state.helpText!='')
        {
            setState({...state,helpText:'',modal:true,message:"We will contact you within 24 hours via email at "+props.user.email,icon:'checkmark-circle'})
            let data = {message:state.helpText,id:props.user.id}
            props.help(data)

        }else{

            setState({...state,modal:true,message:"Please enter help text.",icon:'close-circle',})
      
        }
      
    }

    const onChangeHelpText = (text) => {

        setState({...state,helpText:text})

    }
    
    return (
        <View style={{flex:1,padding:20}}>

            <Dialog.Container headerStyle={{margin:0}} contentStyle={{padding:0}} footerStyle={{height:130}}   visible={state.modal}>
                 
                 <View style={{height:130,flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'#5FB8B6'}}>
                     <Icon style={{fontSize:60,color:'#ffffff'}} type="Ionicons" name={state.icon}/>
                     <Text style={{fontFamily:'Montserrat-Bold',color:'#ffffff',padding:10}}> {state.message} </Text>
                 </View>
                 <View style={{height:130,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                     <View style={{width:'70%'}}>
                         <Button onPress={()=> setState({...state,modal:false})} rounded block style={styles.button} >
                             <Text style={{fontSize:20,fontFamily:'Montserrat-Black',color:'#ffffff'}}>OK</Text>
                         </Button>
                     </View>
                     
                 </View>
             
              </Dialog.Container>
     


            <Content contentContainerStyle={{flexGrow:1}}>
                <View style={{flex:1,justifyContent:'space-around'}}>
                    <H3 style={{fontFamily:'Montserrat-Bold'}}>Your Question:</H3>
                    <Textarea value={state.helpText} onChangeText={onChangeHelpText} style={{borderRadius:10,borderColor:'#5FB8B6',borderWidth:2}} rowSpan={10} />
                    <Button onPress={submitHelp} rounded block style={styles.button} >
                        <Text style={{color:'#ffffff',fontSize:20,fontFamily:'Montserrat-Black'}}>Submit</Text>
                    </Button>
                </View>
            </Content>
           
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        helpSuccess: state.auth.helpSuccess,
        helpMsg: state.auth.helpMsg
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        help: (creds) => dispatch(help(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help)


