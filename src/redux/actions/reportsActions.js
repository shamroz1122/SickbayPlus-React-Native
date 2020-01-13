import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-community/async-storage';

 
// Reset Password by email
export const getReports = Data => dispatch => {

        setBasePath() 
            let data = []

            if(Data.page==1)
            {
                data = [
                        {doctor:'Dr John Simpson',title:'Allergy Diagnosis',appointmentTime:'09.00 AM',appointmentDate:'2019-12-28',id:1},
                        {doctor:'Dr Shamroz Naseer',title:'Appendicitis Diagnosis',appointmentTime:'09.15 AM',appointmentDate:'2019-12-20',rating:4.5,id:2},
                        {doctor:'Dr Asim Azhar',title:'Asthma in Children Diagnosis',appointmentTime:'09.30 AM',appointmentDate:'2019-12-15',id:3},
                        {doctor:'Dr Hamza Sattar',title:'Complete Blood Count',appointmentTime:'09.45 AM',appointmentDate:'2019-12-10',id:4},
                        {doctor:'Dr Hazi Ali',title:'Crohn Disease',appointmentTime:'09.00 AM',appointmentDate:'2019-12-04',id:5},
                        {doctor:'Dr Ali Naseer',title:'Depression Diagnosis',appointmentTime:'01.00 PM',appointmentDate:'2019-11-25',id:6},
                        {doctor:'Dr Razzaq Azhar',title:'Flu (Influenza)',appointmentTime:'01.15 PM',appointmentDate:'2019-11-22',id:7},
                        {doctor:'Dr Nadeem Sattar',title:'Thyroid Blood Tests',appointmentTime:'03.00 PM',appointmentDate:'2019-11-09',id:8},
                        {doctor:'Dr Adnan Azhar',title:'Menopause Diagnosis',appointmentTime:'04.00 PM',appointmentDate:'2019-11-05',id:9},
                        {doctor:'Dr Talha Sattar',title:'Schizophrenia Diagnosis',appointmentTime:'11.00 AM',appointmentDate:'2019-11-02',id:10},
                
                ]
        
            }else if(Data.page==2)
            {
             
                        data = [
                                {doctor:'Dr Simpson',title:'Allergy Diagnosis',appointmentTime:'09.00 AM',appointmentDate:'2019-12-28',id:11},
                                {doctor:'Dr Naseer',title:'Appendicitis Diagnosis',appointmentTime:'09.15 AM',appointmentDate:'2019-12-20',rating:4.5,id:12},
                                {doctor:'Dr Azhar',title:'Asthma in Children Diagnosis',appointmentTime:'09.30 AM',appointmentDate:'2019-12-15',id:13},
                                {doctor:'Dr Sattar',title:'Complete Blood Count',appointmentTime:'09.45 AM',appointmentDate:'2019-12-10',id:14},
                                {doctor:'Dr Ali',title:'Crohn Disease',appointmentTime:'09.00 AM',appointmentDate:'2019-12-04',id:15},
                                {doctor:'Dr Naseer',title:'Depression Diagnosis',appointmentTime:'01.00 PM',appointmentDate:'2019-11-25',id:16},
                                {doctor:'Dr Azhar',title:'Flu (Influenza)',appointmentTime:'01.15 PM',appointmentDate:'2019-11-22',id:17},
                                {doctor:'Dr Sattar',title:'Thyroid Blood Tests',appointmentTime:'03.00 PM',appointmentDate:'2019-11-09',id:18},
                                {doctor:'Dr Azhar',title:'Menopause Diagnosis',appointmentTime:'04.00 PM',appointmentDate:'2019-11-05',id:19},
                                {doctor:'Dr Sattar',title:'Schizophrenia Diagnosis',appointmentTime:'11.00 AM',appointmentDate:'2019-11-02',id:20},
                        
                        ]
                
        
            }
            else{
                data = []
            }

            setTimeout(function(){  dispatch({type: 'GET_REPORTS_SUCCESS',reports:data}) }, 400);

        //  dispatch({type: 'GET_REPORTS_SUCCESS',reports:data})



        // axios.get("/get_reports", Data)
        // .then((res) => {
        //   //console.log(res.data)
        //        if(res.data.success == false)
        //        {       
        //                 dispatch({type: 'GET_REPORTS_ERROR',msg:res.data.msg})
        //        }else{
                       
        //                 dispatch({type: 'GET_REPORTS_SUCCESS',reports:res.data.reports})
        //        } 

        // })
        // .catch((err) => {
        //         console.log(err)
        //         dispatch({type: 'GET_REPORTS_ERROR',msg:'Something Went Wrong.'})
        // })


}

export const clearReportsMessage = Data => dispatch => {
        dispatch({type: 'CLEAR_REPORTS_MESSAGES'})
}

export const loadingFlag = Data => dispatch => {
        dispatch({type: 'LOADING',loading:true})
}
    