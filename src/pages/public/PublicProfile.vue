<template>
  <q-page padding class="kp_maincontent">
    <ApolloQuery :query="require('../../graphql/user.gql')" :variables="{username: name }">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data" class="result apollo">
          <q-item>
            <q-item-side>
              <div class="profilepic">
                <img :src="data.user.profilepic">
              </div>
              <div
                class="profilename"
              >{{data.user.firstname}} {{data.user.middlename}} {{data.user.lastname}}</div>
              <div class="profileBrief">{{data.user.about}}</div>
              <q-chip v-if="data.user.followsYou" color="positive">follows you</q-chip>
            </q-item-side>
            <q-item-side right>
              <q-btn
                rounded
                size="sm"
                color="black"
                v-if="data.user.isMe"
                @click.native="$router.push('/profile/edit')"
              >Edit Profile</q-btn>
              <FollowButton v-else :isFollowing="data.user.isFollowing" :followerId="data.user.id"/>
            </q-item-side>
          </q-item>

          <q-tabs color="secondary" text="black">
            <q-tab default text="black" color="black" slot="title" label="Todo's" name="todo"/>
            <q-tab text="black" color="black" slot="title" label="Done" name="done"/>
            <q-tab slot="title" name="followers" label="Followers" color="black"/>
            <q-tab slot="title" name="following" label="Following" color="black"/>

            <q-tab-pane name="todo">
              <div v-if="data.user.posts.length">
                <FeedItem
                  v-for="post in data.user.posts"
                  :username="data.user.username"
                  :created="post.createdAt"
                  :content="post.content"
                  :key="post.id"
                  :postId="post.id"
                  :profilePic="data.user.profilepic"
                  :commentCount="post.comments.total"
                  :comments="post.comments"
                  :likeCount="post.likes.total"
                  :images="post.images"
                ></FeedItem>
              </div>
              <div v-else>
                <EmptyList message="No post from user "/>
              </div>
            </q-tab-pane>
            <q-tab-pane name="done">
              <div v-if="data.user.groups.length">
                <GroupItem
                  v-for="groupdata in data.user.groups"
                  :key="groupdata.name"
                  :name="groupdata.name"
                  :grouppic="groupdata.grouppic"
                  :description="groupdata.description"
                />
              </div>
              <div v-else>
                <EmptyList message="User  not following any  group"/>
              </div>
            </q-tab-pane>
            <q-tab-pane name="followers">
              <div v-if="data.user.followers.length">
                <q-list>
                  <FollowerItem
                    v-for="member in data.user.followers"
                    :key="member.followerId"
                    :userid="member.followerId"
                    :username="member.user.username"
                    :profilepic="member.user.profilepic"
                    description="brief about the user"
                    :isFollowing="false"
                  />
                </q-list>
              </div>
              <div v-else>
                <EmptyList message="No followers"/>
              </div>
            </q-tab-pane>
            <q-tab-pane name="following">
              <div v-if="data.user.following.length">
                <q-list>
                  <FollowingItem
                    v-for="member in data.user.following"
                    :key="member.userId"
                    :username="member.user.username"
                    :userId="member.userId"
                    :profilepic="member.user.profilepic"
                    description="brief about the user"
                    :isFollowing="false"
                  />
                </q-list>
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

import FeedItem from '../../components/FeedItem'
import GroupItem from '../../components/GroupItem'
import FollowerItem from '../../components/FollowerItem'
import FollowingItem from '../../components/FollowingItem'
import FollowButton from '../../components/FollowButton'
import EmptyList from '../../components/EmptyList'
// import UserPosts from '../../components/user/UserPosts'
export default {
  components: {
    FeedItem,
    // UserPosts,
    GroupItem,
    FollowerItem,
    FollowingItem,
    FollowButton,
    EmptyList
  },
  data () {
    return {
      name: this.$route.params[0] || 'admin',
      userId: this.$store.state.user.userdetails.id,
      profilename: '',
      profilepic: '',
      location: '',
      website: '',
      isFollowing: '',
      followsU: 'true',
      groups: [],
      followers: [],
      following: []

    }
  }

}
</script>

<style>
.kp_maincontent {
  background-color: #fff;
}
.groupList {
  display: flex;
  flex-wrap: wrap;
}

.profilename {
  font-size: 20px;
  font-weight: bold;
}
.profileBrief {
}
.profiledescription {
  margin-top: 20px;
}
.followsU {
  background-color: #ccc;
  padding: 5px;
  margin-top: 20px;
}
</style>
