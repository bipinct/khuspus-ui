/*
export function someGetter (state) {
}
*/
export function loggedId (state) {
  return state.token !== null
}

export function getloginEmail (state) {
  return state.user.loginUsername
}
