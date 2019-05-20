<template>
  <div>
    <q-btn color="blue" @click.native="createPost" icon="update">Apollo Update Profile Picture</q-btn>
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
            :mutation="require('../../graphql/upload.gql')"
            :variables="{'file':file}"
            @done="onDone"
          >
            {{file}}
            <!-- {{image}} -->
            <template slot-scope="{ mutate, loading, error }">
              <div>
                <img :src="profilepicdata" style="width:100px;">
                <div>
                  <label>Change Profile pic</label>
                  <input type="file" name="file" ref="file" v-on:change="onFileChange">
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
                    <!-- <q-btn :disable="!enableUploadButton" color="blue" @click="uploadPic">Update pic</q-btn> -->
                    <!-- <q-btn color="blue" @click="uploadPic">Update pic</q-btn> -->
                    <q-btn color="blue" @click="mutate">Update pic</q-btn>
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
  name: 'ApolloPopupUpdateProfilePicture',
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
      enableUploadButton: false,
      file: '',
      image: ''
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
    },
    onFileChange (files) {
      console.log(files.target.validity, files.target.files)
      //   let image = new Image()
      //   console.log(image)
      this.file = files.target.files
    },
    // onFileChange (e) {
    //   var files = e.target.files || e.dataTransfer.files
    //   if (!files.length) { return }
    //   this.createImage(files[0])
    // },
    createImage (file) {
      //   var image = new Image()
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

}
</script>
<style>
.pad {
  padding-top: 10px;
}
</style>
