<template>
  <div id="app">
      <div id="menu">
          <a href="#/task">背诵</a>
          <a href="#/tasks">计划表</a>
          <a href="#/dict">查词</a>
      </div>
    <!-- <Page :tasklist="['coca']"/> -->
    <div>
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Tasks from "./com/Tasks.vue";
import Task from "./com/Task.vue";
import Dict from "./com/Dict.vue";
const router = new Router({
    routes: [
    { path: "/tasks", component: Tasks },
    { path: "/", component: Task },
    { path: "/task", component: Task },
    { path: "/dict", component: Dict},
    ]
});

export default {
    router,
    name: "app",
    beforeCreate(){
    },
    //components: { Task },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
