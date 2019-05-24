<template>
  <q-btn flat icon="comments" @click.stop="showCommentBox" :label="dataLikedCount">
    <CommentBox v-if="writeComment" :postId="postId"/>
  </q-btn>
</template>
<script>
import CommentBox from './popups/CommentBox'
export default {
  components: { CommentBox },
  props: ['isLiked', 'likeCount', 'postId', 'count'],
  data () {
    return {
      dataLikedCount: '(' + this.count + ')',
      isLikedHighlighted: this.isLiked,
      writeComment: false
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
    showCommentBox () {
      this.writeComment = true
    }

  }

}
</script>
