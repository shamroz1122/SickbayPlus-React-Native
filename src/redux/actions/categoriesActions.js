import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-community/async-storage';

 
// Reset Password by email
export const getCategories = Data => dispatch => {

        setBasePath() 
            let data = []

            if(Data.page==1)
            {
                data = [
                        {title:'Heart Surgeon',id:1},
                        {title:'Kidney Surgeon',id:2},
                        {title:'General Surgeon',id:3},
                        {title:'Otolaryngology Surgeon',id:4},
                        {title:'Ophathalmic Surgeon',id:5},
                        {title:'Plastic Surgeon',id:6},
                        {title:'Transplant Surgeon',id:7},
                ]
        
            }else if(Data.page==2)
            {
                data = [
                        {title:'Heart',id:8},
                        {title:'Kidney',id:9},
                        {title:'General',id:10},
                        {title:'Otolaryngology',id:11},
                        {title:'Ophathalmic',id:12},
                        {title:'Plastic',id:13},
                        {title:'Transplant',id:14},
                ]
        
            }
            else{
                data = []
            }

            setTimeout(function(){  dispatch({type: 'GET_CATEGORIES_SUCCESS',categories:data}) }, 400);

        //  dispatch({type: 'GET_CATEGORIES_SUCCESS',categories:data})



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

export const loadingFlag = Data => dispatch => {
        dispatch({type: 'LOADING',loading:true})
}
    