<template>
  <q-list no-border>
    <q-item v-for="(comment, index) in commentList" :key="index">
      <q-item-side>
        <q-item-tile avatar>
          <img :src="comment.user.profilepic">
        </q-item-tile>
      </q-item-side>
      <q-item-main>
        <q-item-tile label>{{comment.user.username}}</q-item-tile>
        <q-item-tile sublabel>{{comment.comment}}</q-item-tile>
      </q-item-main>
      <q-item-side right>
        <q-icon name="delete" v-if="comment.user.id == userId"/>
        <q-icon name="edit" v-if="comment.user.id == userId"/>
      </q-item-side>
    </q-item>
    <ApolloQuery
      v-if="isloadingMoreComments"
      :query="require('../graphql/_custom/loadMoreComments.gql')"
      :variables="{ cursor:commentCursor.toString() , postId }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>
        <!-- Result -->
        <div v-else-if="data" class="result apollo">{{ showMoreComments(data) }}</div>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
    <q-btn
      v-if="commentCursor"
      label="Load More comments"
      color="blue"
      class="full-width q-btn-rectangle q-focusable q-hoverable"
      @click="loadMoreComments()"
    />
  </q-list>
</template>
<script>
export default {

  props: ['comments', 'newCommentData', 'postId'],
  data () {
    return {
      isloadingMoreComments: false,
      commentList: this.comments ? this.comments.comments : [],
      commentCursor: this.comments ? this.comments.cursor : null,
      userId: this.$store.state.user.userdetails.id
    }
  },
  methods: {
    loadMoreComments (cursor) {
      this.isloadingMoreComments = true
    },
    showMoreComments (data) {
      this.isloadingMoreComments = false
      if (data && data.comments && data.comments.comments && data.comments.comments.length) {
        console.log(data)
        this.commentCursor = data.comments.cursor
        this.commentList.push(...data.comments.comments)
      }
    }
  },
  watch: {
    comments: function (newValue, oldValue) {
      if (newValue) {
        let cmt = { comment: newValue.comment,
          user: newValue.user }
        this.commentList.unshift(cmt)
      }
    }
  }

}
</script>
