<template>
  <q-page>
    <q-stepper color="primary" ref="stepper" alternative-labels>
      <q-step default name="first" title="Select Topics">
        <div :key="n" v-for="n in 1">
          <TopicsSuggestion/>
        </div>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.next()" label="Continue"/>
        </q-stepper-navigation>
      </q-step>

      <q-step name="second" title="Follow">
        <div :key="n" v-for="n in 1">
          <FollowSuggestionCard/>
        </div>
        <q-stepper-navigation>
          <q-btn color="secondary" @click="$router.push('/user')" label="Finish"/>
          <q-btn color="secondary" flat @click="$refs.stepper.previous()" label="Back"/>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
import TopicsSuggestion from '../../components/onboarding/TopicsSuggestion'
import FollowSuggestionCard from '../../components/twitter/FollowSuggestionCard'

export default {
  components: {
    TopicsSuggestion,
    FollowSuggestionCard
  }

}
</script>
