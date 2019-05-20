<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="maincard">
          <ApolloQuery
            ref="userfeed"
            :query="require('../../graphql/userfeed.gql')"
            :variables="{ commentCount:5 }"
          >
            <template slot-scope="{ result: { loading, error, data } }">
              <div v-if="loading" class="loading apollo">
                <q-spinner color="primary" size="6em"/>
              </div>
              <div v-else-if="error" class="error apollo">An error occured</div>
              <div v-else-if="data" class="result apollo">
                <div v-if="data.userfeed.posts.length">
                  {{setCursor(data.userfeed.cursor)}}
                  <q-infinite-scroll :handler="loadMoreContent" ref="infiniteScroll">
                    <q-list highlight separator>
                      <FeedItem
                        v-for="post in data.userfeed.posts"
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
                        @click.native="$router.push('/feed/'+post.id)"
                      />
                    </q-list>
                    <template v-if="data.userfeed.cursor" v-slot:loading>
                      <div class="row justify-center q-my-md">
                        <q-spinner-dots color="primary" size="40px"/>
                      </div>
                    </template>
                  </q-infinite-scroll>
                </div>
                <div v-else>
                  <EmptyList message="You feed is empty. Start following to get feeds"/>
                </div>
              </div>
              <div v-else class="no-result apollo text-center">
                <q-spinner color="primary" size="2em"/>
              </div>
            </template>
          </ApolloQuery>
        </div>
      </q-page>
      <PopupCreatePostFloating v-if="$q.platform.is.mobile"/>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import FeedItem from '../../components/FeedItem'
import EmptyList from '../../components/EmptyList'
import PopupCreatePostFloating from '../../components/popups/PopupCreatePostFloating'
export default {
  name: 'FeedList',
  components: {
    FeedItem,
    EmptyList,
    PopupCreatePostFloating
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
    }

  }

}
</script>
