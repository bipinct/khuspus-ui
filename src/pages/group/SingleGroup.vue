<template>
  <q-page class="kp_maincontent">
    <ApolloQuery
      :query="require('../../graphql/query/group.gql')"
      :variables="{name ,id,postCursor,commentCount,commentCursor }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data" class="result apollo">
          <q-card>
            <q-card-media>
              <div class="banner">
                <q-item>
                  <q-item-side>
                    <div class="profilepic">
                      <img :src="groupPic(data.group.grouppic)">
                    </div>
                  </q-item-side>
                  <q-item-main
                    :label="data.group.name"
                    label-lines="1"
                    :sublabel="data.group.description"
                    sublabel-lines="2"
                  />
                  <q-item-side right v-if="$q.platform.is.desktop">
                    <q-btn color="orange" v-if="canedit">Edit</q-btn>
                    <FollowButtonGroup v-else :groupId="data.group.id" :isFollowing="false"/>
                  </q-item-side>
                </q-item>
                <!-- <div right v-if="$q.platform.is.mobile">
                <q-btn color="orange" v-if="canedit">Edit</q-btn>
                <FollowButtonGroup v-else :groupId="data.group.id" :isFollowing="false"/>
                </div>-->
              </div>
            </q-card-media>
          </q-card>
          <q-tabs color="blue">
            <q-tab default slot="title" label="posts" name="posts" icon="message"/>
            <q-tab
              slot="title"
              name="members"
              label="Members"
              :count="data.group.membercount"
              icon="people"
            />
            <q-tab
              slot="title"
              name="admin"
              label="admin"
              :count="data.group.admincount"
              icon="face"
            />
            <q-tab-pane name="posts">
              <div v-if="data.group.posts.posts.length">
                <FeedItem
                  v-for="post in data.group.posts.posts"
                  :key="post.id"
                  :username="post.user.username"
                  :created="post.createdAt"
                  :content="post.content"
                  :postId="post.id"
                  :profilePic="post.user.profilepic"
                  :comments="post.comments"
                  :commentCount="post.comments.total"
                  :likeCount="post.likes.total"
                  :images="post.images"
                ></FeedItem>
              </div>
              <div v-else>
                <EmptyList message="No post in group "/>
              </div>
            </q-tab-pane>
            <q-tab-pane name="members">
              <div v-if="data.group.members.members.length">
                <q-item v-for="member in data.group.members.members" :key="member.userId">
                  <q-item-side>
                    <FollowUserBlock
                      :username="member.user.username"
                      :profilepic="member.user.profilepic"
                    />
                  </q-item-side>
                  <q-item-main :label="member.user.username" :sublabel="member.user.about"/>
                  <q-item-side right>
                    <FollowButton :isFollowing="false" :followerId="member.userId"/>
                  </q-item-side>
                </q-item>
              </div>
              <div v-else>
                <EmptyList message="No members in the group"/>
              </div>
            </q-tab-pane>
            <q-tab-pane name="admin">
              <div v-if="data.group.admins.members.length">
                <q-item v-for="member in data.group.admins.members" :key="member.userId">
                  <q-item-side>
                    <FollowUserBlock
                      :username="member.user.username"
                      :profilepic="member.user.profilepic"
                    />
                  </q-item-side>
                  <q-item-main :label="member.user.username" :sublabel="member.user.about"/>
                  <q-item-side right>
                    <FollowButton :isFollowing="false" :followerId="member.userId"/>
                  </q-item-side>
                </q-item>
              </div>
              <div v-else>
                <EmptyList message="No Admin found"/>
              </div>
            </q-tab-pane>
            <q-tab-pane name="following">
              <div v-if="data">
                <q-list></q-list>
              </div>
              <div v-else>
                <EmptyList message="User not following"/>
              </div>
            </q-tab-pane>
          </q-tabs>
        </div>
      </template>
    </ApolloQuery>
  </q-page>
</template>

<script>
import EmptyList from '../../components/EmptyList'
import FeedItem from '../../components/FeedItem'
import FollowButton from '../../components/FollowButton'
import FollowUserBlock from '../../components/FollowUserBlock'
import FollowButtonGroup from '../../components/FollowButtonGroup'
export default {
  components: {
    EmptyList,
    FeedItem,
    FollowButton,
    FollowUserBlock,
    FollowButtonGroup
  },
  data () {
    return {
      name: this.$route.params[0] || 'admin',
      id: '',
      postCursor: '',
      commentCount: 0,
      commentCursor: ''
    }
  },
  methods: {
    groupPic (pic) {
      return pic || this.$store.state.user.defaults.groupProfilePic
    }
  },
  computed: {
    canedit () {
      return true
    }
  }
}
</script>

<style>
.banner {
  background-color: blue;
  padding-top: 80px;
  height: 300px;
  /* display: flex;
  align-content: flex-end; */
}
</style>
