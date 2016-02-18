export function getCurrentTab() {
  return new Promise( (resolve, reject) => {
    if (window.chrome && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
      }, tabs => {
        if (tabs.length === 0) {
          reject(new Error('No tab be detected.'))
        } else {
          resolve(tabs[0])
        }
      })
    } else {
      reject(new Error('Expected the chrome.tabs.query be existed.'))
    }
  })
}
