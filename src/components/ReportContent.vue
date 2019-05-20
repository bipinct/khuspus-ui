<template>
  <ApolloMutation
    :mutation="require('../graphql/mutation/reportcontent.gql')"
    :variables="{postId : postId.toString(),reason:reason.toString(),message}"
    @done="reported"
  >
    <template slot-scope="{ mutate, loading, error }">
      <q-input
        v-model="message"
        type="textarea"
        placeholder="Help us understand the problem. What is going on with this post ?"
        :max-height="100"
        rows="3"
      />
      <q-option-group color="secondary" type="radio" v-model="reason" :options="optionList"/>
      <q-btn color="secondary" @click="mutate()">Send Report</q-btn>
      <p v-if="error">An error occured: {{ error }}</p>
    </template>
  </ApolloMutation>
</template>

<script>
export default {

  props: [
    'postId', 'optionList'
  ],

  data () {
    return {
      reason: '',
      message: '',
      group: ''
    }
  },
  methods: {
    reported (data) {
      if (data && data.data && data.data.reportContent && data.data.reportContent.status) {
        this.$q.notify({
          message: `Thanks for reporting the content`
        })
        window.history.back()
      }
    }
  }

}
</script>
