import { UPDATE_STATE, LOGOUT } from '../actions'

const initialState = {
  userId: ''
}

export default function persistent(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATE:
      const newState = Object.assign({}, state, action.state.persistent)
      if (location.protocol == 'chrome-extension:' && chrome.extension.getBackgroundPage() === window) {
        localStorage.setItem('persistent', JSON.stringify(newState))
      }
      return newState
    case LOGOUT:
      return Object.assign({}, state, { userId: '' })
    default:
      return state
  }
}
