/**
 component for follow / unfollow button
 */
<template>
  <ApolloMutation
    :mutation="require('../graphql/actionfollowGroup.gql')"
    :variables="{targetId,action,type}"
    @done="onDone"
  >
    <template slot-scope="{ mutate, loading, error }">
      <q-btn
        icon="control_point"
        label="follow"
        color="tertiary"
        v-if="!userIsFollowing"
        @click="mutate()"
      />
      <q-btn
        icon="control_point"
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
  props: ['isFollowing', 'groupId'],
  data () {
    return {
      userIsFollowing: this.isFollowing,
      targetId: this.groupId.toString(),
      type: 'group'
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
