import {combineReducers, configureStore} from '@reduxjs/toolkit'
import  questionReducer  from './question_reducr'


import resultReducer from './result_reducer'

const rootReducer = combineReducers({
    questions: questionReducer,
    result : resultReducer
})

export default configureStore({reducer : rootReducer})