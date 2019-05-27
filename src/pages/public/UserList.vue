<template>
  <q-page class="flex flex-center">
    <h1>Follow atleast 5 Users</h1>
    <!-- <ApolloQuery
      :query="require('../../graphql/query/usersuggestions.gql')"
      :variables="{ cursor,limit }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        {{data}}{{error}}
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data" class="result apollo">
          <q-list highlight>
            <q-list-header>User Suggestions</q-list-header>
            <div v-if="data.users.length">
              <q-item v-for="member in data.users" :key="member.id">
                <q-item-side>
                  <FollowUserBlock :username="member.username" :profilepic="member.profilepic"/>
                </q-item-side>
                <q-item-main :label="member.username" :sublabel="member.about"/>
                <q-item-side right>
                  <FollowButton :isFollowing="false" :followerId="member.id"/>
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
    -->
  </q-page>
</template>

<script>
// import FollowButton from '../../components/FollowButton'
// import FollowUserBlock from '../../components/FollowUserBlock'
// import EmptyList from '../../components/EmptyList'
export default {
  components: {
    // FollowButton,
    // FollowUserBlock,
    // EmptyList
  },
  data () {
    return {
      name: '',
      select: 'public',
      cursor: null,
      limit: null

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
