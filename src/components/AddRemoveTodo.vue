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
        :color=" isTodo ? 'green': 'black'"
        flat
        icon="list"
        :label="makeLabelString"
        @click.stop="actionTodo()"
      >
        <q-tooltip v-if="showTodo">cannot remove from todo</q-tooltip>
      </q-btn>
    </template>
  </ApolloMutation>
</template>
<script>
export default {
  props: ['isLiked', 'likeCount', 'postId', 'isinTodo', 'isinDone', 'count'],
  data () {
    return {
      isTodo: this.isinTodo,
      todoCount: this.count,
      isLikedHighlighted: this.isLiked,
      showTodo: false
    }
  },
  methods: {
    likeDone (data) {
      this.isLikedHighlighted = true
      this.todoCount++
      this.isTodo = true
    },
    postIdtoString (postId) {
      return postId.toString()
    },
    actionTodo () {
      if (!this.isTodo) this.$refs.todo.mutate()
      else this.showTodo = true
    }
  },
  computed: {
    makeLabelString () {
      return '(' + this.todoCount + ')'
    },
    action () {
      return this.isinTodo ? 'done' : 'todo'
    }
  }

}
</script>
