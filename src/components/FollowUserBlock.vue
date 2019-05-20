<template>
  <q-item-side :avatar="profilepic" @click.native="gotoUserPage(username)" clikable></q-item-side>
  <!-- <q-item-main :label="label1" label-lines="1" :sublabel="label2" sublabel-lines="2"/> -->
</template>

<script>
export default {
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
