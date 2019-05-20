<template>
  <q-page padding>
    <h1>Edit Post</h1>
    <ApolloQuery :query="require('../../graphql/editpost.gql')" :variables="{ postId: postId() }">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">
          <q-spinner color="primary" size="6em"/>
        </div>
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data" class="result apollo">
          <ApolloMutation
            :mutation="require('../../graphql/updatepost.gql')"
            :variables="{id: (data.post.id).toString(),content : data.post.content,images,permission: select}"
            @done="onDone"
          >
            <template slot-scope="{ mutate, loading, error }">
              <form action="#" enctype="multipart/form-data">
                <q-input
                  type="textarea"
                  v-model="data.post.content"
                  placeholder="write post content..."
                  :max-height="100"
                  rows="7"
                  hide-underline
                  class="writePost"
                />
                <q-uploader
                  :multiple="true"
                  :url="url"
                  name="myImage"
                  @add="fileAdded"
                  @uploaded="imageUploaded"
                  :auto-expand="true"
                />
                <q-select
                  v-model="select"
                  :options="selectOptions"
                  @input="setPermission(data.post.permission)"
                />
                <q-select v-if="showGroup" v-model="selectGroup" :options="groups"/>
                <div class="pad2">
                  <q-btn color="primary" @click="mutate()">Update Post</q-btn>
                  <q-btn color="red" @click="mutate()">Delete</q-btn>
                  <q-btn color="secondary" @click="$router.push('/user/posts')">Cancel</q-btn>
                </div>
              </form>
              <p v-if="error">An error occured: {{ error }}</p>
            </template>
          </ApolloMutation>
        </div>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      images: [],
      content: '',
      select: 'public',
      showGroup: false,
      selectGroup: '1',
      selectOptions: [
        {
          label: 'Public',
          value: 'public'
        },
        {
          label: 'Private',
          value: 'private'
        },
        {
          label: 'Post in a group',
          value: 'group'
        }
      ],
      // TODO: fetch groups for user
      groups: [{
        value: '1',
        label: 'ABC delhi'
      },
      {
        value: '2',
        label: 'Best Friends Forever'
      },
      {
        value: '3',
        label: 'South-Delhi Group'
      }

      ],
      url: 'http://localhost:3000/upload'
    }
  },
  methods: {
    imageUploader () {
      alert('uploader')
    },
    imageUploaded (file, xhr) {
      let response = JSON.parse(xhr.responseText)
      if (xhr.status === 200 && xhr.responseText && response.filename && response.url) {
        if (!this.images.includes(response.url)) { this.images.push(response.url) }
      }
      console.log('******************')
      console.log(this.images.length, this.images)
    },
    fileAdded () {
      console.log('file added')
    },
    onDone () {
      this.$q.notify({ type: 'positive', message: 'Your content published successfully', position: 'top' })
    },
    postId () {
      return (this.$route.params.postId).toString()
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
