export function userLogin (state, data) {
  state.isLoggedIn = data.status
  state.authToken = data.token
  updateUserInStore(state, data)
}

export function destroyToken (state) {
  state.isLoggedIn = false
  state.authToken = null
  state.userdetails = {
    id: null,
    username: '--',
    firstname: '',
    middlename: '',
    lastname: '',
    profilepic: '/statics/img/photo_not_available.jpg',
    groups: [],
    email: '',
    about: '',
    phone: '',
    displayName: '',
    postCounts: 0,
    followerCount: 0,
    followingCount: 0
  }
}

export function toggleSidebar (state) {
  state.showSidebar = !state.showSidebar
}

export function updateUserInStore (state, data) {
  state.userdetails.id = data.user.id
  state.userdetails.username = data.user.username
  state.userdetails.profilepic = data.user.profilepic
  state.userdetails.displayName = data.user.displayName
  state.userdetails.postCounts = data.user.postCount
  state.userdetails.followerCount = data.user.followersCount
  state.userdetails.followingCount = data.user.followingCount
  if (data.user.firstname) state.userdetails.firstname = data.user.firstname
  if (data.user.middlename) state.userdetails.middlename = data.user.middlename
  if (data.user.lastname) state.userdetails.lastname = data.user.lastname
  if (data.user.displayName) {
    state.userdetails.displayName = data.user.displayName
  }
  if (data.user.postCount) state.userdetails.postCounts = data.user.postCount
  if (data.user.groups) state.userdetails.groups = data.user.groups
  if (data.user.email) state.userdetails.email = data.user.email
  if (data.user.about) state.userdetails.about = data.user.about
  if (data.user.phone) state.userdetails.phone = data.user.phone
}
export function updateProfilepic (state, data) {
  state.userdetails.profilepic = data.profilepic
}

export function setloginEmail (state, data) {
  state.loginUsername = data.loginUsername
}

export function userFeeds (state, data) {
  state.feeds.push(data)
}
