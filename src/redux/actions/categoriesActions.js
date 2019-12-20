import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-community/async-storage';


// Reset Password by email
export const getCategories = Data => dispatch => {

        setBasePath() 

        let data = [
                {title:'Heart Surgeon',id:1},
                {title:'Kidney Surgeon',id:2},
                {title:'General Surgeon',id:3},
                {title:'Otolaryngology Surgeon',id:4},
                {title:'Ophathalmic Surgeon',id:5},
                {title:'Plastic Surgeon',id:6},
                {title:'Transplant Surgeon',id:7},
            ]

        dispatch({type: 'GET_CATEGORIES_SUCCESS',categories:data})

        // axios.get("/get_categories", Data)
        // .then((res) => {
        //   //console.log(res.data)
        //        if(res.data.success == false)
        //        {       
        //                 dispatch({type: 'GET_CATEGORIES_ERROR',msg:res.data.msg})
        //        }else{
                       
        //                 dispatch({type: 'GET_CATEGORIES_SUCCESS',categories:res.data.categories})
        //        } 

        // })
        // .catch((err) => {
        //         console.log(err)
        //         dispatch({type: 'GET_CATEGORIES_ERROR',msg:'Something Went Wrong.'})
        // })


}

export const clearCategoryMessage = Data => dispatch => {
        dispatch({type: 'CLEAR_CATEGORY_MESSAGES'})
}