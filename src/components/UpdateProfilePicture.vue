<template>
  <div>
    <ApolloMutation
      :mutation="require('../graphql/mutation/updateprofile.gql')"
      :variables="{targetId,action}"
      @done="onDone"
    >
      <template slot-scope="{ mutate, loading, error }">
        <div>
          <img :src="profilepic" style="width:100px;">
          <div>
            <label>Change Profile pic</label>
            <q-uploader :url="url" :multiple="true" :auto-expand="true"/>
          </div>
        </div>
        <p v-if="error">An error occured: {{ error }}</p>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
export default {
  props: ['profilepic', 'url'],
  data () {
    return {

      targetId: '', action: ''
    }
  },
  methods: {
    onDone (data) {
      console.log(data)
    }
  },
  computed: {

  }
}
</script>
