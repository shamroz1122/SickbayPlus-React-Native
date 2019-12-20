const initState = {
  authError: null,
  signUpError:null,
  user:{},
  isAuthenticated: false,
  error:false,
  resetPasswordError:null,
  resetPasswordSuccess:null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
    return {
      ...state,
      authError: action.msg,
      error:!state.error
    } 
    case 'SIGN_UP_ERROR':
    return {
      ...state,
      signUpError: action.msg,
      error:!state.error
    } 
    case 'LOGIN_SUCCESS':
    return {
      ...state,
      authError:null,
      signUpError:null,
      user:action.user,
      isAuthenticated: true
    }
      case 'LOGOUT_USER':
      return {
        ...state,
        authError:null,
        user:{},
        isAuthenticated: false
      }
      case 'CLEAR_MESSAGES':
      return {
          ...state,
          authError:null,
          signUpError:null,
          resetPasswordError:null,
          resetPasswordSuccess:null,
          changePasswordError:null,
          changePasswordSuccess:null
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