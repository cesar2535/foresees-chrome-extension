import { UPDATE_PROFILE } from '../actions/profile'
import { LOGOUT } from '../actions'

const initialState = {}

export default function profile(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...state, ...action.profile }
    case LOGOUT:
      return {}
    default:
      return state
  }
}
