// USED IN DODO
<template>
  <q-page padding>
    <h1>Edit Profile</h1>
    <q-item>
      <q-item-main>
        <ApolloMutation
          :mutation="require('../../graphql/mutation/updateprofile.gql')"
          :variables="{firstname,middlename,lastname,email,dateofbirth,profilePic}"
          @done="onDone"
        >
          <template slot-scope="{ mutate, loading, error }">
            <form>
              <div>
                <img :src="profilePic" style="width:100px;">
                <PopupUpdateProfilePicture :profilepic="profilePic"/>
                <!-- <ApolloPopupUpdateProfilePicture :profilepic="profilePic"/> -->
              </div>
              <q-item>
                <q-item-main>
                  <q-input
                    type="text"
                    stack-label="First Name"
                    name="firstname"
                    v-model="firstname"
                  />
                </q-item-main>
                <q-item-main>
                  <q-input
                    type="text"
                    stack-label="Middle Name"
                    name="middlename"
                    v-model="middlename"
                  />
                </q-item-main>
                <q-item-main>
                  <q-input type="text" stack-label="Last Name" name="lastname" v-model="lastname"/>
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-main>
                  <q-input type="text" name="bio" stack-label="About" v-model="description"/>
                </q-item-main>
              </q-item>

              <q-item>
                <q-item-main>
                  <q-input stack-label="Email" disabled type="text" name="email" v-model="email"/>
                </q-item-main>
              </q-item>

              <q-item>
                <q-item-main>
                  <q-datetime
                    color="amber-7"
                    stack-label="Date Of Birth"
                    v-model="dateofbirth"
                    type="date"
                  />
                </q-item-main>
              </q-item>

              <q-item>
                <q-item-main>
                  <q-input
                    stack-label="Phone Number"
                    disabled
                    type="text"
                    name="phone"
                    v-model="phone"
                  />
                </q-item-main>
              </q-item>

              <q-btn color="blue" @click="mutate()">Update Profile</q-btn>
            </form>
            <p v-if="error">An error occured: {{ error }}</p>
          </template>
        </ApolloMutation>
      </q-item-main>
    </q-item>
  </q-page>
</template>

<script>
import PopupUpdateProfilePicture from '../../components/popups/PopupUpdateProfilePicture'
// import ApolloPopupUpdateProfilePicture from '../../components/popups/ApolloPopupUpdateProfilePicture'

export default {
  components: {
    PopupUpdateProfilePicture
    // ApolloPopupUpdateProfilePicture
  },
  data () {
    return {
      firstname: this.$store.state.user.userdetails.firstname,
      middlename: this.$store.state.user.userdetails.middlename,
      lastname: this.$store.state.user.userdetails.lastname,
      dateofbirth: this.$store.state.user.userdetails.dateofbirth,
      phone: this.$store.state.user.userdetails.phone,
      email: this.$store.state.user.userdetails.email,
      description: this.$store.state.user.userdetails.about
    }
  },
  created () {

  },
  methods: {
    onDone (data) {
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data.data.updateUser.user))
      this.$q.notify({ type: 'positive', message: 'profile updated successfully', position: 'top' })
    }
  },
  computed: {
    profilePic () {
      return this.$store.state.user.userdetails.profilepic
    }
  }
}
</script>

<style>
</style>
