export function checkProjectUrl(url) {
  return /^(https|http):\/\/scratch.mit.edu\/projects\/\d+/.test(url)
}
