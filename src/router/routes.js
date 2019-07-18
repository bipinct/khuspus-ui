// layouts
import HomeLayout from '../layouts//HomeLayout'
import DodoLayout from '../layouts/DodoLayout'
import TodoList from '../pages/user/TodoList'
// user pages
import FeedList from '../pages/user/FeedList'
import SingleFeedItem from '../pages/user/SingleFeedItem'
import Login from '../pages/public/Login'
import VerifyOTP from '../pages/public/VerifyOTP'

import PostList from '../pages/user/PostList'
import Followers from '../pages/user/Followers'
import Following from '../pages/user/Following'
import EditProfile from '../pages/user/EditProfile'
// public pages
import VerifyEmail from '../pages/public/VerifyEmail'
import PublicProfile from '../pages/public/PublicProfile'
import PostDoneList from '../pages/PostDoneList'
import PostTodoList from '../pages/PostTodoList'

import Onboarding from '../pages/user/Onboarding'

// The application will have 3 types of routes
// public [will be accessibe by route name]
// user public
// private [user route will be accessible under /user]
// user private
// user public will be user todos list
// user todo single
// user private woll be  feed and profile
// create

const routes = [
  {
    path: '/',
    component: HomeLayout, // used
    children: [
      // used
      {
        path: '/login',
        component: Login
      },
      {
        path: '/verify-otp',
        component: VerifyOTP
      },
      {
        path: '/onboarding',
        component: Onboarding
      }
    ]
  },
  {
    path: '/post',
    component: DodoLayout,
    children: [
      { path: '/', component: PostList },
      {
        path: 'todo-users/*',
        component: PostTodoList
      },
      {
        path: 'done-users/*',
        component: PostDoneList
      },
      { path: '*', component: SingleFeedItem }
    ]
  },

  {
    path: '/profile',
    component: DodoLayout,
    children: [
      {
        path: 'edit',
        component: EditProfile
      },
      {
        path: '*',
        component: PublicProfile
      }
    ]
  },
  {
    path: '/verify',
    component: VerifyEmail,
    props: true
  },
  {
    path: '/user',
    component: DodoLayout,
    children: [
      {
        path: '/',
        component: FeedList
      },
      {
        path: '/todos',
        component: TodoList
      },
      {
        path: 'followers',
        component: Followers
      },
      {
        path: 'following',
        component: Following
      }
    ]
  }
]
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
