<template>
  <q-item-main @click.native="gotoUserPage(username)" clikable>
    <AvatarPic :src="profilepic"/>
    <q-item-main :label="label1" label-lines="1" :sublabel="label2" sublabel-lines="2"/>
  </q-item-main>
</template>

<script>
import AvatarPic from './core/AvatarPic'
export default {
  components: {
    AvatarPic
  },
  props: ['username', 'profilepic', 'label1', 'label2'],
  methods: {
    gotoUserPage (userslug) {
      this.$router.push('/profile/' + userslug)
    }

  }
}
</script>
<style>
.profilepic {
  cursor: pointer;
}
</style>
