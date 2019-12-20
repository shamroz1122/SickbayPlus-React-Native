const initState = {
    doctorError:null,
    doctors:[],
    loading:true
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
            loading:false
        }
        case 'CLEAR_MESSAGES':
          return {
              ...state,
              doctorError:null
          }
        case 'LOADING':
            return {
              ...state,
              loading:action.loading,
              doctors:[]
        }
      
        default:
          return state
    } 
  
  }
  
  export default doctorsReducer 