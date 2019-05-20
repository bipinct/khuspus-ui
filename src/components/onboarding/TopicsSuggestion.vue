<template>
  <q-page class="justify-between">
    <h1>Choose At least 3 categories</h1>
    <hr>
    <div class="row">
      <ApolloQuery ref="userfeed" :query="require('../../graphql/categoryList.gql')">
        <template slot-scope="{ result: { loading, error, data } }">
          <div v-if="loading" class="loading apollo">
            <q-spinner color="primary" size="6em"/>
          </div>
          <div v-else-if="error" class="error apollo">An error occured</div>
          <div v-else-if="data" class="result apollo">
            <div v-if="data.categories" class="row">
              <div class="col-6" v-for="category in data.categories" :key="category.id">
                <CategoryItem
                  :id="category.id"
                  :name="category.content"
                  :image="category.imageurl"
                />
              </div>
            </div>
            <div v-else>
              <EmptyList message="No data"/>
            </div>
          </div>
          <div v-else class="no-result apollo text-center">
            <q-spinner color="primary" size="2em"/>
          </div>
        </template>
      </ApolloQuery>
    </div>
  </q-page>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import CategoryItem from '../../components/CategoryItem'
export default {
  components: {
    CategoryItem
  },
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
  width: 40%;
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
