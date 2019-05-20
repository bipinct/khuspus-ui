<template>
  <div>
    <q-alert color="neutral" padding text-color="gray" class="emptylist">{{message}}</q-alert>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.emptylist {
  text-align: center;
  padding: 20px;
}
</style>
