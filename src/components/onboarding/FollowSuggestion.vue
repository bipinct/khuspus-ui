<template>
  <q-page class="flex flex-center">
    <h1>Choose At least 3 categories</h1>
    <div class="row">
      <div class="col-6">
        <div
          style="width:100%;overflow:hidden;border:3px solid #fff; border-radius:20px;position:relative;"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkup88WDV2NU6RMbuhmGCSKBswZY9WnwrFs9otJSimIj3DGRA"
          >
          <div style="position:absolute;bottom:10px;background-color:#fff;padding:10px;">Technology</div>
        </div>
      </div>
      <div class="col-6">
        <div
          style="width:100%;overflow:hidden;border:3px solid #fff; border-radius:20px;position:relative;"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkup88WDV2NU6RMbuhmGCSKBswZY9WnwrFs9otJSimIj3DGRA"
          >
          <div style="position:absolute;bottom:10px;background-color:#fff;padding:10px;">Technology</div>
        </div>
      </div>
      <div class="col-6">
        <div
          style="width:100%;overflow:hidden;border:3px solid #fff; border-radius:20px;position:relative;"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkup88WDV2NU6RMbuhmGCSKBswZY9WnwrFs9otJSimIj3DGRA"
          >
          <div style="position:absolute;bottom:10px;background-color:#fff;padding:10px;">Technology</div>
        </div>
      </div>
      <div class="col-6">
        <div
          style="width:100%;overflow:hidden;border:3px solid #fff; border-radius:20px;position:relative;"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkup88WDV2NU6RMbuhmGCSKBswZY9WnwrFs9otJSimIj3DGRA"
          >
          <div style="position:absolute;bottom:10px;background-color:#fff;padding:10px;">Technology</div>
        </div>
      </div>
      <div class="col-6">
        <div
          style="width:100%;overflow:hidden;border:3px solid #fff; border-radius:20px;position:relative;"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkup88WDV2NU6RMbuhmGCSKBswZY9WnwrFs9otJSimIj3DGRA"
          >
          <div style="position:absolute;bottom:10px;background-color:#fff;padding:10px;">Technology</div>
        </div>
      </div>
      <div class="col-6">
        <div
          style="width:100%;overflow:hidden;border:3px solid #fff; border-radius:20px;position:relative;"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkup88WDV2NU6RMbuhmGCSKBswZY9WnwrFs9otJSimIj3DGRA"
          >
          <div style="position:absolute;bottom:10px;background-color:#fff;padding:10px;">Technology</div>
        </div>
      </div>
    </div>
    <div class="qm-4">
      <q-btn
        label="Next"
        color="blue"
        class="full-width q-btn-rectangle q-focusable q-hoverable"
        @click="verifyMutation(mutate)"
      />
    </div>
  </q-page>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      display: 1,
      username: '',
      password: '',
      email: '',
      leftDrawer: true,
      form: {
        username: '',
        password: ''
      },
      errorMessage: null

    }
  },
  methods: {
    onDone (data) {
      localStorage.setItem('x-token', data.data.signIn.token)
      localStorage.setItem('user', JSON.stringify(data.data.signIn.user))
      this.$store.commit('user/userLogin', { status: true, token: data.data.signIn.token, user: data.data.signIn.user })
      this.$router.push('/user/feed')
    },
    verifyMutation (mutate) {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        mutate()
      }
    },
    makeError (er) {
      if (er && er.graphQLErrors && er.graphQLErrors[0].message) { this.errorMessage = er.graphQLErrors[0].message }
    }

  },
  validations: {
    form: {
      username: {
        required, minLength: minLength(4)
      },
      password: {
        required
      }
    }
  }

}
</script>
<style>
.circular--portrait {
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
}
.circular--square {
  border-top-left-radius: 50% 50%;
  border-top-right-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50% 50%;
}
.circular--portrait img {
  width: 100%;
  height: auto;
}
</style>
