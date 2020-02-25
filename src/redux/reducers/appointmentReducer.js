const initState = {
    timeSlotsError:null,
    timeSlots:{},
    loading:true,
    checkTimeSlots:false,
    msgBookAppointment:null,
    bookAppointment:false,
    uploadedAttachment:{},
    uploadedAttachmentError:null,
    pendingAppointments:[],
    completedAppointments:[],
    checkCompletedAppointment:3,
    checkPendingAppointment:3,
    chatMessage:[],
    uploadChat:false,
    uploadChatError:null,
    fetchResult:0,
    msgSent:true,
    msgSentCheck:false,
    fetchResultCheck:false,
    twilioVoiceClientToken:'',
    twilioVoiceClientTokenError:null,
    twilioVideoClientToken:'',
    twilioVideoClientTokenError:'',
    clientTo:'',
    clientFrom:'',
    roomName:'',
    doctorToken:'',
  }
  import { Text } from 'react-native'
  const appointmentReducer = (state = initState, action) => {
    
    switch(action.type){
      
      case 'FCM_MESSAGE_RESPONSE':
        return {
            ...state,
            msgSent: action.msgSent,
            msgSentCheck: !state.msgSentCheck,
            chatMessage: action.msgSent? state.chatMessage:state.chatMessage.map(el => (el._id === action.msgID ? {...el,failed:1} : el)),
        } 
        case 'APPEND_CHAT_NOTIFICATION_MESSAGE_SUCCESS':
        return {
            ...state,
            chatMessage: [action.chatMessage,...state.chatMessage],
        }  
        case 'UPLOAD_CHAT_SUCCESS':
          return {
              ...state,
              uploadChat: action.uploadChat,
              uploadChatError:action.uploadChatError,
        }  
        case 'UPLOAD_CHAT_ERROR':
          return {
              ...state,
              uploadChat:action.uploadChat,
              uploadChatError:action.uploadChatError,
        } 
        case 'FETCH_CHAT_SUCCESS':
        //  console.log('device token',action.doctorToken)
          return {
              ...state,
              chatMessage: action.fetchChat,
              fetchChatError:null,
              fetchResult: action.doctorToken!=null?1:2,
              fetchResultCheck:!state.fetchResultCheck,
              doctorToken:action.doctorToken
        }  
        case 'FETCH_TWILIO_VOICE_CLIENT_SUCCESS':
          return {
              ...state,
              twilioVoiceClientToken:action.twilioVoiceClientToken,
              twilioVoiceClientTokenError:null,
              clientTo:action.clientTo,
              clientFrom:action.clientFrom,
              twilioVideoClientToken:'',
        }
        case 'FETCH_TWILIO_VOICE_CLIENT_ERROR':
          return {
              ...state,
              twilioVoiceClientToken:'',
              twilioVoiceClientTokenError:action.twilioVoiceClientTokenError,
              clientTo:'',
              clientFrom:'',
              twilioVideoClientToken:''
        }
        case 'FETCH_TWILIO_VIDEO_CLIENT_SUCCESS':
          return {
              ...state,
              twilioVideoClientToken:action.twilioVideoClientToken,
              twilioVideoClientTokenError:null,
              roomName:action.roomName,
              twilioVoiceClientToken:''
        }
        case 'FETCH_TWILIO_VIDEO_CLIENT_ERROR':
          return {
              ...state,
              twilioVideoClientToken:'',
              twilioVideoClientTokenError:action.twilioVideoClientTokenError,
              roomName:'',
              twilioVoiceClientToken:''
        }
        
        case 'FETCH_CHAT_ERROR':
          return {
              ...state,
              chatMessage:[],
              fetchChatError:action.fetchChatError,
              fetchResult:true,
              fetchResultCheck:!state.fetchResultCheck
        } 
        case 'CLEAR_CHAT_CHECK':
          return {
              ...state,
              fetchResult:false,

        }
        case 'CLEAR_TWILIO_CLIENT_TOKEN':
          return {
              ...state,
              twilioVoiceClientToken:'',
              twilioVideoClientToken:'',
        }
        
        case 'CLEAR_MSG_CHECK':
          return {
              ...state,
              msgSent:false,
              
        }
        case 'GET_TIMESLOTS_ERROR':
        return {
            ...state,
            timeSlotsError: action.msg,
            timeSlots:{},
            loading:false
        }  
        case 'GET_TIMESLOTS_SUCCESS':
        return {
            ...state,
            timeSlotsError: null,
            timeSlots:action.timeSlots,
            loading:false,
            checkTimeSlots: true 
        }
        case 'GET_PENDING_APPOINTMENTS_SUCCESS':
        return {
            ...state,
            pendingAppointments:action.appointments,
            loading:false,
            checkPendingAppointment: action.appointments.length>0? 1:2
        } 
        case 'GET_COMPLETED_APPOINTMENTS_SUCCESS':
        return {
            ...state,
            completedAppointments:action.appointments,
            loading:false,
            checkCompletedAppointment: action.appointments.length>0? 1:2
        }
        case 'BOOK_APPOINTMENT_ERROR':
        return {
              ...state,
              msgBookAppointment: action.msg,
              bookAppointment:action.bookAppointment
        }
        case 'BOOK_APPOINTMENT_SUCCESS':
         return {
              ...state,
              msgBookAppointment: null,
              bookAppointment:action.bookAppointment
        }
        case 'CLEAR_TIMESLOTS':
        return {
            ...state,
            timeSlots: {},
            checkTimeSlots:false
        }
        case 'CLEAR_APPOINTMENT_MESSAGES':
          return {
              ...state,
              msgBookAppointment: null,
              bookAppointment:false,
              uploadedAttachment:{},
              uploadedAttachmentError:null,
          }
        case 'CLEAR_APPOINTMENTS':
        return {
                ...state,
                pendingAppointments: [],
                completedAppointments:[],
                checkCompletedAppointment:3,
                checkPendingAppointment:3,
            
         }
        case 'UPLOAD_ATTACHMENT_SUCCESS':
        return {
            ...state,
            uploadedAttachment: action.uploadedAttachment,
            uploadedAttachmentError:null,
  
        }
        case 'UPLOAD_ATTACHMENT_ERROR':
          return {
                ...state,
                uploadedAttachment: {},
                uploadedAttachmentError:action.msg,
         }
        case 'LOADING':
        return {
          ...state,
          loading:action.loading
        }
        default:
          return state
    } 
  
  }
  
  export default appointmentReducer 