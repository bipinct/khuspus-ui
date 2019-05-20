/**
element in the list of following page
 */
<template>
  <q-item>
    <q-item-side>
      <q-item-tile avatar>
        <img :src="profilepic">
      </q-item-tile>
    </q-item-side>
    <q-item-main :label="username" :sublabel="description"/>
    <q-item-side right>
      <FollowButton :isFollowing="isFollowing" :followerId="userId"/>
    </q-item-side>
  </q-item>
</template>

<script>
import FollowButton from '../components/FollowButton'
export default {
  props: ['profilepic', 'username', 'description', 'isFollowing', 'userId'],
  components: {
    FollowButton
  }

}
</script>
