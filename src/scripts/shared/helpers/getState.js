import initStorage from '../initStorage'
import createInitState from './createInitState'
  //Get store from Background Page

export default function getState() {
  return new Promise((resolve, reject) => {
    if (window.chrome && chrome.runtime && chrome.runtime.id) {
      chrome.runtime.sendMessage({
        action: 'getState'
      }, res => {
        console.log('getState', res);
        if (res) {
          resolve(res)
        } else {
          reject(new Error('Cannot reach Background Page'))
        }
      })
    } else {
      resolve(createInitState(initStorage))
    }
  })
}
