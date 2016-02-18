
const initialState = {
  projectUrl: 'http://scratch.mit.edu/projects/',
  playing: false
}

export default function scratchPlayer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PROJECT:
      return {
        ...state,
        projectUrl: action.projectUrl
      }
    default:
      return state
  }
}
