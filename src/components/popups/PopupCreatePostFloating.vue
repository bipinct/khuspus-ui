<template>
  <div>
    <q-btn
      round
      color="blue"
      class="fixed"
      style="right: 18px; bottom: 18px"
      icon="add"
      @click.native="createPost"
    ></q-btn>
    <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" color="white">
          <q-toolbar-title center class="headerIcons">Compose new Tweet</q-toolbar-title>
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
