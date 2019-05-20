<template>
  <div>
    <q-btn color="blue" @click.native="createPost" icon="update">Update Profile Picture</q-btn>
    <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title center class="headerIcons">Update Profile Picture</q-toolbar-title>
          <q-btn flat v-close-overlay class="headerIcons">
            <q-icon name="close"/>
          </q-btn>
        </q-toolbar>
        <div class="layout-padding">
          <ApolloMutation
            ref="uploadpicdb"
            :mutation="require('../../graphql/mutation/updateprofile.gql')"
            :variables="{'profilepic': profilepicdata}"
            @done="onDone"
          >
            <template slot-scope="{ mutate, loading, error }">
              <div>
                <img :src="profilepicdata" style="width:100px;">
                <div>
                  <label>Change Profile pic</label>
                  <q-uploader
                    ref="quploader"
                    :url="url"
                    :multiple="false"
                    :auto-expand="true"
                    name="myImage"
                    @uploaded="imageUploaded"
                    @add="imageAdded"
                    @remove="imageRemoved"
                    hide-upload-button
                  />
                  <div class="pad">
                    <q-btn :disable="!enableUploadButton" color="blue" @click="uploadPic">Update pic</q-btn>
                  </div>
                </div>
              </div>
              <p v-if="error">An error occured: {{ error }}</p>
            </template>
          </ApolloMutation>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script>
export default {
  props: ['profilepic'],
  data () {
    return {
      profilePic: this.$store.state.user.userdetails.profilepic,
      opened: false,
      showImageDialog: false,
      profilepicdata: this.profilepic,
      targetId: '',
      action: '',
      url: global.imageUploadUrl,
      enableUploadButton: false
    }
  },
  methods: {
    onDone (data) {
      this.$store.commit('user/updateProfilepic', { profilepic: data.data.updateUser.user.profilepic })
      this.$q.notify({ type: 'positive', message: 'profile picture updated successfully', position: 'top' })
    },
    createPost () {
      this.opened = true
    },
    imageUploaded (file, xhr) {
      let response = JSON.parse(xhr.responseText)
      if (xhr.status === 200 && xhr.responseText && response.filename && response.url) {
        this.profilepicdata = response.url
        if (this.profilepic !== this.profilepicdata) {
          setTimeout(() => {
            this.$refs.uploadpicdb.mutate()
          }, 10)
        }
      }
    },
    imageAdded () {
      this.enableUploadButton = true
    },
    imageRemoved () {
      this.enableUploadButton = false
    },
    uploadPic () {
      this.$refs.quploader.upload()
    }
  }

}
</script>
<style>
.pad {
  padding-top: 10px;
}
</style>
