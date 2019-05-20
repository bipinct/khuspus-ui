<template>
  <q-card>
    <q-card-title>
      {{displayName}}
      <span slot="subtitle">@{{username}}</span>
    </q-card-title>
    <q-card-separator/>
    <q-card-main>
      <div class="profilepic">
        <img :src="profilepic">
      </div>
      <div class="p_1">
        <div class="p_2">
          <div>
            <div class="title3">Posts</div>
            <div class="title2">
              <router-link to="/user/posts">
                <a>{{postCount}}</a>
              </router-link>
            </div>
          </div>
          <div>
            <div class="title3">Followers</div>
            <div class="title2">
              <router-link to="/user/followers">
                <a>{{followerCount}}</a>
              </router-link>
            </div>
          </div>
          <div>
            <div class="title3">Following</div>
            <div class="title2">
              <router-link to="/user/following">
                <a>{{followingCount}}</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>
<script>
export default {
  data () {
    return {

      postCount: this.$store.state.user.userdetails.postCounts,
      followerCount: this.$store.state.user.userdetails.followerCount,
      followingCount: this.$store.state.user.userdetails.followingCount,
      displayName: this.$store.state.user.userdetails.displayName,
      username: this.$store.state.user.userdetails.username

    }
  },
  computed: {
    profilepic () { return this.$store.state.user.userdetails.profilepic }
  }
}
</script>
<style scoped>
.profilename {
  font-size: 20px;
  font-weight: bold;
}
.username {
  font-size: 12px;
}
.p_0 {
  padding: 16px;
}
.p_1 {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
}
.p_2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.title3 {
  font-size: 13px;
  font-weight: bold;
}
.title2 a {
  text-decoration: none;
  color: black;
}
.title2 {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
</style>
