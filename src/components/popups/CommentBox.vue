<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" size="lg" dense icon="add" @click.native="createPost"/>
    </q-page-sticky>
    <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar color="white" slot="header">
          <q-btn flat v-close-overlay class="headerIcons">
            <q-icon name="close"/>
          </q-btn>
        </q-toolbar>
        <div>
          <ApolloMutation
            :mutation="require('../../graphql/comment.gql')"
            :variables="{comment : commentInput,postId:postIdtoString(postId)}"
            @done="commentDone"
          >
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
  </div>
</template>

<script>
// import ComposeTweet from '../twitter/ComposeTweet'
export default {
  components: {
    // ComposeTweet
  },
  props: ['postId'],
  data () {
    return {
      commentInput: '',
      opened: true,
      imageUrl: '',
      showImageDialog: false
    }
  },
  methods: {
    createPost () {
      this.opened = true
    },
    postIdtoString (postId) {
      return postId.toString()
    },
    commentDone (data) {
      this.commentInput = ''
      // this.commentCounted++
      // let cmt = { comment: data.data.createComment.comment.comment,
      //   user: data.data.createComment.user }
      // this.newCommentData = cmt
      // this.comments.comments.unshift(cmt)
      // if (this.commentsOnPost.length) { this.comments.comments.unshift(cmt) } else { this.comments.comments.push(cmt) }
    }
  }
}
</script>
