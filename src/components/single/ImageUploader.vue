<template>
  <div>
    <q-uploader
      ref="uploader"
      :multiple="multiple"
      :url="url"
      name="myImage"
      @uploaded="imageUploaded"
      hide-upload-button
      :auto-expand="true"
    />
  </div>
</template>
<script>
export default {
  props: ['multiple'],
  data () {
    return {
      images: [],
      url: ''
    }
  }
}
</script>
