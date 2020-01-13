const initState = {
    doctorError:null,
    doctors:[],
    loading:true,
    checkDoctors:3
  }
  
  const doctorsReducer = (state = initState, action) => {
    switch(action.type){ 

        case 'GET_DOCTORS_ERROR':
        return {
            ...state,
            doctorError: action.msg,
            doctors:[],
            loading:false
        } 
        case 'GET_DOCTORS_SUCCESS':
        return {
            ...state,
            doctorError: null,
            doctors:action.doctors,
            loading:false,
            checkDoctors: action.doctors.length>0? 1:2
        }
        case 'CLEAR_DOCTORS_MESSAGES':
          return {
              ...state,
              doctorError:null,
              checkDoctors:2,
              doctors:[]
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
  
  export default doctorsReducer 