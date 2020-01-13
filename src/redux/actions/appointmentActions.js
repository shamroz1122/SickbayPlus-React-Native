import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-community/async-storage';

// Reset Password by email
export const getTimeSlots = Data => dispatch => {
    
    setBasePath() 
        let data = []

            data = {
                'timeSlots':[
                    {time:'09.00am',booked:1},
                    {time:'09.15am',booked:0},
                    {time:'09.30am',booked:0},
                    {time:'09.45am',booked:0},
                    {time:'10.00am',booked:0},
                    {time:'10.15am',booked:0},
                    {time:'10.30am',booked:0},
                    {time:'10.45am',booked:0},
                    {time:'11.00am',booked:0},
                    {time:'11.15am',booked:0},
                    {time:'11.30am',booked:0},
                    {time:'11.45am',booked:0},
                    {time:'12.00pm',booked:0},
                    {time:'12.15pm',booked:0},
                    {time:'12.30pm',booked:0},
                    {time:'12.45pm',booked:0},
                    {time:'01.00pm',booked:0},
                    {time:'01.15pm',booked:1},
                    {time:'01.30pm',booked:0},
                    {time:'01.45pm',booked:0},
                    {time:'02.00pm',booked:0},
                    {time:'02.15pm',booked:0},
                    {time:'02.30pm',booked:0},
                    {time:'02.45pm',booked:0},
                    {time:'03.00pm',booked:0},
                    {time:'03.15pm',booked:0},
                    {time:'03.30pm',booked:0},
                    {time:'03.45pm',booked:0},
                    {time:'04.00pm',booked:0},
                    {time:'04.15pm',booked:0},
                    {time:'04.30pm',booked:0},
                    {time:'04.45pm',booked:0},
                    {time:'05.00pm',booked:0},
                    {time:'05.15pm',booked:0},
                    {time:'05.30pm',booked:0},
                    {time:'05.45pm',booked:0}
                ],
                'timeRange':15
             }
    
     
        setTimeout(function(){  dispatch({type: 'GET_TIMESLOTS_SUCCESS',timeSlots:data}) }, 2000);

    //  dispatch({type: 'GET_TIMESLOTS_SUCCESS',timeSlots:data})



    // axios.get("/get_time_slots", Data)
    // .then((res) => {
    //   //console.log(res.data)
    //        if(res.data.success == false)
    //        {       
    //                 dispatch({type: 'GET_TIMESLOTS_ERROR',msg:res.data.msg})
    //        }else{
                   
    //                 dispatch({type: 'GET_TIMESLOTS_SUCCESS',timeSlots:res.data.timeslots})
    //        } 

    // })
    // .catch((err) => {
    //         console.log(err)
    //         dispatch({type: 'GET_TIMESLOTS_ERROR',msg:'Something Went Wrong.'})
    // })


}

// Reset Password by email
export const bookingAppointment = Data => dispatch => {
    
    setBasePath() 
      // console.log(Data)
     
       // setTimeout(function(){  dispatch({type: 'BOOK_APPOINTMENT_SUCCESS',bookAppointment:true,msg:null}) }, 2000);

      dispatch({type: 'BOOK_APPOINTMENT_SUCCESS',bookAppointment:true,msg:null})



    // axios.post("/book_appointment", Data)
    // .then((res) => {
    //   //console.log(res.data)
    //        if(res.data.success == false)
    //        {       
    //                 dispatch({type: 'BOOK_APPOINTMENT_ERROR',bookAppointment:false,msg:res.data.msg})
    //        }else{
                   
    //                 dispatch({type: 'BOOK_APPOINTMENT_SUCCESS',bookAppointment:true,msg:null})
    //        } 

    // })
    // .catch((err) => {
    //         console.log(err)
    //         dispatch({type: 'BOOK_APPOINTMENT_ERROR',bookAppointment:true,msg:'Something Went Wrong.'})
    // })


}


export const clearTimeSlots = Data => dispatch => {
    dispatch({type: 'CLEAR_TIMESLOTS'})
}

export const clearAppointmentMessages = Data => dispatch => {
    dispatch({type: 'CLEAR_APPOINTMENT_MESSAGES'})
}



export const loadingFlag = Data => dispatch => {
    dispatch({type: 'LOADING',loading:true})
}
