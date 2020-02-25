import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-community/async-storage';

// Login - get user token
export const login = Data => dispatch => {

        setBasePath() 
        axios.post("/authenticate", Data)
        .then((res) => {
      
               if(res.data.success == false)
               {       
                        dispatch({type: 'LOGIN_ERROR',msg:res.data.msg})
               }else{
                       
                        // Set token to localStorage
                       
                        const token = res.data.token;
                    
                        AsyncStorage.setItem("User", JSON.stringify(res.data.user));
                       // AsyncStorage.setItem("User", JSON.stringify(user))
                        AsyncStorage.setItem("Token", token);
                        setAuthToken(token);
                
                        dispatch({type: 'LOGIN_SUCCESS',user:res.data.user})
               } 

        })
        .catch((err) => {
                console.log(err)
                dispatch({type: 'LOGIN_ERROR',msg:'Invalid Credentials'})
        }
    );
  
};   

export const help = Data => dispatch => {
        console.log(Data)
        setBasePath() 
        axios.post("/receive-help", Data)
        .then((res) => {
      
               if(res.data.success == false)
               {       
                        dispatch({type: 'HELP_ERROR',msg:res.data.msg})
               }else{

                        dispatch({type: 'HELP_SUCCESS'})
               } 

        })
        .catch((err) => {
                console.log(err)
                dispatch({type: 'HELP_ERROR',msg:'Error while saving'})
        }
    );
  
};  



// Login - get user token
export const checkFacebookUser = Data => dispatch => {

    
        setBasePath() 
       // dispatch({type: 'FB_NEW_USER',fbData:Data})
        axios.post("/fb-login", Data)
        .then((res) => {
       //   console.log(res.data)
               if(res.data.success == false)
               {       
                          dispatch({type: 'LOGIN_ERROR',msg:res.data.msg})
               }else{
                       
                        // Set token to localStorage
                       
                        const token = res.data.token;
                    
                        AsyncStorage.setItem("User", JSON.stringify(res.data.user));
                       // AsyncStorage.setItem("User", JSON.stringify(user))
                        AsyncStorage.setItem("Token", token);
                        setAuthToken(token);
                
                        dispatch({type: 'LOGIN_SUCCESS',user:res.data.user})
               } 

        })
        .catch((err) => {
                console.log(err)
                dispatch({type: 'LOGIN_ERROR',msg:'Error While Signing In Through Facebook'})
        }
    );
  
};  

// Login - get user token
export const googleLogin = Data => dispatch => {

        setBasePath() 
    //    console.log(Data)
        axios.post("/google-login", Data)
        .then((res) => {
       //   console.log(res.data)
               if(res.data.success == false)
               {       
                        dispatch({type: 'LOGIN_ERROR',msg:res.data.msg})
               }else{
                       
                        // Set token to localStorage
                       
                        const token = res.data.token;
                    
                        AsyncStorage.setItem("User", JSON.stringify(res.data.user));
                       // AsyncStorage.setItem("User", JSON.stringify(user))
                        AsyncStorage.setItem("Token", token);
                        setAuthToken(token);
                
                        dispatch({type: 'LOGIN_SUCCESS',user:res.data.user})
               } 

        })
        .catch((err) => {
                console.log(err)
                dispatch({type: 'LOGIN_ERROR',msg:'Invalid Credentials'})
        }
    );
  
};   


// SignUp User
export const signUp = Data => dispatch => {

     //   console.log(Data)
        setBasePath() 
  //      dispatch({type: 'SIGN_UP_ERROR',msg:'Rigestration API Is Not Ready Yet'})
        axios.post("/register", Data)
        .then((res) => {
       
               if(res.data.success == false)
               {       
                        dispatch({type: 'SIGN_UP_ERROR',msg:res.data.msg})
               }else{
                       
                        // Set token to localStorage
                        const token = res.data.token;
                        AsyncStorage.setItem("User", JSON.stringify(res.data.user));
                        AsyncStorage.setItem("Token", token);
                        setAuthToken(token);
                
                        dispatch({type: 'LOGIN_SUCCESS',user:res.data.user})
               } 

        })
        .catch((err) => {
                console.log(err)
                dispatch({type: 'SIGN_UP_ERROR',msg:'Error While Registration.'})
        }
    )
  
}

// SignUp User
export const editInfo = Data => dispatch => {

         //   console.log('infp',Data)
           setBasePath() 
     //      dispatch({type: 'SIGN_UP_ERROR',msg:'Rigestration API Is Not Ready Yet'})
           axios.post("/update-user", Data)
           .then((res) => {
               
                  if(res.data.success == false)
                  {       
                           dispatch({type: 'EDIT_INFO_ERROR',msg:res.data.msg})
                  }else{
                             // Set token to localStorage
                       
                         AsyncStorage.setItem("User", JSON.stringify(res.data.user));
                            // Set token to localStorage
                         dispatch({type: 'EDIT_INFO_SUCCESS',user:res.data.user})
                  } 
   
           })
           .catch((err) => {
                   console.log('helooo',err)
                   dispatch({type: 'EDIT_INFO_ERROR',msg:'Error While Updating'})
           }
       )
     
   }
   


// Reset Password by email
export const resetPassword = Data => dispatch => {

        setBasePath() 

        axios.post("/password-reset", Data)
        .then((res) => {
          //console.log(res.data)
               if(res.data.success == false)
               {       
                        dispatch({type: 'RESET_PASSWORD_ERROR',resetPasswordError:res.data.msg})
               }else{
                       
                        dispatch({type: 'RESET_PASSWORD_SUCCESS',resetPasswordSuccess:res.data.msg})
               } 

        })
        .catch((err) => {
                console.log(err)
                dispatch({type: 'RESET_PASSWORD_ERROR',resetPasswordError:'Invalid Email'})
        }
    )
}


// Change Password by email
export const changePassword = Data => dispatch => {

        setBasePath() 
        dispatch({type: 'CHANGE_PASSWORD_SUCCESS',changePasswordSuccess:'Password changed successfully.'})
//         axios.post("/change_password", Data)
//         .then((res) => {
//           //console.log(res.data)
//                if(res.data.success == false)
//                {       
//                         dispatch({type: 'CHANGE_PASSWORD_ERROR',changePasswordError:res.data.msg})
//                }else{
                       
//                         dispatch({type: 'CHANGE_PASSWORD_SUCCESS',changePasswordSuccess:res.data.msg})
//                } 

//         })
//         .catch((err) => {
//                 console.log(err)
//                 dispatch({type: 'CHANGE_PASSWORD_ERROR',changePasswordError:'Error While changing Password.'})
//         }
//     )
}

// Set logged in user
export const setCurrentUser = Data => dispatch => {
        dispatch({type: 'LOGIN_SUCCESS', user:Data.user,coupons:Data.coupons,campaigns:Data.campaigns})
};

// Log user out
export const logOutUser = Data => dispatch => {
        // Remove token from local storage
      //  AsyncStorage.clear();
        AsyncStorage.removeItem('User');
        AsyncStorage.removeItem('Token');
        // Remove auth header for future requests
        setAuthToken(false);
        // Set isAuthenticated to false
   
        dispatch({type: 'CLEAR_APPOINTMENTS'})
        dispatch({type: 'CLEAR_CATEGORIES'})
        dispatch({type: 'CLEAR_APPOINTMENTS'})
        dispatch({type: 'CLEAR_NEW_DOCTORS'})
        dispatch({type: 'CLEAR_REPORTS'})
        dispatch({type: 'LOGOUT_USER'})
       
    };


export const clearMessage = Data => dispatch => {
        dispatch({type: 'CLEAR_MESSAGES'})
}