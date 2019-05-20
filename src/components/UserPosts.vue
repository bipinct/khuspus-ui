<template>
  <div>
    <q-card>
      <q-card-title>
        <q-item clikable>
          <q-item-main>Posted on {{ created}}</q-item-main>
          <q-item-side>
            <q-item-side>
              <q-btn @click="editPost(postId)">Edit</q-btn>
              <q-btn>Delete</q-btn>
            </q-item-side>
          </q-item-side>
        </q-item>
      </q-card-title>
      <q-card-main>
        <div
          clickable
          v-on:click="showFeedDetail()"
          style="padding:20px;background-color:#EEEFFF;"
        >{{content}}</div>
        <div>
          <q-carousel
            v-if="gallery"
            color="white"
            arrows
            quick-nav
            height="300px"
            width="200px"
            :thumbnails="gallery"
          >
            <q-carousel-slide v-for="image in gallery" :img-src="image" :key="image"/>
          </q-carousel>
        </div>
        <div>
          <q-item>
            <q-item-side>
              <LikeItem :isLiked="isLiked" :likeCount="likeCount" :postId="postId"/>
            </q-item-side>
            <q-item-main>comments</q-item-main>
            <q-item-side right>
              <div>
                <q-item-tile icon="chat_bubble" color="blue-3"/>
                <span>({{commentCounted}})</span>
              </div>
            </q-item-side>
          </q-item>

          <ApolloMutation
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
          </ApolloMutation>

          <q-list no-border>
            <q-item v-for="(comment, index) in comments" :key="index">
              <q-item-side>
                <q-item-tile avatar>
                  <img :src="comment.user.profilepic">
                </q-item-tile>
              </q-item-side>
              <q-item-main :label="comment.user.username">{{comment.comment}}</q-item-main>
              <q-item-side right>
                <q-icon name="delete" v-if="comment.user.id == 1"/>
                <q-icon name="edit" v-if="comment.user.id == 1"/>
              </q-item-side>
            </q-item>
          </q-list>
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import LikeItem from './LikeItem'
export default {
  components: {

    LikeItem
  },
  props: [
    'username', 'created', 'content', 'profilePic', 'commentCount', 'likeCount', 'images', 'postId', 'comments', 'isLiked'
  ],

  data () {
    return {
      commentInput: '',
      commentCounted: this.commentCount,
      previewPost: false,
      gallery: this.processImages(this.images)
    }
  },
  methods: {
    showFeedDetail () {
      this.previewPost = true
      this.showDialog = true
      this.feedImage = ''
      this.feedContent = ''
    },
    processImages (images) {
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
      this.comments.unshift(cmt)
    },
    postIdtoString (postId) {
      return postId.toString()
    },
    allowComment () {
      return !!this.commentInput
    },
    editPost (postId) {
      this.$router.push({ name: 'editpost', params: { postId: postId } })
    }

  }

}
</script>
<style>
</style>
