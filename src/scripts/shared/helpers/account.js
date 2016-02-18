import { sendMessage } from './promisify'

export function login(provider) {
  return sendMessage({ message: { action: 'login', provider }})
}

export function logout() {
  return sendMessage({ message: { action: 'logout' }})
}
