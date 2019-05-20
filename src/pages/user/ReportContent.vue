<template>
  <q-page class="kp_maincontent">
    <ApolloQuery
      :query="require('../../graphql/_custom/reportContentOptionList.gql')"
      :variables="{ name }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>
        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <ReportContent :postId="postId" :optionList="data.reportContentOption"/>
          <div v-if="data"></div>
          <div v-else>no post by you</div>
        </div>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </q-page>
</template>

<script>

import ReportContent from '../../components/ReportContent'
export default {
  name: 'PostList',
  props: ['postId'],
  components: {
    ReportContent
  },
  data () {
    return {
      group: ['opt1']
    }
  },

  methods: {

  }

}
</script>

<style>
</style>
