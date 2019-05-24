<template>
  <div @click="$router.push('/post/'+postId)">
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
            :isinTodo="highlightTodo"
            :count="todoCount"
            :likeCount="likeCount"
            :postId="postId"
          />
          <AddRemoveDone
            :isLiked="isLiked"
            :isinDone="highlightDone"
            :likeCount="likeCount"
            :count="doneCount"
            :postId="postId"
          />
          <AddRemoveComment
            :count="commentCount"
            :isLiked="isLiked"
            :likeCount="likeCount"
            :postId="postId"
          />
          <ShareButton :isLiked="isLiked" :likeCount="likeCount" :postId="postId"/>
        </q-card-actions>
      </q-card>
    </q-item-tile>
  </div>
</template>

<script>
import ShareButton from './ShareButton'
import AddRemoveTodo from './AddRemoveTodo'
import AddRemoveDone from './AddRemoveDone'
import AddRemoveComment from './AddRemoveComment'
import Media from '@dongido/vue-viaudio'
export default {
  components: {
    Media,
    ShareButton,
    AddRemoveTodo,
    AddRemoveDone,
    AddRemoveComment
  },
  props: [
    'username', 'created', 'content', 'profilePic', 'commentCount',
    'todoCount',
    'doneCount',
    'listedin',
    'likeCount', 'images', 'postId', 'comments', 'isLiked', 'enableEdit', 'isinTodo', 'isinDone'
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
    },
    itemClicked () {
      alert('clicked')
    }

  },
  computed: {
    highlightTodo () {
      return this.listedin === 'todo'
    },
    highlightDone () {
      return this.listedin === 'done'
    }
  }

}
</script>
