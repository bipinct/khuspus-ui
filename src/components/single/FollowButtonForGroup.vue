/**
 component for follow / unfollow button
 */
<template>
  <ApolloMutation
    :mutation="require('../../graphql/actionfollowGroup.gql')"
    :variables="{targetId,action,type}"
    @done="onDone"
  >
    <template slot-scope="{ mutate, loading, error }">
      <div v-if="userIsOwner">
        <q-btn icon="delete" label="delete" color="red" @click="mutate()"/>
      </div>
      <div v-else>
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
          color="green"
          v-if="userIsFollowing"
          @click="mutate()"
        />
      </div>
      <p v-if="error">An error occured: {{ error }}</p>
    </template>
  </ApolloMutation>
</template>
<script>
export default {
  props: ['isFollowing', 'groupId', 'owner', 'canDelete'],
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
        if (data.data.follow.action === 'unfollow' && data.data.follow.status) {
          this.userIsFollowing = false
        } else if (data.data.follow.action === 'follow' && data.data.follow.status) {
          this.userIsFollowing = true
        } else {
          alert('error:' + data.data.follow.message)
        }
      }
    }
  },
  computed: {
    action () {
      let ac = this.userIsFollowing ? 'unfollow' : 'follow'
      return this.canDelete ? 'delete' : ac
    },
    userIsOwner () {
      return this.owner === this.$store.state.user.userdetails.id
    }

  }
}
</script>
