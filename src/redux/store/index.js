import { createStore,applyMiddleware,compose } from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from "redux-thunk";
const initialState = {};
const middleware = [thunk];

export default store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
    )
) 