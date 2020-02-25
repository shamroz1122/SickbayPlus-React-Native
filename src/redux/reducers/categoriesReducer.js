const initState = {
    categoryError:null,
    categories:[],
    loading:true,
    checkCategories:3
  }
  
  const categoriesReducer = (state = initState, action) => {
    
    switch(action.type){

        case 'GET_CATEGORIES_ERROR':
        return {
            ...state,
            categoryError: action.msg,
            categories:[],
            loading:false,
            checkCategories:2
        } 
        case 'GET_CATEGORIES_SUCCESS':
        return { 
            ...state,
            categoryError: null,
            categories:action.categories,
            loading:false,
            checkCategories: action.categories.length>0? 1:3
        }
        case 'CLEAR_CATEGORY_MESSAGES':
        return {
              ...state,
              categoryError:null,
              checkCategories:2,
              categories:[]
        }
        case 'CLEAR_CATEGORIES':
          return {
                ...state,
                categories:[],
                checkCategories:3
           }
        case 'CAT_LOADING':
        return {
              ...state,
              loading:action.loading
            
        }
      
        default:
          return state
    } 
  
  }
  
  export default categoriesReducer 