<template>
  <ApolloMutation
    :mutation="require('../graphql/signin.gql')"
    :variables="{email:form.email}"
    @done="onDone"
  >
    <template slot-scope="{ mutate, loading, error }">
      <q-input
        type="text"
        name="email"
        float-label="enter email address"
        v-model="form.email"
        @blur="$v.form.email.$touch"
        :error="$v.form.email.$error"
      />
      <p v-if="error">An error occured: {{ error }}</p>
      <div class="pTop">
        <q-btn
          rounded
          label="Forget Password"
          color="red"
          class="full-width q-btn-rectangle q-focusable q-hoverable"
          @click="verifyMutation(mutate)"
        />
      </div>
    </template>
  </ApolloMutation>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      form: {
        email: ''
      }
    }
  },
  methods: {
    onDone (data) {

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
      email: {
        required, email
      }
    }
  }

}
</script>

<style>
</style>
