<template>
  <div>
    <img class="avatar" :src="src" @error="noimage" @click="viewImage">
    <div class="overlayview" v-if="false">
      <div class="close" @click="viewImage">X</div>
      <img :src="src" width="100%">
    </div>
  </div>
</template>
<script>
export default {
  props: ['src'],
  data () {
    return {
      showImage: false
    }
  },
  methods: {
    noimage (data) {
      data.target.src = './assets/app/noimage.png'
    },
    viewImage () {
      this.showImage = !this.showImage
    }
  }

}
</script>
<style>
.overlayview {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 90001;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
}
.close {
  position: fixed;
  right: 30;
  top: 20;
  color: #fff;
  border: 1px solid #fff;
  padding: 2px 10px;
}
</style>
