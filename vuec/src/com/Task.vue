<template>
  <div class="task">
      <div>
          task hahaha
          <!-- <div v-for="task in tasklist">
              <input type="checkbox" :value="task" />
              {{task}}
          </div> -->
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    tasklist: Array
  },
  created(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
