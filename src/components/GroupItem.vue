/**
element in groups list
 */
<template>
  <q-item>
    <q-item-side @click.native="gotoGroupPage(groupslug)">
      <q-item-tile avatar>
        <img :src="grouppic">
      </q-item-tile>
    </q-item-side>
    <q-item-main :label="name" :sublabel="description"></q-item-main>
    <q-item-side right>
      <FollowButtonForGroup
        :owner="owner"
        :groupId="groupid"
        :isFollowing="isFollowing"
        :canDelete="candelete"
      />
    </q-item-side>
  </q-item>
</template>

<script>

import FollowButtonForGroup from '../components/single/FollowButtonForGroup'
export default {
  props: ['grouppic', 'name', 'description', 'groupid', 'groupslug', 'isFollowing', 'owner'],
  components: { FollowButtonForGroup },
  methods: {
    gotoGroupPage (groupslug) {
      this.$router.push('/user/group/' + groupslug)
    }
  },
  computed: {
    candelete () {
      return this.owner === this.$store.state.user.userdetails.id
    }
  }
}
</script>
