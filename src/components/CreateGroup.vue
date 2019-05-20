<template>
  <div>
    <ApolloMutation
      :mutation="require('../graphql/creategroup.gql')"
      ref="create"
      :variables="{
        name,
        grouppic : imagePath,
        permission: select,
        description
      }"
      @done="onDone"
    >
      <template slot-scope="{ mutate, loading, error }">
        <form action="#">
          <q-input type="text" :value="name" placeholder="Enter Name for the Group" v-model="name"/>
          <q-input
            type="textarea"
            :value="description"
            placeholder="Enter Brief description"
            :max-height="3"
            rows="2"
            v-model="description"
          />

          <div class="pad2">
            <q-item multiline>
              <q-item-side>
                <q-select
                  float-label="Group Permission"
                  v-model="select"
                  :options="selectGroupPermission"
                  @input="setPermission()"
                />
              </q-item-side>
              <q-item-main>
                <q-uploader
                  float-label="Add Group Image"
                  name="myImage"
                  :url="url"
                  :multiple="false"
                  hide-upload-button
                  :auto-expand="true"
                  ref="uploader"
                  @uploaded="imageUploaded"
                />
              </q-item-main>
            </q-item>
            <q-btn color="blue" @click="submit()">Create Group</q-btn>
          </div>
        </form>

        <p v-if="error">An error occured: {{ error }}</p>
      </template>
    </ApolloMutation>
    <PopupMessage/>
  </div>
</template>

<script>
import PopupMessage from './PopupMessage'
export default {
  components: {
    PopupMessage
  },
  data () {
    return {
      name: '',
      imagePath: '',
      select: 'public',
      description: '',
      selectGroupPermission: [
        {
          label: 'Public',
          value: 'public'
        },
        {
          label: 'Members Only',
          value: 'private'
        }
      ],
      imageToUpload: 0,
      url: global.imageUploadUrl
    }
  },
  methods: {
    setPermission (perm) {
      if (this.select === 'group') {
        this.showGroup = true
      }
    },
    imageUploaded (file, xhr) {
      let response = JSON.parse(xhr.responseText)
      if (xhr.status === 200 && xhr.responseText && response.filename && response.url) {
        this.imagePath = response.url
        setTimeout(() => {
          this.submitForm()
        }, 10)
      }
    },
    onDone (done) {
      if (done && done.data && done.data.createGroup && done.data.createGroup.status) {
        this.showDialog('Success', done.data.createGroup.message)
        this.name = ''
        this.imagePath = ''
        this.select = 'public'
        this.description = ''
        this.$router.push(
          { name: 'AddGroupMembers',
            params: {
              groupId: done.data.createGroup.group.id,
              groupName: done.data.createGroup.group.name
            }
          }
        )
      }
    },
    showDialog (title, message) {
      this.$q.dialog({
        title: title,
        message: message
      })
    },
    submit () {
      this.imageToUpload = this.$refs.uploader.queueLength
      if (this.imageToUpload) { this.$refs.uploader.upload() } else { this.submitForm() }
    },
    submitForm () {
      this.$refs.create.mutate()
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
</style >
