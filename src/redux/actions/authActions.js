import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-community/async-storage';

// Login - get user token
export const login = Data => dispatch => {

        setBasePath() 

        axios.post("/auth/login", Data)
        .then((res) => {
       //   console.log(res.data)
               if(res.data.success == false)
               {       
                        dispatch({type: 'LOGIN_ERROR',msg:res.data.message[0]})
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
                dispatch({type: 'LOGIN_ERROR',msg:'Invalid Credentials'})
        }
    );
  
};   

// SignUp User
export const signUp = Data => dispatch => {

        setBasePath() 
        dispatch({type: 'SIGN_UP_ERROR',msg:'Error While Registration'})
//         axios.post("/auth/register", Data)
//         .then((res) => {
//        //   console.log(res.data)
//                if(res.data.success == false)
//                {       
//                         dispatch({type: 'LOGIN_ERROR',msg:res.data.message[0]})
//                }else{
                       
//                         // Set token to localStorage
//                         const token = res.data.token;
//                         AsyncStorage.setItem("User", JSON.stringify(res.data.user));
//                         AsyncStorage.setItem("Token", token);
//                         setAuthToken(token);
                
//                         dispatch({type: 'LOGIN_SUCCESS',user:res.data.user})
//                } 

//         })
//         .catch((err) => {
//                 console.log(err)
//                 dispatch({type: 'LOGIN_ERROR',msg:'Error While Registration.'})
//         }
//     );
  
};   



// Reset Password by email
export const resetPassword = Data => dispatch => {

        setBasePath() 

        axios.post("/password_reset", Data)
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
        AsyncStorage.clear();
        // Remove auth header for future requests
        setAuthToken(false);
        // Set isAuthenticated to false
        dispatch({type: 'LOGOUT_USER'})
       
    };


export const clearMessage = Data => dispatch => {
        dispatch({type: 'CLEAR_MESSAGES'})
}