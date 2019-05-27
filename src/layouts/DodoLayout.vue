<template>
  <q-layout view="lHh Lpr lFf">
    <q-ajax-bar position="top" color="green"/>
    <q-layout-header view="hhh">
      <q-toolbar
        color="white"
        text-color="primary"
        :inverted="$q.theme === 'ios'"
        style="justify-content:space-between"
      >
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>
        <q-search v-model="search" clearable :debounce="600"/>
        <q-btn flat dense round aria-label="Menu">
          <q-icon name="apps"/>
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      side="left"
      :overlay="true"
    >
      <SideMenu/>
    </q-layout-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <PopupCreatePost/>
  </q-layout>
</template>
<script>

import SideMenu from '../components/SideMenu'

import PopupCreatePost from '../components/popups/PopupCreatePost'
export default {
  name: 'HomeLayout',

  data () {
    return {
      search: '',
      showPage: 1,
      leftDrawerOpen: this.$q.platform.is.desktop

    }
  },
  components: {
    SideMenu,
    PopupCreatePost
  },
  methods: {
    goToPage (page) {
      this.showPage = page
    },
    goBack () {
      window.history.back()
    },
    username () {
      return this.$store.state.user.userdetails.username
    }
  },
  created () {
    let token = localStorage.getItem('x-token')
    if (token) {
      // get user
      // update user state
      // this.$router.push('/feed')
    }
  },
  computed: {
    backButton () {
      console.log(window.history)
      return window.history.length
    }
  }
}
</script>

<style>
.block2 button {
  margin-top: 20px;
}
.pTop {
  margin-top: 20px;
}
.parent {
  display: flex;
  height: 100%;
  /* align-items: center; */
}
.parent > div {
  flex: 1;
}
.intro {
  align-items: stretch;
}
.loginP1 {
  background-color: #1da1f2;
  color: currentColor;
  /* border-radius: 30px; */
  vertical-align: top;
}
.login {
  display: flex;
  max-width: 300px;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
  text-align: center;
  padding: 20px;
}
.txt1 {
  padding: 20px;
  font-size: 24px;
}
</style>
