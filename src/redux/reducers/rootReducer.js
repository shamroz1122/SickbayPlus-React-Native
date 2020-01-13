import { combineReducers } from 'redux'
import auth from './authReducer'
import categories from './categoriesReducer'
import doctors from './doctorsReducer'
import appointment from './appointmentReducer'
import reports from './reportsReducer'
import notifications from './notificationsReducer'


export default combineReducers({
    auth,
    categories,
    doctors,
    appointment,
    reports,
    notifications
}) 