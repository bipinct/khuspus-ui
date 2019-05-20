<template>
  <q-page class="flex flex-center">
    <h1>Follow Suggestions</h1>
    <ApolloQuery
      :query="require('../../graphql/query/usersuggestions.gql')"
      :variables="{ cursor,limit }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data" class="result apollo">
          <q-list no-border>
            <div v-if="data.users.length">
              <q-item v-for="member in data.users" :key="member.id" multiline separator>
                <q-item-side>
                  <FollowUserBlock :username="member.username" :profilepic="member.profilepic"/>
                </q-item-side>
                <q-item-main>
                  <q-item-tile label>{{member.username}}</q-item-tile>
                  <q-item-tile sublabel wrap>{{member.about}}</q-item-tile>
                </q-item-main>
                <q-item-side right>
                  <FollowButton :isFollowing="false" :followerId="member.id"/>
                </q-item-side>
              </q-item>
            </div>
            <div v-else>
              <EmptyList message="No suggestions..."/>
            </div>
          </q-list>
        </div>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </q-page>
</template>
<script>
import FollowButton from '../FollowButton'
import FollowUserBlock from '../FollowUserBlock'
import EmptyList from '../EmptyList'
export default {
  components: {
    FollowButton,
    FollowUserBlock,
    EmptyList
  },
  data () {
    return {
      cursor: null,
      limit: 5
    }
  }
}
</script>
