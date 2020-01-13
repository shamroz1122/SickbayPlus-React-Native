const initState = {
    reportError:null,
    reports:[],
    loading:true,
    checkReports:3
  }
  
  const reportsReducer = (state = initState, action) => {
    
    switch(action.type){

        case 'GET_REPORTS_ERROR':
        return {
            ...state,
            reportError: action.msg,
            reports:[]
        } 
        case 'GET_REPORTS_SUCCESS':
        return {
            ...state,
            reportError: null,
            reports:action.reports,
            loading:false,
            checkReports: action.reports.length>0? 1:2
        }
        case 'CLEAR_REPORTS_MESSAGES':
        return {
              ...state,
              reportError:null,
              checkReports:2,
              reports:[]
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
  
  export default reportsReducer 