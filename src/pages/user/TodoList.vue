<template>
  <q-page>
    <q-tabs color="transparent" class="flex" text="black">
      <q-tab default text="black" color="black" slot="title" label="Todo's" name="todo"/>
      <q-tab text="black" color="black" slot="title" label="Done" name="done"/>
      <q-tab-pane name="todo">
        <TodoList/>
      </q-tab-pane>
      <q-tab-pane name="done">
        <DoneList/>
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<script>
import TodoList from '../../components/user/TodoList'
import DoneList from '../../components/user/DoneList'

export default {
  components: {
    TodoList,
    DoneList
  }
}
</script>
