const initState = {
    notificationsError:null,
    notifications:[],
    loading:true,
    checkNotifications:3,
  }
  
  const notificationsReducer = (state = initState, action) => {
    
    switch(action.type){

        case 'GET_NOTIFICATIONS_ERROR':
        return {
            ...state,
            notificationsError: action.msg,
            notifications:[]
        } 
        case 'GET_NOTIFICATIONS_SUCCESS':
        return {
            ...state,
            notificationsError: null,
            notifications:action.notifications,
            loading:false,
            checkNotifications: action.notifications.length>0? 1:2
        } 
        case 'CLEAR_NOTIFICATIONS_MESSAGES':
        return {
              ...state,
              notificationsError:null,
              checkNotifications:2,
              notifications:[]
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
  
  export default notificationsReducer 