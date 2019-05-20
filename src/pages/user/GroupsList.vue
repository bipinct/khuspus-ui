<template>
  <q-page padding>
    <ApolloQuery ref="loadUserGroups" :query="require('../../graphql/usergroup.gql')">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>
        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div v-if="data.userGroups.length">
            <q-list>
              <GroupItem
                v-for="groupdata in data.userGroups"
                :key="groupdata.name"
                :name="groupdata.name"
                :grouppic="groupdata.grouppic"
                :description="groupdata.description"
                :groupid="groupdata.id"
                :groupslug="groupdata.name"
                :owner="groupdata.owner"
                :isFollowing="true"
              />
            </q-list>
          </div>
          <div v-else>no group</div>
        </div>
      </template>
    </ApolloQuery>

    <q-btn
      round
      color="blue"
      @click.native="createGroupModal"
      class="fixed"
      icon="add"
      style="right: 18px; bottom: 18px"
    />

    <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" color="white">
          <q-toolbar-title center class="headerIcons">Create new Group</q-toolbar-title>
          <q-btn flat v-close-overlay class="headerIcons">
            <q-icon name="close"/>
          </q-btn>
        </q-toolbar>
        <div class="layout-padding">
          <CreateGroup/>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import CreateGroup from '../../components/CreateGroup'
import GroupItem from '../../components/GroupItem'
export default {
  components: {
    // SingleGroup
    CreateGroup,
    GroupItem
  },
  data () {
    return {
      opened: false
    }
  },
  methods: {
    createGroupModal () {
      this.opened = true
    }
  }
}
</script>

<style>
.groupList {
  display: flex;
  flex-wrap: wrap;
}
</style>
