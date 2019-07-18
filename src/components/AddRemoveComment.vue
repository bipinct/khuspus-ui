<template>
  <q-btn
    flat
    icon="comments"
    ref="showcommentbox"
    @click.stop="showCommentBox"
    :label="commentCount"
  >
    <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar color="white" slot="header">
          <q-btn flat v-close-overlay class="headerIcons">
            <q-icon name="close"/>
          </q-btn>
        </q-toolbar>
        <div>
          <ApolloMutation
            :mutation="require('../graphql/comment.gql')"
            :variables="{comment : commentInput,postId:postIdtoString(postId)}"
            @done="commentDone"
          >
            <ApolloSubscribeToMore
              :document="require('../graphql/subscription/commentAdded.gql')"
              :variables="{ comment: commentInput }"
              :updateQuery="onMessageAdded"
            />
            <template slot-scope="{ mutate, loading, error }">
              <q-item>
                <q-item-main>
                  <q-input
                    type="textarea"
                    rows="3"
                    name="commentbox"
                    v-model="commentInput"
                    placeholder="send your reply"
                    @keydown.enter="mutate()"
                  ></q-input>
                  <br>
                  <q-btn
                    icon="send"
                    label="Comment"
                    color="primary"
                    @click.native="mutate()"
                    :disabled="!commentInput"
                  ></q-btn>
                </q-item-main>
              </q-item>

              <p v-if="error">An error occured: {{ error }}</p>
            </template>
          </ApolloMutation>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-btn>
</template>
<script>
export default {
  props: ['isLiked', 'likeCount', 'postId', 'count'],
  data () {
    return {
      commentCount: '(' + this.count + ')',
      isLikedHighlighted: this.isLiked,
      writeComment: false,
      commentInput: '',
      opened: false
    }
  },
  methods: {
    postIdtoString (postId) {
      return postId.toString()
    },
    showCommentBox () {
      this.opened = true
    },
    commentDone (data) {
      this.commentInput = ''
      this.$q.notify({ type: 'positive', message: 'comment successfully', position: 'top' })
      this.opened = false
      this.commentCount = '(' + parseInt(this.count + 1) + ')'
    },
    onMessageAdded (previousResult, { subscriptionData }) {
      console.log('====comment added=====')
      console.log('====comment added=====')
      console.log('---------------message------', previousResult, subscriptionData)
      console.log('====comment added=====')
      console.log('====comment added=====')
    }

  }

}
</script>
