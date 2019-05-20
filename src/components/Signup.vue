<template>
  <ApolloMutation
    :mutation="require('../graphql/signup.gql')"
    :variables="{
        username : form.username,
        password : form.password,
        phone: form.phone,
        email: form.email,
        firstname:form.firstname
      }"
    @done="onDone"
  >
    <template slot-scope="{ mutate, loading, error }">
      <div v-if="errors.length">{{errors}}</div>
      <q-input
        type="text"
        name="firname"
        float-label="Name"
        v-model="form.firstname"
        @blur="$v.form.firstname.$touch"
        :error="$v.form.firstname.$error"
      />

      <q-input
        type="text"
        name="username"
        float-label="pick a username"
        v-model="form.username"
        @blur="$v.form.username.$touch"
        :error="$v.form.username.$error"
      />
      <q-input
        type="text"
        name="email"
        float-label="email"
        v-model="form.email"
        @blur="$v.form.email.$touch"
        :error="$v.form.email.$error"
      />
      <q-input
        type="text"
        name="phone"
        float-label="phone"
        v-model="form.phone"
        @blur="$v.form.phone.$touch"
        :error="$v.form.phone.$error"
      />
      <q-input
        type="password"
        password="password"
        float-label="password"
        v-model="form.password"
        @blur="$v.form.password.$touch"
        :error="$v.form.password.$error"
      />
      <q-input
        type="password"
        name="confirmpassword"
        float-label="retype password"
        v-model="form.confirmpassword"
        @blur="$v.form.confirmpassword.$touch"
        :error="$v.form.confirmpassword.$error"
      />
      <div class="pTop">
        <q-btn
          rounded
          label="Signup"
          color="green"
          class="full-width q-btn-rectangle q-focusable q-hoverable"
          @click="verifyMutation(mutate)"
        />
        <p v-if="error">An error occured: {{ error }}</p>
      </div>
    </template>
  </ApolloMutation>
</template>
<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      errors: [],
      form: {
        firstname: '',
        username: '',
        password: '',
        email: '',
        confirmpassword: '',
        phone: ''
      }
    }
  },

  methods: {
    onDone (data) {
      if (data && data.data && data.data.signUp && data.data.signUp.status) {
        this.$router.push('/verify', { props: { email: this.form.email } })
      } else if (!data.data.signUp.status && data.data.signUp.errors) {
        this.errors = data.data.signUp.errors
      }
    },
    verifyMutation (mutate) {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        mutate()
      }
    }
  },
  validations: {
    form: {
      firstname: {
        required
      },
      username: {
        required, minLength: minLength(4)
      },
      password: {
        required
      },
      email: {
        required, email
      },
      phone: {
        required
      },
      confirmpassword: {
        sameAsPassword: sameAs('password')
      }
    }
  }
}

</script>
<style>
</style>
