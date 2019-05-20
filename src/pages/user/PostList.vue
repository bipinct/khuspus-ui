<template>
  <q-page class="kp_maincontent">
    <ApolloQuery :query="require('../../graphql/userposts.gql')" :variables="{ name }">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>
        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div v-if="data.userposts.posts.length">
            <UserPosts
              v-for="post in data.userposts.posts"
              :images="post.images"
              :postId="post.id"
              :username="post.user.username"
              :created="date(post.createdAt)"
              :content="post.content"
              :key="post.id"
              :profilePic="post.user.profilepic"
              :commentCount="post.comments.total"
              :likeCount="post.likes.total"
            />
          </div>
          <div v-else>no post by you</div>
        </div>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </q-page>
</template>

<script>
import UserPosts from '../../components/UserPosts'
export default {
  name: 'PostList',
  components: {
    UserPosts
  },
  data () {
    return {
      comment: '',
      name: '',
      posts: [],
      loading: true,
      imageUrl: '',
      showImageDialog: false
    }
  },

  methods: {
    showImage (image) {
      this.showImageDialog = true
      this.imageUrl = image
    },
    addPost () {
      alert('add new post')
    },
    date (timestamp) {
      let d = new Date(parseInt(timestamp))
      return d.toDateString() + ' ' + d.toLocaleTimeString()
    }

  }

}
</script>

<style>
</style>
