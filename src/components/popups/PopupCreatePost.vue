<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" size="lg" dense icon="add" @click.native="createPost"/>
    </q-page-sticky>
    <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar color="white" slot="header">
          <q-toolbar-title center class="headerIcons">Add New ToDo</q-toolbar-title>
          <q-btn flat v-close-overlay class="headerIcons">
            <q-icon name="close"/>
          </q-btn>
        </q-toolbar>
        <div>
          <ComposeTweet/>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script>
import ComposeTweet from '../twitter/ComposeTweet'
export default {
  components: {
    ComposeTweet
  },
  data () {
    return {
      opened: false,
      imageUrl: '',
      showImageDialog: false
    }
  },
  methods: {
    createPost () {
      this.opened = true
    }
  }
}
</script>
