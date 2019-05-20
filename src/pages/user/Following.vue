<template>
  <q-page class="kp_maincontent">
    <ApolloQuery :query="require('../../graphql/following.gql')" :variables="{ name }">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>
        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <q-list highlight>
            <q-list-header>Following</q-list-header>
            <div v-if="data.following.length">
              <FollowingItem
              v-for="member in data.following"
              :key="member.userId"
              userId:="member.userId"
              :username="member.user.username"
              :profilepic="member.user.profilepic"
              :description="member.user.about"
              :isFollowing="member.isMember"
              />
            </div>
            <div v-else>
              <EmptyList message="Not following yet..."/>
            </div>
          </q-list>
          <!-- {{ data}} -->
        </div>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </q-page>
</template>

<script>

import FollowingItem from '../../components/FollowingItem'
import EmptyList from '../../components/EmptyList'
export default {
  components: {
    FollowingItem,
    EmptyList
  },
  data () {
    return {
      name: '',
      select: 'public'
    }
  },
  methods: {
    setPermission (perm) {
      if (this.select === 'group') {
        this.showGroup = true
      }
    }
  }
}
</script>

<style>
.writePost {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 6px;
}
.pad2 {
  padding-top: 20px;
}
</style>
