<template>
  <q-page class="kp_maincontent">
    <ApolloQuery :query="require('../../graphql/follower.gql')" :variables="{ name }">
      <template slot-scope="{ result: { loading, error, data } }">
        {{error}}
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data" class="result apollo">
          <q-list highlight>
            <q-list-header>Followers</q-list-header>
            <div v-if="data.followers.length">
              <q-item v-for="member in data.followers" :key="member.user.id">
                <q-item-side>
                  <FollowUserBlock
                    :username="member.user.username"
                    :profilepic="member.user.profilepic"
                  />
                </q-item-side>
                <q-item-main :label="member.user.username" :sublabel="member.user.about"/>
                <q-item-side right>
                  <FollowButton isFollowing="false" :followerId="member.followerId"/>
                </q-item-side>
              </q-item>
            </div>
            <div v-else>
              <EmptyList message="No followers yet..."/>
            </div>
          </q-list>
        </div>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </q-page>
</template>

<script>
import FollowButton from '../../components/FollowButton'
import FollowUserBlock from '../../components/FollowUserBlock'
import EmptyList from '../../components/EmptyList'
export default {
  components: {
    FollowButton,
    FollowUserBlock,
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
