<template>
  <div class="tasks">
        <div v-for="[taskName, taskMeta] in Object.entries(remoteTaskMetas)" :key="taskName">
            <div>
                <h4>{{taskName}}</h4>
                <div>{{taskMeta.desc}}</div>
                <div><input :value="taskName" type="checkBox" @change="toggleTask(taskName, $event.target.checked)"></div>
            </div>
        </div> 
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      remoteTaskMetas: {
        coca7000: { desc: "COCA 高频词7000" }
      }
    };
  },
  props: {
    remoteTasks: Array
  },
  async created() {
    await window.loadScript("https://unpkg.com/dexie@latest/dist/dexie.js")
  },
  methods:{
    async toggleTask(taskName, isSelected){
          window.console.log(taskName, isSelected)
          var db = new Dexie("Memory");
          db.version(1).stores({
              tasks: 'name',
              friends: 'name',
          });
          

          db.friends.put({name: "Nicolas", shoeSize: 9}).then (function(){
              return db.friends.get('Nicolas');
          }).then(function (friend) {
              //
              // Display the result
              //
              alert ("Nicolas has shoe size " + friend.shoeSize);
          }).catch(function(error) {
             //
             // Finally don't forget to catch any error
             // that could have happened anywhere in the
             // code blocks above.
             //
             alert ("Ooops: " + error);
          });
      }
  },
};
</script>