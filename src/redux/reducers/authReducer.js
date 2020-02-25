const initState = {
  authError: null,
  signUpError:null,
  user:{},
  isAuthenticated: false,
  error:false,
  resetPasswordError:null,
  resetPasswordSuccess:null,
  fbData:{},
  fbNewUser:false,
  isUpdated:false,
  updateError:null,
  helpMsg:null,
  helpSuccess:false
}

const authReducer = (state = initState, action) => {
  switch(action.type){
   case 'HELP_SUCCESS':
    return {
      ...state,
      helpMsg:action.msg,
      helpSuccess:false
    } 
    case 'HELP_ERROR':
    return {
      ...state,
      helpMsg:null,
      helpSuccess:true
    } 
    case 'LOGIN_ERROR':
    return {
      ...state,
      authError: action.msg,
      error:!state.error,
      fbNewUser:false
    } 
    case 'SIGN_UP_ERROR':
    return {
      ...state,
      signUpError: action.msg,
      error:!state.error,
      fbNewUser:false
    } 
    case 'EDIT_INFO_ERROR':
      return {
        ...state,
        updateError: action.msg,
        isUpdated:false
      
    } 
    case 'EDIT_INFO_SUCCESS':
      return {
        ...state,
        updateError: null,
        isUpdated:true,
        user:action.user
      }
    case 'LOGIN_SUCCESS':
    return {
      ...state,
      authError:null,
      signUpError:null,
      user:action.user,
      isAuthenticated: true,
      fbNewUser:false
    }
    case 'FB_NEW_USER':
    return {
      ...state,
      fbData:action.fbData,
      fbNewUser:true
    }
    case 'LOGOUT_USER':
    return {
      ...state,
      authError:null,
      user:{},
      isAuthenticated: false,
      fbNewUser:false
    }
      case 'CLEAR_MESSAGES':
      return {
          ...state,
          authError:null,
          signUpError:null,
          resetPasswordError:null,
          resetPasswordSuccess:null,
          changePasswordError:null,
          changePasswordSuccess:null,
          fbNewUser:false,
          isUpdated:false,
          updateError:null
      }
      case 'RESET_PASSWORD_SUCCESS':
      return {
          ...state,
         resetPasswordError:null,
         resetPasswordSuccess:action.resetPasswordSuccess
      }
      case 'RESET_PASSWORD_ERROR':
      return {
          ...state,
          resetPasswordError:action.resetPasswordError,
          resetPasswordSuccess:null
      }
      case 'CHANGE_PASSWORD_SUCCESS':
      return {
            ...state,
           changePasswordError:null,
           changePasswordSuccess:action.changePasswordSuccess
      }
      case 'CHANGE_PASSWORD_ERROR':
      return {
            ...state,
            changePasswordError:action.changePasswordError,
            changePasswordSuccess:null
      }
      default:
        return state
  } 

}

export default authReducer 