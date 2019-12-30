const initState = {
    categoryError:null,
    categories:[],
    loading:true,
    checkCategories:false
  }
  
  const categoriesReducer = (state = initState, action) => {
    
    switch(action.type){

        case 'GET_CATEGORIES_ERROR':
        return {
            ...state,
            categoryError: action.msg,
            categories:[]
        } 
        case 'GET_CATEGORIES_SUCCESS':
        return {
            ...state,
            categoryError: null,
            categories:action.categories,
            loading:false,
            checkCategories: action.categories.length>0? true:false
        }
        case 'CLEAR_CATEGORY_MESSAGES':
        return {
              ...state,
              categoryError:null,
              checkCategories:false,
              categories:[]
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
  
  export default categoriesReducer 