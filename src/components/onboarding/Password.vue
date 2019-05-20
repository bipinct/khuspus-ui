<template>
  <q-page class="flex flex-center">
    <ApolloMutation
      :mutation="require('../../graphql/signin.gql')"
      :variables="{
        username : form.username,
        password : form.password
      }"
      @done="onDone"
    >
      <template slot-scope="{ mutate, loading, error }">
        <form @submit.prevent="mutate">
          <q-input
            name="username"
            type="text"
            disabled="true"
            v-model="form.username"
            @blur="$v.form.username.$touch"
            :error="$v.form.username.$error"
          />
          <q-input
            type="text"
            name="password"
            float-label="PIN"
            v-model="form.password"
            @blur="$v.form.password.$touch"
            :error="$v.form.password.$error"
          />

          <p v-if="error" class="q-mtb-sm">
            <span>{{makeError(error)}}</span>
            <label v-if="errorMessage" class="errorMsg">{{errorMessage}}</label>
          </p>
          <div class="pTop">
            <q-btn
              label="Next"
              color="blue"
              class="full-width q-btn-rectangle q-focusable q-hoverable"
              @click="verifyMutation(mutate)"
            />
          </div>
        </form>
      </template>
    </ApolloMutation>
  </q-page>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      display: 1,
      username: '',
      password: '',
      email: '',
      leftDrawer: true,
      form: {
        username: this.getLoginEmail(),
        password: ''
      },
      errorMessage: null

    }
  },
  methods: {
    onDone (data) {
      localStorage.setItem('x-token', data.data.signInWithOtp.token)
      localStorage.setItem('user', JSON.stringify(data.data.signInWithOtp.user))
      console.log('***************')
      console.log('***************')
      console.log(data.data)
      console.log('***************')
      console.log('***************')

      this.$store.commit('user/userLogin', { status: true, token: data.data.signInWithOtp.token, user: data.data.signInWithOtp.user })
      if (data.data.signInWithOtp.enableOnboarding) {
        this.$router.push('/onboarding')
      } else {
        this.$router.push('/user')
      }
    },
    getLoginEmail () {
      // console.log(this.$store.state.user)
      return this.$store.state.user.loginUsername
    },
    verifyMutation (mutate) {
      this.$v.form.$touch()
      console.log(JSON.stringify(this.$v.form))
      if (!this.$v.form.$error) {
        mutate()
      }
    },
    makeError (er) {
      if (er && er.graphQLErrors && er.graphQLErrors[0].message) { this.errorMessage = er.graphQLErrors[0].message }
    }

  },
  validations: {
    form: {
      username: {
        required, minLength: minLength(4)
      },
      password: {
        required
      }
    }
  }

}
</script>
