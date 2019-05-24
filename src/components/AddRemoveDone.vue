<template>
  <ApolloMutation
    :mutation="require('../graphql/mutation/todoactions.gql')"
    :variables="{postId:postIdtoString(postId) ,action : action }"
    @done="likeDone"
    ref="todo"
  >
    <template slot-scope="{ mutate, loading, error }">
      <p v-if="error">An error occured: {{ error }}</p>
      <q-btn
        :color=" isinDone ? 'green': 'black'"
        flat
        icon="check"
        :label="makeLabelString"
        @click.stop="actionTodo()"
      />
    </template>
  </ApolloMutation>
</template>
<script>
export default {
  props: ['isLiked', 'likeCount', 'postId', 'isinTodo', 'isinDone', 'count'],
  data () {
    return {
      doneCount: this.count,
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
    },
    actionTodo () {
      // if (!this.isTodo)
      this.$refs.todo.mutate()
      // else this.showTodo = true
    }

  },
  computed: {
    makeLabelString () {
      return '(' + this.doneCount + ')'
    },
    action () {
      return 'done'
      // this.isinTodo ? 'done' : 'todo'
    }
  }

}
</script>
