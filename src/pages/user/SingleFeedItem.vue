<template>
  <q-page>
    <ApolloQuery
      :query="require('../../graphql/usersinglefeed.gql')"
      :variables="{ postId: postId() }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data" class="result apollo">
          <FeedItemDetailed
            v-for="post in data.usersinglefeed.posts"
            :username="post.user.username"
            :created="post.createdAt"
            :content="post.content"
            :key="post.id"
            :postId="post.id"
            :profilePic="post.user.profilepic"
            :commentCount="post.comments.total"
            :comments="post.comments"
            :likeCount="post.likes.total"
            :images="post.images"
            :isLiked="post.likes.isLiked"
          />
        </div>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </q-page>
</template>

<script>
import FeedItemDetailed from '../../components/FeedItemDetailed'
export default {
  name: 'SingleFeedItem',
  components: {
    FeedItemDetailed
  },
  data () {
    return {
      opened: false,
      cursor: null
    }
  },
  methods: {
    date (timestamp) {
      let d = new Date(parseInt(timestamp))
      return d.toDateString() + ' ' + d.toLocaleTimeString()
    },
    createPost () {
      this.opened = true
    },
    loadMoreContent (index, done) {
      let cursor = this.cursor
      if (cursor) {
        this.$refs.userfeed.$apollo.queries.query.fetchMore({
          variables: {
            cursor
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newContent = fetchMoreResult.userfeed.posts
            const newCursor = fetchMoreResult.userfeed.cursor
            done()
            return {
              userfeed: {
                __typename: previousResult.userfeed.__typename,
                posts: [...previousResult.userfeed.posts, ...newContent],
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
    postId () {
      return this.$route.params[0]
    }

  }

}
</script>
