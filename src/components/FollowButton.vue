/**
 component for follow / unfollow button
 */
<template>
  <ApolloMutation
    :mutation="require('../graphql/actionfollow.gql')"
    :variables="{targetId,action}"
    @done="onDone"
  >
    <template slot-scope="{ mutate, loading, error }">
      <q-btn
        rounded
        size="sm"
        label="follow"
        color="green"
        v-if="!userIsFollowing"
        @click="mutate()"
      />
      <q-btn
        rounded
        size="sm"
        label="unfollow"
        color="red"
        v-if="userIsFollowing"
        @click="mutate()"
      />
      <p v-if="error">An error occured: {{ error }}</p>
    </template>
  </ApolloMutation>
</template>
<script>
export default {
  props: ['isFollowing', 'followerId'],
  data () {
    return {
      userIsFollowing: this.isFollowing,
      targetId: this.followerId.toString()
    }
  },
  methods: {
    onDone (data) {
      if (data && data.data.follow && data.data.follow.action) {
        if (data.data.follow.action === 'unfollow') {
          this.userIsFollowing = false
        } else if (data.data.follow.action === 'follow') {
          this.userIsFollowing = true
        }
      }
    }
  },
  computed: {
    action () {
      return this.userIsFollowing ? 'unfollow' : 'follow'
    }
  }
}
</script>
