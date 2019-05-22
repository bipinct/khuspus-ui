<template>
  <div>
    <q-item multiline>
      <q-item-side>
        <q-item-tile avatar>
          <img :src="profilePic">
        </q-item-tile>
      </q-item-side>
      <q-item-main>
        <q-item-tile>
          <strong style=" text-transform:capitalize;">{{username}}</strong>
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item-tile class="q-p-2">
      <q-card flat>
        <q-card-media>
          <img v-if="gallery" :src="gallery">
          <!-- {{gallery[0]}} -->
          <Media v-if="false" :kind="'video'" :controls="true" :src="gallery"/>
        </q-card-media>
        <q-card-title>{{content}}</q-card-title>

        <q-card-actions
          style="justify-content:space-between;margin-top:0px!important;border-top:1px solid #eee;border-bottom:1px solid #eee;"
        >
          <AddRemoveTodo
            :isLiked="isLiked"
            :isinTodo="false"
            :likeCount="likeCount"
            :postId="postId"
          />
          <AddRemoveDone
            :isLiked="isLiked"
            :isinDone="false"
            :likeCount="likeCount"
            :postId="postId"
          />
          <AddRemoveComment :isLiked="isLiked" :likeCount="likeCount" :postId="postId"/>
          <ShareButton :isLiked="isLiked" :likeCount="likeCount" :postId="postId"/>
        </q-card-actions>
      </q-card>
    </q-item-tile>
    <!-- <q-item v-if="false">
      <q-item-side>--</q-item-side>
      <q-item-main>comments</q-item-main>
      <q-item-side right>
        <div>
          <LikeItem :isLiked="isLiked" :likeCount="likeCount" :postId="postId"/>

          <q-item-tile icon="chat_bubble" color="blue-3"/>
          <span>({{commentCounted}})</span>
        </div>
      </q-item-side>
    </q-item>-->

    <!-- <ApolloMutation
          :mutation="require('../graphql/comment.gql')"
          :variables="{comment : commentInput,postId:postIdtoString(postId)}"
          @done="commentDone"
        >
          <template slot-scope="{ mutate, loading, error }">
            <q-item>
              <q-item-main>
                <q-input
                  type="text"
                  name="commentbox"
                  v-model="commentInput"
                  @keydown.enter="mutate()"
                ></q-input>
              </q-item-main>
              <q-item-side right>
                <q-btn
                  icon="send"
                  color="secondary"
                  @click.native="mutate()"
                  :disabled="!commentInput"
                ></q-btn>
              </q-item-side>
            </q-item>

            <p v-if="error">An error occured: {{ error }}</p>
          </template>
    </ApolloMutation>-->
    <!-- <CommentBox
          :v-if="false"
          :comments="comments"
          :newCommentData="newCommentData"
          :postId="postId"
    />-->
    <!-- <q-item-side right>
      <q-btn flat round dense icon="more_vert">
        <q-popover>
          <q-list link>
            <q-item v-close-overlay v-if="enableEdit">
              <q-item-main label="Edit" @click.native="editPost(postId)"></q-item-main>
            </q-item>

            <q-item v-close-overlay v-if="enableEdit">
              <q-item-main label="Delete" @click.native="confirmDelete(postId)"></q-item-main>
            </q-item>
            <q-item v-close-overlay>
              <q-item-main
                label="Report"
                @click.native="$router.push({'name':'ReportContent','params':{'postId': postId}})"
              />
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>
    </q-item-side>-->
  </div>
</template>

<script>
// import LikeItem from './LikeItem'
import ShareButton from './ShareButton'
import AddRemoveTodo from './AddRemoveTodo'
import AddRemoveDone from './AddRemoveDone'
import AddRemoveComment from './AddRemoveComment'
import Media from '@dongido/vue-viaudio'

// import CommentBox from './CommentBox'
export default {
  components: {
    // LikeItem,
    Media,
    ShareButton,
    AddRemoveTodo,
    AddRemoveDone,
    AddRemoveComment
    // CommentBox
  },
  props: [
    'username', 'created', 'content', 'profilePic', 'commentCount', 'likeCount', 'images', 'postId', 'comments', 'isLiked', 'enableEdit', 'isinTodo', 'isinDone'
  ],

  data () {
    return {
      commentInput: '',
      commentCounted: this.commentCount,
      commentsOnPost: this.comments && this.comments.comments ? this.comments.comments : [],
      commentCursor: this.comments ? this.comments.cursor : null,
      previewPost: false,
      gallery: this.images,
      isloadingMoreComments: false,
      newCommentData: null
    }
  },
  methods: {
    showFeedDetail () {
      this.previewPost = true
      this.showDialog = true
      this.feedImage = ''
      this.feedContent = ''
      // console.log(this)
    },
    processImages (images) {
      console.log(images)
      return images ? images.split(',') : null
    },
    sendLike () {
      alert('like')
    },
    onDone (data) {
    },

    commentDone (data) {
      this.commentInput = ''
      this.commentCounted++
      let cmt = { comment: data.data.createComment.comment.comment,
        user: data.data.createComment.user }
      this.newCommentData = cmt
      this.comments.comments.unshift(cmt)
      // if (this.commentsOnPost.length) { this.comments.comments.unshift(cmt) } else { this.comments.comments.push(cmt) }
    },
    postIdtoString (postId) {
      return postId.toString()
    },
    allowComment () {
      return !!this.commentInput
    },
    loadMoreComments (cursor) {
      this.isloadingMoreComments = true
    },
    showMoreComments (data) {
      this.isloadingMoreComments = false
      if (data && data.comments && data.comments.comments && data.comments.comments.length) {
        this.commentCursor = data.comments.cursor
        this.commentsOnPost.push(...data.comments.comments)
      }
    },
    editPost (postId) {
      this.$router.push({ name: 'editpost', params: { postId: postId } })
    },
    date (timestamp) {
      let d = new Date(parseInt(timestamp))
      return d.toDateString() + ' ' + d.toLocaleTimeString()
    },
    reportContent (postId) {
      alert('reporting a content')
    }

  }

}
</script>
