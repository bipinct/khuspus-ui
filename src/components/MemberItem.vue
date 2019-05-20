/**
NOT USED
 */
<template>
  <q-item>
    <q-item-side>
      <q-item-tile avatar>
        <img :src="profilePic">
      </q-item-tile>
    </q-item-side>
    <q-item-main :label="name"/>
    <q-item-side right>
      <q-btn v-if="!isMember" icon="control_point" label="invite" color="tertiary"/>
      <q-btn v-if="isMember" icon="highlight_off" label="remove" color="negative"/>
    </q-item-side>
  </q-item>
</template>

<script>
export default {
  props: {
    // profilePic: String,
    // id: String,
    // isMember: Boolean,
    // name: String
  },
  data () {
    return {
      profilePic: 'https://a.thumbs.redditmedia.com/QT5FBWUE5AT5taOPbeYc1NJcNRv4SpBV9dT-uIrMH_0.jpg',
      id: '1',
      isMember: true,
      isAdmin: true,
      name: 'Bittu Sharma'
    }
  }
  // computed: {
  //   cProfilePic: () => this.profilePic,
  //   cId: () => this.id,
  //   cIsMember: () => this.isMember,
  //   cName: () => this.name
  // }
}
</script>
