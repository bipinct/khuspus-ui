<template>
  <ApolloMutation
    :mutation="require('../graphql/likepost.gql')"
    :variables="{postId:postIdtoString(postId)}"
    @done="likeDone"
  >
    <template slot-scope="{ mutate, loading, error }">
      <p v-if="error">An error occured: {{ error }}</p>
      <q-btn flat icon="comments" :label="dataLikedCount"/>
    </template>
  </ApolloMutation>
</template>
<script>
export default {
  props: ['isLiked', 'likeCount', 'postId'],
  data () {
    return {
      dataLikedCount: '(' + this.likeCount + ')',
      isLikedHighlighted: this.isLiked
    }
  },
  methods: {
    likeDone (data) {
      this.isLikedHighlighted = true
      this.dataLikedCount++
    },
    postIdtoString (postId) {
      return postId.toString()
    }

  }

}
</script>
