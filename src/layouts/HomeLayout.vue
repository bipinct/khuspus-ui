<template>
  <q-layout view="lHh Lpr lFf">
    <q-ajax-bar position="top" color="green"/>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: 'HomeLayout',
  created () {
    let token = localStorage.getItem('x-token')
    if (token) {
      this.$router.push('/user')
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
