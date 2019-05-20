<template>
  <div>
    <FeedItem
      v-for="post in data.userfeed.posts"
      :username="post.user.username"
      :created="date(post.createdAt)"
      :content="post.content"
      :key="post.id"
      :postId="post.id"
      :profilePic="post.user.profilepic"
      :commentCount="post.comments.total"
      :comments="post.comments"
      :likeCount="post.likes.total"
      :images="post.images"
      :isLiked="post.likes.isLiked"
    ></FeedItem>
  </div>
</template>
<script>
import FeedItem from '../components/FeedItem'
export default {
  props: ['data'],
  components: {
    FeedItem
  },
  methods: {
    date (timestamp) {
      console.log(timestamp)
      let d = new Date(parseInt(timestamp))
      return d.toDateString() + ' ' + d.toLocaleTimeString()
    },
    loadMore () {

    },
    sendCursor (cursor) {
      console.log('---send cursor', cursor)
      this.$emit('gotCursor', cursor)
    }
  }
}
</script>
