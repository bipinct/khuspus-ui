<template>
  <q-list no-border link clickable>
    <q-item @click.native="$router.push('/profile/'+username())">
      <q-item-side>
        <q-item-side :avatar="profilepic()"></q-item-side>
      </q-item-side>

      <q-item-main :label="username()" label-lines="1"/>
    </q-item>
    <q-item-separator/>
    <q-item @click.native="$router.push('/user/feed')">
      <q-item-side>
        <q-item-tile icon="format_align_justify" color="blue-4"/>
      </q-item-side>
      <q-item-main label="Feeds"/>
      <q-item-side right></q-item-side>
    </q-item>
    <q-item @click.native="$router.push('/user/posts')">
      <q-item-side>
        <q-item-tile icon="insert_drive_file" color="blue-4"/>
      </q-item-side>
      <q-item-main label="My Posts"/>
      <q-item-side right></q-item-side>
    </q-item>
    <q-item @click.native="$router.push('/user/groups')">
      <q-item-side>
        <q-item-tile icon="people" color="blue-4"/>
      </q-item-side>
      <q-item-main label="Groups"/>
      <q-item-side right></q-item-side>
    </q-item>
    <q-item @click.native="$router.push('/user/followers')">
      <q-item-side>
        <q-item-tile icon="person" color="blue-4"/>
      </q-item-side>
      <q-item-main label="Followers"/>
      <q-item-side right>
        <!-- <q-chip color="secondary">0</q-chip> -->
      </q-item-side>
    </q-item>
    <q-item @click.native="$router.push('/user/following')">
      <q-item-side>
        <q-item-tile icon="person_pin" color="blue-4"/>
      </q-item-side>
      <q-item-main label="Following"/>
      <q-item-side right>
        <!-- <q-chip color="secondary">0</q-chip> -->
      </q-item-side>
    </q-item>
    <q-item>
      <q-item-side>
        <q-item-tile icon="photo_library" color="blue-4"/>
      </q-item-side>
      <q-item-main label="Slides"/>
      <q-item-side right>
        <!-- <q-chip color="secondary">1</q-chip> -->
      </q-item-side>
    </q-item>

    <q-item @click.native="$router.push('/suggestions/users')">
      <q-item-side>
        <q-item-tile icon="face" color="blue-4"/>
      </q-item-side>
      <q-item-main label="User Suggestions"/>
      <q-item-side right>
        <!-- <q-chip color="secondary">1</q-chip> -->
      </q-item-side>
    </q-item>

    <q-item @click.native="$router.push('/suggestions/groups')">
      <q-item-side>
        <q-item-tile icon="apps" color="blue-4"/>
      </q-item-side>
      <q-item-main label="Group Suggestions"/>
      <q-item-side right>
        <!-- <q-chip color="secondary">1</q-chip> -->
      </q-item-side>
    </q-item>

    <q-item-separator/>

    <q-item>
      <q-item-side>
        <q-item-tile icon="settings_power" color="blue-5"/>
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
    <!-- <q-item>
      <q-item-side>
        <q-item-tile icon="settings" color="gray"/>
      </q-item-side>
      <q-item-main label="Settings"/>
      <q-item-side right></q-item-side>
    </q-item> -->
