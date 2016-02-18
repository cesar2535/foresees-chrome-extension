export function sendMessage({ messageType = 'runtime', message }) {
  return new Promise((resolve, reject) => {
    if (typeof chrome[messageType] === 'undefined') reject(new Error(`This messageType '${messageType}' is not existed.`))
    chrome[messageType].sendMessage(message, response => {
      resolve(message)
    })
  })
}
