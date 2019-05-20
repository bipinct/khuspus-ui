<template>
  <q-page class="flex flex-center">
    <ApolloMutation
      :mutation="require('../../graphql/signin.gql')"
      :variables="{
        username : form.username,
        password : ''
      }"
      @done="onDone"
    >
      <template slot-scope="{ mutate, loading, error }">
        <h1>Hey Let's gets started</h1>
        <form @submit.prevent="mutate">
          <q-input
            type="text"
            name="username"
            float-label="Email"
            v-model="form.username"
            @blur="$v.form.username.$touch"
            :error="$v.form.username.$error"
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
              @click="mutate()"
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
      form: {
        username: '',
        password: ''
      },
      errorMessage: null
    }
  },
  methods: {
    onDone (data) {
      if (data.data && data.data.signInWithOtp && data.data.signInWithOtp.status) {
        this.$store.commit('user/setloginEmail', { loginUsername: this.form.username })
        this.$router.push('/verify-otp')
      }
    },
    verifyMutation (mutate) {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        mutate()
      }
    },
    makeError (er) {
      console.log(er)
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
