import configureStore from '../shared/store/configureStore'
import initStorage from '../shared/initStorage'
import createInitState from '../shared/helpers/createInitState'
import { createAsteroid } from '../shared/helpers/createMeteorConnect'

const Asteroid = createAsteroid({
  platform: 'chrome',
  endpoint: 'ws://localhost:8080/websocket'
})

const storage = JSON.parse(localStorage.getItem('persistent')) || initStorage
storage.userId = localStorage.getItem('userId')

const initialState = createInitState(storage)
const store = configureStore(initialState)

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  console.log(req)
  // Receiving updates from Popup Window and Content Scripts
  if (req.action === 'updateState') {
    store.dispatch({
      type: 'UPDATE_STATE',
      state: req.state
    })
  }
  // Passing initial state to Popup Window and Content Scripts
  if (req.action === 'getState') {
    sendResponse(store.getState())
  }

  if (req.action === 'login') {
    if (store.getState().userId) {
      return
    }

    if (!req.provider || typeof req.provider === 'undefined') {
      throw new Error('Expect the provider is a string')
    }

    Asteroid.loginWith('facebook').then(asteroid => {
      console.log(asteroid)
      const state = {
        persistent: {
          userId: asteroid.userId
        }
      }
      store.dispatch({
        type: 'UPDATE_STATE',
        state: state
      })
    })
  }
})
