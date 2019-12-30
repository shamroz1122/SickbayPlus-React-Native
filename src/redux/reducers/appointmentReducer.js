const initState = {
    timeSlotsError:null,
    timeSlots:{},
    loading:true,
    checkTimeSlots:false

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
        case 'CLEAR_TIMESLOTS':
        return {
            ...state,
            timeSlots: {},
            checkTimeSlots:false
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