<template>
  <ApolloMutation
    :mutation="require('../graphql/mutation/addusercategory.gql')"
    :variables="{category:id,action:action}"
    @done="isDone"
  >
    <template slot-scope="{ mutate, loading, error }">
      <p v-if="error">An error occured: {{ error }}</p>

      <div
        style="overflow:hidden;border:3px solid #fff; position:relative;"
        @click.native="mutate()"
      >
        <img style="width:90%" :src="image">
        <div style="background-color:#fff;padding:6px;">{{name}}</div>
        <q-btn color="primary" @click="mutate" v-if="showAdd">Add</q-btn>
        <q-btn color="red" @click="mutate" v-if="!showAdd">remove</q-btn>
      </div>
    </template>
  </ApolloMutation>
</template>
<script>
export default {
  props: ['id', 'name', 'image'],
  data () {
    return {
      action: 'add',
      showAdd: true
    }
  },
  methods: {
    isDone (data) {
      if (data && data.data && data.data.addUserCategories && data.data.addUserCategories.status) {
        this.action = this.action === 'add' ? 'remove' : 'remove'
        this.showAdd = this.action === 'add' || false
      }
    }
  }
}
</script>
