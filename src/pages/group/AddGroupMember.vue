<template>
  <q-page padding>
    <h1>
      Add Group Members
      <router-link :to="groupLink">
        <a>{{ groupName}}</a>
      </router-link>
    </h1>

    <form action="#">
      <q-input
        type="text"
        :value="name"
        placeholder="Search User"
        hide-underline
        class="writePost"
      />

      <ApolloQuery :query="require('../../graphql/follower.gql')" :variables="{ name }">
        <template slot-scope="{ result: { loading, error, data } }">
          <div v-if="loading" class="loading apollo">
            <q-spinner color="primary" size="6em"/>
          </div>
          <div v-else-if="error" class="error apollo">An error occured</div>
          <div v-else-if="data" class="result apollo">
            <div v-if="data.followers.length">
              <q-list highlight>
                <q-list-header>Add Member to Group</q-list-header>
                <q-item v-for="member in data.followers" :key="member.user.id">
                  <q-item-side>
                    <q-item-tile avatar>
                      <img :src="member.user.profilepic">
                    </q-item-tile>
                  </q-item-side>
                  <q-item-main :label="member.user.username" :sublabel="member.user.about"/>
                  <q-item-side right>
                    <AddRemoveGroupMemberButton
                      :userId="member.user.id"
                      :groupId="groupId"
                      :permission="permission"
                      :isMember="member.isMember"
                    />
                  </q-item-side>
                </q-item>
              </q-list>
            </div>
            <div v-else>
              <EmptyList message="no followers to add this group"/>
            </div>
          </div>
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
    </form>
  </q-page>
</template>

<script>
import EmptyList from '../../components/EmptyList'
import AddRemoveGroupMemberButton from '../../components/single/AddRemoveGroupMemberButton'

export default {
  components: {
    EmptyList,
    AddRemoveGroupMemberButton
  },
  props: ['groupId', 'groupName', 'groupSlug'],
  data () {
    return {
      name: '',
      select: 'public',
      permission: 'member',
      groupLink: '/user/group/' + this.groupName
    }
  },
  methods: {
    setPermission (perm) {
      if (this.select === 'group') {
        this.showGroup = true
      }
    }
  }
}
</script>

<style>
.writePost {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 6px;
}
.pad2 {
  padding-top: 20px;
}
</style>
