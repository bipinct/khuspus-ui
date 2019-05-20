/**
Like button
 */
<template>
  <ApolloMutation
    :mutation="require('../graphql/likepost.gql')"
    :variables="{postId:postIdtoString(postId)}"
    @done="likeDone"
  >
    <template slot-scope="{ mutate, loading, error }">
      <p v-if="error">An error occured: {{ error }}</p>
      <q-item-tile
        v-if="isLikedHighlighted"
        icon="thumb_up"
        @click.native="mutate()"
        color="green"
      />
      <q-item-tile
        v-if="!isLikedHighlighted"
        icon="thumb_up"
        @click.native="mutate()"
        color="gray"
      />
      <span>({{dataLikedCount}})</span>
    </template>
  </ApolloMutation>
</template>
<script>
export default {
  props: ['isLiked', 'likeCount', 'postId'],
  data () {
    return {
      dataLikedCount: this.likeCount,
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
