import { UPDATE_PROFILE, UPDATE_FAVORITE } from '../actions/profile'
import { LOGOUT } from '../actions'

const initialState = {
  favorites: []
}

export default function profile(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...state, ...action.profile }
    case UPDATE_FAVORITE:
      return {
        ...state,
        favorites: action.favorites
      }
    case LOGOUT:
      return {}
    default:
      return state
  }
}
