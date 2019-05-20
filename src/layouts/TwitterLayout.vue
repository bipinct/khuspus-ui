<template>
  <q-layout view="lHh Lpr lFf">
    <q-ajax-bar position="top" color="green"/>
    <q-layout-header>
      <q-toolbar color="white" :inverted="$q.theme === 'ios'" class="customHeader">
        <q-btn flat class="headerIcons" @click.native="$router.push('/user/feed')">
          <q-icon name="home"/>
          <span v-if="$q.platform.is.desktop">Home</span>
        </q-btn>
        <q-btn flat class="headerIcons" @click.native="$router.push('/user/groups')">
          <q-icon name="people"/>
          <span v-if="$q.platform.is.desktop">GROUP</span>
        </q-btn>
        <q-search v-model="search"/>
        <q-btn
          class="headerIcons"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-item-side :avatar="profilepic"></q-item-side>
          <q-icon name="menu"/>
        </q-btn>
        <PopupCreatePost v-if="$q.platform.is.desktop"/>
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
      <div class="ks-container">
        <div class="row">
          <div class="col-sm-3 col-xs-12 q-pa-sm" v-if="$q.platform.is.desktop">
            <UserCard/>
          </div>
          <div class="col-sm-6 col-xs-12 q-pa-sm">
            <router-view/>
          </div>
          <div class="col-sm-3 col-xs-12 q-pa-sm" v-if="$q.platform.is.desktop">
            <FollowSuggestionCard/>
          </div>
        </div>
      </div>
      <!-- <q-item multiline>
        <q-item-side>
          <UserCard/>
        </q-item-side>
        <q-item-main>
          <router-view/>
        </q-item-main>
        <q-item-side right>
          <FollowSuggestionCard/>
        </q-item-side>
      </q-item>-->
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import SideMenu from '../components/SideMenu'
import UserCard from '../components/twitter/UserCard'
import PopupCreatePost from '../components/popups/PopupCreatePost'
import FollowSuggestionCard from '../components/twitter/FollowSuggestionCard'
export default {
  name: 'TwitterLayout',
  components: {
    SideMenu,
    UserCard,
    PopupCreatePost,
    FollowSuggestionCard
  },
  data () {
    return {
      search: '',
      leftDrawerOpen: false
    }
  },
  methods: {
    openURL
  },
  computed: {
    profilepic () {
      return this.$store.state.user.userdetails.profilepic
    }
  }
}
</script>
<style>
.ks-container {
  /* background-color: brown; */
  /* border: 10px solid brown; */
  /* padding-top: 20px; */
}
</style>
        <!-- <q-btn flat class="headerIcons">
          <q-icon name="announcement"/>announcements
        </q-btn>-->
        <!-- <q-btn flat class="headerIcons">
          <q-icon name="message"/>message
        </q-btn>-->
