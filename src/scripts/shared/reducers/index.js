import { combineReducers } from 'redux'
import UPDATE_STATE from '../actions'
import persistent from './persistent'
import profile from './profile'

const rootReducer = combineReducers({
  profile,
  persistent
})

export default rootReducer
