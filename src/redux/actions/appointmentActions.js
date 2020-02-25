import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-community/async-storage';

// Reset Password by email
export const getTimeSlots = Data => dispatch => {
    
    setBasePath() 
   
    axios.post("/get-slots", Data)
    .then((res) => {
       
           if(res.data.success == false)
           {       
                    dispatch({type: 'GET_TIMESLOTS_ERROR',msg:res.data.msg})
           }else{
                   
        
                    dispatch({type: 'GET_TIMESLOTS_SUCCESS',timeSlots:res.data.result})
           } 

    })
    .catch((err) => {
            console.log('error',err)
            dispatch({type: 'GET_TIMESLOTS_ERROR',msg:'Something Went Wrong.'})
    })


}
// Reset Password by email
export const clearChatCheck = Data => dispatch => {
    
    dispatch({type: 'CLEAR_CHAT_CHECK',chatMessage:Data})

}
// Reset Password by email
export const clearMsgCheck = Data => dispatch => {
    
    dispatch({type: 'CLEAR_MSG_CHECK'})

}


// Reset Password by email
export const appendNotificationMessage = Data => dispatch => {
    
    dispatch({type: 'APPEND_CHAT_NOTIFICATION_MESSAGE_SUCCESS',chatMessage:Data})
   
}


// Reset Password by email
export const uploadChatHistory = Data => dispatch => {
    

  //  console.log('my data',Data)
    setBasePath()
    axios.post("/appointment-session-update", Data)
    .then((res) => {
        
            if(res.data.success == false)
            {       
              //  console.log('fail upload',res.data)
                dispatch({type: 'UPLOAD_CHAT_ERROR',uploadChatError:res.data.msg,uploadChat:false})

            }else{

                dispatch({type: 'UPLOAD_CHAT_SUCCESS',uploadChatError:res.data.msg,uploadChat:true})
         
            } 

    })
    .catch((err) => {
           // console.log('error message upload',err)
            dispatch({type: 'UPLOAD_CHAT_ERROR',uploadChatError:'Something Went Wrong!',uploadChat:false})
    })


}

// Reset Password by email
export const updateAppointmentStatus = Data => dispatch => {
    

    //  console.log('my data',Data)
      setBasePath()
      axios.post("/appointment-update", Data)
      .then((res) => {
        
              if(res.data.success == false)
              {       
                 //  console.log('fail upload',res.data)
                 // dispatch({type: 'APPOINTMENT_STATUS_UPDATE_ERROR',uploadChatError:res.data.msg,uploadChat:false})
                 

              }else{
  
                //  dispatch({type: 'UPLOAD_CHAT_SUCCESS',uploadChatError:res.data.msg,uploadChat:true})
           
              } 
  
      })
      .catch((err) => {
              console.log('error message upload',err)
            //  dispatch({type: 'UPLOAD_CHAT_ERROR',uploadChatError:'Something Went Wrong!',uploadChat:false})
      })
  
  
  }

  
// Reset Password by email
export const fetchChatHistory = Data => dispatch => {
    (Data)
    setBasePath()
    axios.post("/appointment-session-fetch", Data)
    .then((res) => {

          

            if(res.data.success == false)
            {       
               // console.log('fail fetch',res.data)
                dispatch({type: 'FETCH_CHAT_ERROR',fetchChatError:res.data.msg,fetchChat:[]})

            }else{
                //console.log('heelo',res.data)
                if(res.data.result.json!='')
                {
                      dispatch({type: 'FETCH_CHAT_SUCCESS',fetchChatError:null,doctorToken:res.data.doctor_token,fetchChat:JSON.parse(res.data.result.json)})
             
                }else{

                     dispatch({type: 'FETCH_CHAT_SUCCESS',fetchChatError:null,doctorToken:res.data.doctor_token,fetchChat:[]})

                }
               
            } 
            

    })
    .catch((err) => {
            console.log('error message fetch',err)
            dispatch({type: 'FETCH_CHAT_ERROR',fetchChatError:'Something Went Wrong!',fetchChat:[]})
    })


}


// Reset Password by email
export const fetchVoiceTwilioClientToken = Data => dispatch => {
    
    setBasePath()
    axios.post("/capability-token", Data)
    .then((res) => {
          
            if(res.data.success == false)
            {       
               // console.log('fail fetch',res.data)
                dispatch({type: 'FETCH_TWILIO_VOICE_CLIENT_ERROR',twilioVoiceClientTokenError:res.data.msg})

            }else{
         
                dispatch({type: 'FETCH_TWILIO_VOICE_CLIENT_SUCCESS',twilioVoiceClientToken:res.data.token,clientTo:res.data.to,clientFrom:res.data.from})
            } 
            

    })
    .catch((err) => {
           // console.log('error message fetch',err)
            dispatch({type: 'FETCH_TWILIO_VOICE_CLIENT_ERROR',twilioVoiceClientTokenError:'Something Went Wrong!',fetchChat:[]})
    })


}



// Reset Password by email
export const fetchVideoTwilioClientToken = Data => dispatch => {
    
    setBasePath()
    axios.post("/capability-token", Data)
    .then((res) => {
          
            if(res.data.success == false)
            {       
               // console.log('fail fetch',res.data)
                dispatch({type: 'FETCH_TWILIO_VIDEO_CLIENT_ERROR',twilioVideoClientTokenError:res.data.msg})

            }else{
         
                dispatch({type: 'FETCH_TWILIO_VIDEO_CLIENT_SUCCESS',twilioVideoClientToken:res.data.token,roomName:res.data.room})
            } 
            

    })
    .catch((err) => {
           // console.log('error message fetch',err)
            dispatch({type: 'FETCH_TWILIO_VIDEO_CLIENT_ERROR',twilioVideoClientTokenError:'Something Went Wrong!',fetchChat:[]})
    })


}


// Reset Password by email
export const getAppoitments = Data => dispatch => {
    
    setBasePath() 
 
    axios.post("/get-appointments", Data)
    .then((res) => {
       
           if(res.data.success == false)
           {       
                    dispatch({type: 'GET_APPOINTMENTS_ERROR',msg:res.data.msg})
           }else{
               
                    if(Data.status=='pending')
                    {
                        dispatch({type: 'GET_PENDING_APPOINTMENTS_SUCCESS',appointments:res.data.result.data})
                    }else{
                      
                        dispatch({type: 'GET_COMPLETED_APPOINTMENTS_SUCCESS',appointments:res.data.result.data})
                    }

                 
           } 

    })
    .catch((err) => {
            console.log('error',err)
            dispatch({type: 'GET_APPOINTMENTS_ERROR',msg:'Something Went Wrong.'})
    })


}

// Reset Password by email
export const bookingAppointment = Data => dispatch => {
    
    setBasePath() 
    // console.log(Data)
    axios.post("/save-appointment", Data)
    .then((res) => {
   
           if(res.data.success == false)
           {       
                    dispatch({type: 'BOOK_APPOINTMENT_ERROR',bookAppointment:false,msg:res.data.msg})
           }else{
        
            setTimeout(function(){ dispatch({type: 'BOOK_APPOINTMENT_SUCCESS',bookAppointment:true,msg:null}) }, 400);

                   // dispatch({type: 'BOOK_APPOINTMENT_SUCCESS',bookAppointment:true,msg:null})

           } 

    })
    .catch((err) => {
            console.log('error',err)
            dispatch({type: 'BOOK_APPOINTMENT_ERROR',bookAppointment:false,msg:'Something Went Wrong.'})
    })


}

// Reset Password by email
export const sendMessage = Data => dispatch => {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var response
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        response = JSON.parse(this.responseText)

        if(response.failure==1)
        {
         
            dispatch({type: 'FCM_MESSAGE_RESPONSE',msgSent:false,msgID:Data.msgID})
        }else{
         //   console.log(response)
            dispatch({type: 'FCM_MESSAGE_RESPONSE',msgSent:true,msgID:Data.msgID})
        }
      }
    });

    xhr.open("POST", "https://fcm.googleapis.com/fcm/send");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "key=AIzaSyCluwenvKDmyUCgxUZi4kpfR3bMI9MM5CI");
    
    var res = xhr.send(JSON.stringify(Data))

  

}


// Reset Password by email
export const uploadAttachment = Data => dispatch => {
    
    setBasePath() 
    //console.log(Data)
    axios.post("/attachment", Data)
    .then((res) => {
      //console.log(res.data)
           if(res.data.success == false)
           {       
                    dispatch({type: 'UPLOAD_ATTACHMENT_ERROR',msg:res.data.msg})
           }else{
                  
                    dispatch({type: 'UPLOAD_ATTACHMENT_SUCCESS',uploadedAttachment:res.data.result})
           } 

    })
    .catch((err) => {
            console.log(err)
            dispatch({type: 'UPLOAD_ATTACHMENT_ERROR',msg:'Error While Uploading.'})
    })


}



export const doctorRatings = Data => dispatch => {
    
    setBasePath() 
    //console.log(Data)
    axios.post("/store-feedback", Data)
    .then((res) => {
      //console.log(res.data)
           if(res.data.success == false)
           {       
                    console.log(res.data)
                  //  dispatch({type: 'UPLOAD_ATTACHMENT_ERROR',msg:res.data.msg})
           }else{
                  
                  //  dispatch({type: 'UPLOAD_ATTACHMENT_SUCCESS',uploadedAttachment:res.data.result})
           } 

    })
    .catch((err) => {
            console.log(err)
         
    })


}

export const clearTimeSlots = Data => dispatch => {
    dispatch({type: 'CLEAR_TIMESLOTS'})
}

export const clearTwilioClientToken = Data => dispatch => {
    dispatch({type: 'CLEAR_TWILIO_CLIENT_TOKEN'})
}

export const clearAppointmentMessages = Data => dispatch => {
    dispatch({type: 'CLEAR_APPOINTMENT_MESSAGES'})
}

export const clearAppointments = Data => dispatch => {
    console.log('hello baby')
    dispatch({type: 'CLEAR_APPOINTMENTS'})
}




export const loadingFlag = Data => dispatch => {
 
    dispatch({type: 'LOADING',loading:true})
}
