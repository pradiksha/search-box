import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import userReducer from "Users/Components/reducer"

const rootReducer = combineReducers({
    form: formReducer,
    usersData: userReducer,
})

export default rootReducer
