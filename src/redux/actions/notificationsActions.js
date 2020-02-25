import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-community/async-storage';

 
// Reset Password by email
export const getNotifications = Data => dispatch => {

        setBasePath() 
        //     let data = []

        //     if(Data.page==1)
        //     {
        //         data = [
        //                 {doctor:'Dr John Simpson',price:'10',appointmentTime:'9.00 AM',appointmentDate:'2020-01-07',appointmentType:'Video Call Appointemnt',id:1},
        //                 {doctor:'Dr Shamroz Naseer',price:'20',appointmentTime:'09.15 AM',appointmentDate:'2020-01-09',appointmentType:'Voice Call Appointemnt',id:2},
        //                 {doctor:'Dr Asim Azhar',price:'15',appointmentTime:'09.30 AM',appointmentDate:'2020-01-06',appointmentType:'Chat Appointemnt',id:3},
        //                 {doctor:'Dr Hamza Sattar',price:'10',appointmentTime:'09.45 AM',appointmentDate:'2020-01-02',appointmentType:'Video Call Appointemnt',id:4},
        //                 {doctor:'Dr Hazi Ali',price:'30',appointmentTime:'09.00 AM',appointmentDate:'2019-12-04',appointmentType:'Voice Call Appointemnt',id:5},
        //                 {doctor:'Dr Ali Naseer',price:'40',appointmentTime:'01.00 PM',appointmentDate:'2019-11-25',appointmentType:'Video Call Appointemnt',id:6},
        //                 {doctor:'Dr Razzaq Azhar',price:'25',appointmentTime:'01.15 PM',appointmentDate:'2019-11-22',appointmentType:'Chat Appointemnt',id:7},
        //                 {doctor:'Dr Nadeem Sattar',price:'20',appointmentTime:'03.00 PM',appointmentDate:'2019-11-09',appointmentType:'Voice Call Appointemnt',id:8},
        //                 {doctor:'Dr Adnan Azhar',price:'10',appointmentTime:'04.00 PM',appointmentDate:'2019-11-05',appointmentType:'Video Call Appointemnt',id:9},
        //                 {doctor:'Dr Talha Sattar',price:'20',appointmentTime:'11.00 AM',appointmentDate:'2019-11-02',appointmentType:'Chat Appointemnt',id:10}
                
        //         ]
        
        //     }else if(Data.page==2)
        //     {
             
        //         data = [
        //             {doctor:'Dr Simpson',price:'10',appointmentTime:'09.00 AM',appointmentDate:'2019-12-28',appointmentType:'Video Call Appointemnt',id:11},
        //             {doctor:'Dr Naseer',price:'20',appointmentTime:'09.15 AM',appointmentDate:'2019-12-20',appointmentType:'Voice Call Appointemnt',id:12},
        //             {doctor:'Dr Azhar',price:'15',appointmentTime:'09.30 AM',appointmentDate:'2019-12-15',appointmentType:'Chat Appointemnt',id:13},
        //             {doctor:'Dr Sattar',price:'10',appointmentTime:'09.45 AM',appointmentDate:'2019-12-10',appointmentType:'Video Call Appointemnt',id:14},
        //             {doctor:'Dr Ali',price:'30',appointmentTime:'09.00 AM',appointmentDate:'2019-12-04',appointmentType:'Voice Call Appointemnt',id:15},
        //             {doctor:'Dr Naseer',price:'40',appointmentTime:'01.00 PM',appointmentDate:'2019-11-25',appointmentType:'Video Call Appointemnt',id:16},
        //             {doctor:'Dr Azhar',price:'25',appointmentTime:'01.15 PM',appointmentDate:'2019-11-22',appointmentType:'Chat Appointemnt',id:17},
        //             {doctor:'Dr Sattar',price:'20',appointmentTime:'03.00 PM',appointmentDate:'2019-11-09',appointmentType:'Voice Call Appointemnt',id:18},
        //             {doctor:'Dr Azhar',price:'10',appointmentTime:'04.00 PM',appointmentDate:'2019-11-05',appointmentType:'Video Call Appointemnt',id:19},
        //             {doctor:'Dr Sattar',price:'20',appointmentTime:'11.00 AM',appointmentDate:'2019-11-02',appointmentType:'Chat Appointemnt',id:20}
            
        //     ]
                
        
        //     }
        //     else{
        //         data = []
        //     }

        //     setTimeout(function(){  dispatch({type: 'GET_NOTIFICATIONS_SUCCESS',notifications:data}) }, 400);

        //  dispatch({type: 'GET_NOTIFICATIONS_SUCCESS',notifications:data})



        axios.post("/get-notifications", Data)
        .then((res) => {
          //console.log(res.data)
               if(res.data.success == false)
               {       
                        dispatch({type: 'GET_NOTIFICATIONS_ERROR',msg:res.data.msg})
               }else{
                       
                        dispatch({type: 'GET_NOTIFICATIONS_SUCCESS',notifications:res.data.result.data})
               } 

        })
        .catch((err) => {
                console.log(err)
                dispatch({type: 'GET_NOTIFICATIONS_ERROR',msg:'Something Went Wrong.'})
        })


}

export const clearNotificationsMessage = Data => dispatch => {
        dispatch({type: 'CLEAR_NOTIFICATIONS_MESSAGES'})
}

export const loadingFlagNotify = Data => dispatch => {
        dispatch({type: 'NOTIFY_LOADING',loading:true})
}
    