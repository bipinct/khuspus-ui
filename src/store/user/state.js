const userdata = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

export default {
  loginUsername: null,
  isLoggedIn: localStorage.getItem('x-token') || false,
  authToken: localStorage.getItem('x-token') || null,
  showSidebar: false,
  userdetails: {
    id: userdata ? userdata.id : null,
    username: userdata ? userdata.username : 'amit',
    firstname: userdata ? userdata.firstname : '',
    middlename: userdata ? userdata.middlename : '',
    lastname: userdata ? userdata.lastname : '',
    displayName: userdata ? userdata.displayName : '--',
    postCounts: userdata ? userdata.postCount : 0,
    followerCount: userdata ? userdata.followersCount : 0,
    followingCount: userdata ? userdata.followingCount : 0,
    profilepic: userdata
      ? userdata.profilepic
      : '/statics/img/photo_not_available.jpg',
    groups: userdata ? userdata.groups : [],
    email: userdata ? userdata.email : '',
    about: userdata ? userdata.about : '',
    phone: userdata ? userdata.phone : ''
  },
  permissions: [
    {
      label: 'Public',
      value: 'public'
    },
    {
      label: 'Private',
      value: 'private'
    },
    {
      label: 'Post in a group',
      value: 'group'
    }
  ],
  feeds: [],
  defaults: {
    groupProfilePic: '/statics/img/photo_not_available.jpg'
  }
}
