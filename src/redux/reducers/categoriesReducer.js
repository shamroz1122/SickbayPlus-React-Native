const initState = {
    categoryError:null,
    categories:[]
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
            categories:action.categories
        }
        case 'CLEAR_MESSAGES':
          return {
              ...state,
              categoryError:null
          }
      
        default:
          return state
    } 
  
  }
  
  export default categoriesReducer 