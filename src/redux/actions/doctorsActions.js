import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-community/async-storage';


// Reset Password by emails
export const getDoctors = Data => dispatch => {

        setBasePath() 
        let data = []

        if(Data.page==1)
        {
            data = [
                {name:'Dr John Simpson',category:'Heart Surgeon',videoHourlyRate:'40',voiceHourlyRate:'30',chatHourlyRate:'20',startTime:'09.00 AM',endTime:'05.00 PM',rating:5,id:1},
                {name:'Dr Shamroz Naseer',category:'Kidney Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'01.00 PM',rating:4.5,id:2},
                {name:'Dr Asim Azhar',category:'Plastic Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'06.00 PM',rating:4,id:3},
                {name:'Dr Hamza Sattar',category:'Transplant Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'12.00 PM',rating:3,id:4},
                {name:'Dr Hazi Ali',category:'Heart Surgeon',videoHourlyRate:'40',voiceHourlyRate:'30',chatHourlyRate:'20',startTime:'09.00 AM',endTime:'05.00 PM',rating:5,id:5},
                {name:'Dr Ali Naseer',category:'Kidney Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'01.00 PM',rating:4.5,id:6},
                {name:'Dr Razzaq Azhar',category:'Plastic Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'06.00 PM',rating:4,id:7},
                {name:'Dr Nadeem Sattar',category:'Transplant Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'12.00 PM',rating:3,id:8},
                {name:'Dr Adnan Azhar',category:'Plastic Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'06.00 PM',rating:4,id:9},
                {name:'Dr Talha Sattar',category:'Transplant Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'12.00 PM',rating:3,id:10},
              
            
            ]
    
        }else if(Data.page==2)
        {
            data = [
                {name:'Dr John',category:'Heart Surgeon',videoHourlyRate:'40',voiceHourlyRate:'30',chatHourlyRate:'20',startTime:'09.00 AM',endTime:'05.00 PM',rating:5,id:11},
                {name:'Dr Shamroz',category:'Kidney Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'01.00 PM',rating:4.5,id:12},
                {name:'Dr Asim',category:'Plastic Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'06.00 PM',rating:4,id:13},
                {name:'Dr Hamza',category:'Transplant Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'12.00 PM',rating:3,id:14},
                {name:'Dr Ali',category:'Heart Surgeon',videoHourlyRate:'40',voiceHourlyRate:'30',chatHourlyRate:'20',startTime:'09.00 AM',endTime:'05.00 PM',rating:5,id:15},
                {name:'Dr Shamroz',category:'Kidney Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'01.00 PM',rating:4.5,id:16},
                {name:'Dr Razzaq ',category:'Plastic Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'06.00 PM',rating:4,id:17},
                {name:'Dr Nadeem',category:'Transplant Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'12.00 PM',rating:3,id:18},
                {name:'Dr Adnan',category:'Plastic Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'06.00 PM',rating:4,id:19},
                {name:'Dr Talha',category:'Transplant Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'12.00 PM',rating:3,id:20}
           
            ]
    
        }
        else if(Data.page==3)
        {
            data = [
                {name:'Dr Simpson',category:'Heart Surgeon',videoHourlyRate:'40',voiceHourlyRate:'30',chatHourlyRate:'20',startTime:'09.00 AM',endTime:'05.00 PM',rating:5,id:21},
                {name:'Dr Naseer',category:'Kidney Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'01.00 PM',rating:4.5,id:22},
                {name:'Dr Azhar',category:'Plastic Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'06.00 PM',rating:4,id:23},
                {name:'Dr Sattar',category:'Transplant Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'12.00 PM',rating:3,id:24},
                {name:'Dr Irfan',category:'Heart Surgeon',videoHourlyRate:'40',voiceHourlyRate:'30',chatHourlyRate:'20',startTime:'09.00 AM',endTime:'05.00 PM',rating:5,id:25},
                {name:'Dr Usman',category:'Kidney Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'01.00 PM',rating:4.5,id:26},
                {name:'Dr Junaid',category:'Plastic Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'06.00 PM',rating:4,id:27},
                {name:'Dr Nisar',category:'Transplant Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'12.00 PM',rating:3,id:28},
                {name:'Dr Mujahid',category:'Plastic Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'06.00 PM',rating:4,id:29},
                {name:'Dr Naeem',category:'Transplant Surgeon',videoHourlyRate:'20',voiceHourlyRate:'15',chatHourlyRate:'10',startTime:'09.00 AM',endTime:'12.00 PM',rating:3,id:30}
            
            ]
    
        }else{
            data = []
        }
        setTimeout(function(){  dispatch({type: 'GET_DOCTORS_SUCCESS',doctors:data}) }, 400);
      // dispatch({type: 'GET_DOCTORS_SUCCESS',doctors:data})

      
        // axios.get("/get_doctors", Data)
        // .then((res) => {
        //   //console.log(res.data)
        //        if(res.data.success == false)
        //        {       
        //                 dispatch({type: 'GET_DOCTORS_ERROR',msg:res.data.msg})
        //        }else{
                       
        //                 dispatch({type: 'GET_DOCTORS_SUCCESS',doctors:res.data.doctors})
        //        } 

        // })
        // .catch((err) => {
        //         console.log(err)
        //         dispatch({type: 'GET_DOCTORS_ERROR',msg:'Something Went Wrong.'})
        // })


}

export const clearDoctorsMessage = Data => dispatch => {
        dispatch({type: 'CLEAR_DOCTORS_MESSAGES'})
}

export const loadingFlag = Data => dispatch => {
    dispatch({type: 'LOADING',loading:true})
}
