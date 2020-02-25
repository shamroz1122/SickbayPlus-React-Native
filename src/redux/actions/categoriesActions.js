import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-community/async-storage';

 
// Reset Password by email
export const getCategories = Data => dispatch => {

        setBasePath() 
     
        //     setTimeout(function(){  dispatch({type: 'GET_CATEGORIES_SUCCESS',categories:data}) }, 400);

        // //  dispatch({type: 'GET_CATEGORIES_SUCCESS',categories:data})



        axios.post("/specialist-categories", Data)
        .then((res) => { 
          //console.log(res.data)
               if(res.data.success == false)
               {       
                        dispatch({type: 'GET_CATEGORIES_ERROR',msg:res.data.msg})
               }else{
                  
                        dispatch({type: 'GET_CATEGORIES_SUCCESS',categories:res.data.result.data})
               } 

        })
        .catch((err) => {
                console.log(err)
                dispatch({type: 'GET_CATEGORIES_ERROR',msg:'Something Went Wrong.'})
        })


}

export const clearCategoryMessage = Data => dispatch => {
        dispatch({type: 'CLEAR_CATEGORY_MESSAGES'})
}

export const loadingFlagCat = Data => dispatch => {
        dispatch({type: 'CAT_LOADING',loading:true})
}
    