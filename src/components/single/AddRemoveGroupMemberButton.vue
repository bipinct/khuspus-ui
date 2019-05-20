<template>
  <ApolloMutation
    :mutation="require('../../graphql/mutation/addmembertogroup.gql')"
    ref="create"
    :variables="{
        'groupId': groupId.toString(),
        'userId':  userId.toString(),
        'userrole': permission,
        'action':action
      }"
    @done="onDone"
  >
    <template slot-scope="{ mutate, loading, error }">
      <q-btn v-if="isInGroup" label="remove" color="red" @click="mutate()"/>
      <q-btn v-if="!isInGroup" label="Add to group" color="green" @click="mutate()"/>
      <p v-if="error">An error occured: {{ error }}</p>
    </template>
  </ApolloMutation>
</template>
<script>
export default {
  props: ['userId', 'groupId', 'permission', 'isMember'],
  data () {
    return {
      action: this.isMember ? 'remove' : 'add',
      isInGroup: this.isMember || false
    }
  },
  methods: {
    onDone (data) {
      if (data && data.data && data.data.addMembers && data.data.addMembers.status) {
        this.isInGroup = true
        this.action = 'remove'
      }
    }
  }
}
</script>
