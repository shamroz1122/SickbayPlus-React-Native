const initState = {
    timeSlotsError:null,
    timeSlots:{},
    loading:true,
    checkTimeSlots:false,
    msgBookAppointment:null,
    bookAppointment:false
  }
  
  const appointmentReducer = (state = initState, action) => {
    
    switch(action.type){

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
              bookAppointment:false
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