<template>
  <div class="layout-padding">
    <ApolloMutation
      :mutation="require('../../graphql/createpost.gql')"
      :variables="{
        content,
        images
      }"
      @done="onDone"
      ref="createpost"
    >
      <template slot-scope="{ mutate, loading, error }">
        <q-item multiline>
          <q-item-side :avatar="profilepic"></q-item-side>
          <q-item-main>
            <q-input
              type="textarea"
              v-model="content"
              placeholder="write post content..."
              maxlength="99"
              :max-height="100"
              rows="3"
              hide-underline
              class="writePost"
            />

            <div class="pad2">
              <q-item multiline>
                <q-item-main>
                  <q-uploader
                    color="blue"
                    float-label="Upload Image"
                    ref="uploader"
                    :multiple="true"
                    :url="url"
                    name="myImage"
                    @uploaded="imageUploaded"
                    hide-upload-button
                    :auto-expand="true"
                  />
                </q-item-main>
              </q-item>
            </div>
            <div>
              <q-btn rounded color="blue" @click="submitPost()" @click.native="createPost">Submit</q-btn>
            </div>
            <p v-if="error">An error occured: {{ error }}</p>
          </q-item-main>
        </q-item>
        <!-- <EditorJS/> -->
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
// import EditorJS from '@editorjs/editorjs'

export default {
  // components: { EditorJS },
  data () {
    return {
      images: [],
      content: '',
      select: 'public',
      profilepic: this.$store.state.user.userdetails.profilepic,
      showGroup: false,
      selectGroup: this.$store.state.user.userdetails.groups.length ? this.$store.state.user.userdetails.groups[0].value : null,
      selectOptions: this.$store.state.user.permissions,
      groups: this.$store.state.user.userdetails.groups,
      url: global.imageUploadUrl,
      imageToUpload: 0
    }
  },
  methods: {
    imageUploader () {
      alert('uploader')
    },
    imageUploaded (file, xhr) {
      console.log('image uplaoded', xhr)
      let response = JSON.parse(xhr.responseText)
      if (xhr.status === 200 && xhr.responseText && response.filename && response.url) {
        if (!this.images.includes(response.url)) {
          this.images.push(response.url)
          this.imageToUpload--
          console.log(this.imageToUpload)
          if (!this.imageToUpload) {
            this.$refs.createpost.mutate()
            this.reset()
          }
        }
      }
    },
    onDone () {
      this.$q.notify({
        message: `You publised successfully`,
        timeout: 3000,
        type: 'positive',
        color: 'positive',
        textColor: 'black',
        icon: 'like',
        position: 'top-right',
        closeBtn: true,
        actions: [
          {
            label: 'Snooze',
            icon: 'timer', // optional
            noDismiss: true, // optional, v0.15.11+
            handler: () => {
              console.log('acting')
            }
          },
          {
            label: 'Dismiss',
            handler: () => {
              console.log('dismissed')
            }
          }
        ]
      })
    },
    setPermission () {
      this.showGroup = true
    },
    submitPost () {
      this.imageToUpload = this.$refs.uploader.queueLength
      if (this.imageToUpload) { this.$refs.uploader.upload() } else { this.$refs.createpost.mutate(); this.reset() }
    },
    reset () {
      this.content = ''
      this.$refs.uploader.reset()
      this.select = 'public'
      this.showGroup = false
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
