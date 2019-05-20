/*
export function someAction (context) {
}
*/
export function destroyToken (context) {
  if (context.getters.loggedId) {
    localStorage.removeItem('x-token')
    localStorage.removeItem('user')
  }
  context.commit('destroyToken')
  return true
}

export function updateFeed (context, data) {
  context.commit('userFeeds', data)
}
