import { combineReducers } from 'redux'
import UPDATE_STATE from '../actions'
import persistent from './persistent'
import profile from './profile'
import scratchPlayer from './scratchPlayer'

const rootReducer = combineReducers({
  profile,
  persistent
})

export default rootReducer
