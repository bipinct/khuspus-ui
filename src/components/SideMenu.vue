// USED
<template>
  <q-list no-border link clickable>
    <q-item @click.native="$router.push('/profile/'+username())">
      <q-item-side>
        <q-item-side :avatar="profilepic()"></q-item-side>
      </q-item-side>
      <q-item-main :label="username()" label-lines="1"/>
    </q-item>
    <q-item-separator/>
    <q-item @click.native="$router.push('/user')">
      <q-item-side>
        <q-item-tile icon="format_align_justify" color="black-4"/>
      </q-item-side>
      <q-item-main label="Feeds"/>
      <q-item-side right></q-item-side>
    </q-item>
    <q-item @click.native="$router.push('/todos')">
      <q-item-side>
        <q-item-tile icon="insert_drive_file" color="black-4"/>
      </q-item-side>
      <q-item-main label="Todo"/>
      <q-item-side right></q-item-side>
    </q-item>

    <q-item @click.native="$router.push('/user/followers')">
      <q-item-side>
        <q-item-tile icon="person" color="black-4"/>
      </q-item-side>
      <q-item-main label="Followers"/>
      <q-item-side right></q-item-side>
    </q-item>
    <q-item @click.native="$router.push('/user/following')">
      <q-item-side>
        <q-item-tile icon="person_pin" color="black-4"/>
      </q-item-side>
      <q-item-main label="Following"/>
      <q-item-side right></q-item-side>
    </q-item>
    <q-item @click.native="$router.push('/suggestions/users')">
      <q-item-side>
        <q-item-tile icon="face" color="black-4"/>
      </q-item-side>
      <q-item-main label="User Suggestions"/>
      <q-item-side right></q-item-side>
    </q-item>
    <q-item-separator/>
    <q-item>
      <q-item-side>
        <q-item-tile icon="settings_power" color="black-4"/>
      </q-item-side>
      <q-item-main label="Logout" @click.native="logout()"/>
      <q-item-side right></q-item-side>
    </q-item>
  </q-list>
</template>
<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('user/destroyToken')
        .then(response => {
          this.$router.push('/')
        })
    },
    profilepic () {
      return this.$store.state.user.userdetails.profilepic
    },
    username () {
      return this.$store.state.user.userdetails.username
    }
  }
}
</script>
