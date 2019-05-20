<template>
  <ApolloQuery ref="userposts" :query="require('../../graphql/userposts.gql')" :variables="{}">
    <template slot-scope="{ result: { loading, error, data } }">
      <div v-if="loading" class="loading apollo">
        <q-spinner color="primary" size="6em"/>
      </div>
      <div v-else-if="error" class="error apollo">An error occured</div>
      <div v-else-if="data" class="result apollo">
        <div v-for="post in data.userposts.posts" :key="post.id">
          {{setCursor(data.userposts.cursor)}}
          <q-infinite-scroll :handler="loadMoreContent" ref="infiniteScroll">
            <FeedItem
              :username="post.user.username"
              :created="post.createdAt"
              :content="post.content"
              :postId="post.id"
              :profilePic="post.user.profilepic"
              :commentCount="post.comments.total"
              :comments="post.comments"
              :likeCount="post.likes.total"
              :images="post.images"
              :isLiked="post.likes.isLiked"
              :enableEdit="true"
            />

            <template v-if="data.userposts.cursor" v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px"/>
              </div>
            </template>
          </q-infinite-scroll>
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import FeedItem from '../FeedItem'
export default {
  components: {
    FeedItem
  },
  props:
    ['username', 'created', 'content', 'profilePic', 'commentCount', 'likeCount', 'images', 'postId', 'comments', 'isLiked'],
  data () {
    return {
      opened: false,
      cursor: null
    }
  },
  methods: {
    loadMoreContent (index, done) {
      let cursor = this.cursor
      if (cursor) {
        this.$refs.userposts.$apollo.queries.query.fetchMore({
          variables: {
            cursor
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newContent = fetchMoreResult.userposts.posts
            const newCursor = fetchMoreResult.userposts.cursor
            done()
            return {
              userposts: {
                __typename: previousResult.userposts.__typename,
                posts: [...previousResult.userposts.posts, ...newContent],
                cursor: newCursor
              }
            }
          }
        }

        )
      }
    },
    setCursor (cursor) {
      this.cursor = cursor
    },
    editPost (postId) {
      this.$router.push({ name: 'editpost', params: { postId: postId } })
    }

  }

}
</script>
<style>
</style>
