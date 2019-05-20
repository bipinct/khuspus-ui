<template>
  <q-page class="kp_maincontent">
    <ApolloQuery
      :query="require('../../graphql/query/groupsuggestions.gql')"
      :variables="{ cursor }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data" class="result apollo">
          <q-list highlight>
            <q-list-header>Suggestions</q-list-header>
            <div v-if="data.groups.length">
              <GroupItem
                v-for="groupdata in data.groups"
                :key="groupdata.name"
                :name="groupdata.name"
                :grouppic="groupdata.grouppic"
                :description="groupdata.description"
                :groupid="groupdata.id"
                :groupslug="groupdata.name"
                :isFollowing="false"
              />
            </div>
            <div v-else>
              <EmptyList message="No followers yet..."/>
            </div>
          </q-list>
        </div>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </q-page>
</template>

<script>

import EmptyList from '../../components/EmptyList'
import GroupItem from '../../components/GroupItem'
export default {
  components: {
    GroupItem,
    EmptyList
  },
  data () {
    return {
      name: '',
      select: 'public',
      cursor: null
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
