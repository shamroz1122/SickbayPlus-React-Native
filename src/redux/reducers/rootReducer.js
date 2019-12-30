import { combineReducers } from 'redux'
import auth from './authReducer'
import categories from './categoriesReducer'
import doctors from './doctorsReducer'
import appointment from './appointmentReducer'

export default combineReducers({
    auth,
    categories,
    doctors,
    appointment
}) 