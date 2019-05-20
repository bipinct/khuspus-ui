<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-ajax-bar position="top" color="green"/> -->
    <!-- TODO add serarch bar here -->
    <q-layout-header view="hhh">
      <q-toolbar color="white" text-color="primary" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <!-- TODO set avatar pic -->
          <q-icon name="menu"/>
        </q-btn>
        <q-search v-model="search" clearable :debounce="600"/>
        <!-- <q-btn flat dense round @click="goBack" aria-label="Back">
          <q-icon name="keyboard_backspace"/>
        </q-btn>-->
        <!-- <q-toolbar-title>WIP {{backButton}}</q-toolbar-title> -->
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      side="right"
      :overlay="true"
    >
      <SideMenu/>
    </q-layout-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-layout-footer>
      <q-toolbar color="white" style="display:flex;justify-content:space-around;" no-shadow>
        <!-- <q-btn
          round
          color="primary"
          dense
          icon="person"
          @click.native="$router.push('/profile/'+username())"
        />-->
        <q-btn round color="primary" dense icon="person" @click.native="$router.push('/feed')"/>
        <q-btn round color="green" dense icon="check" @click.native="$router.push('/todos')"/>
        <PopupCreatePost/>
      </q-toolbar>
    </q-layout-footer>
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
