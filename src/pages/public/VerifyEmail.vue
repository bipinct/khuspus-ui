<template>
  <q-layout view="lHh Lpr lFf" style="padding:20px;">
    <div>
      <img src="statics/logo.png">
    </div>
    A verfication link send to your email address {{email}}.
    <router-link to="/">
      <a>click here to login</a>
    </router-link>
  </q-layout>
</template>
<script>
export default {
  props: ['email']
}
</script>
