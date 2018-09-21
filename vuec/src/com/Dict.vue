<template>
  <div class="dict">
    <h1>查单词</h1>
    <div>
        <input v-model="word" placeholder="Word" @keyup.enter="queryWord">
        <button @click="queryWord()">查词</button>
        <div v-if="mean">
            <div><pre>{{mean}}</pre></div>
            <div>
                英式: {{en_phonic}} <i class="voice_ico" @mouseover="play(word, 'en')"></i> 
                美式: {{us_phonic}} <i class="voice_ico" @mouseover="play(word, 'us')"></i> 
            </div>
            <div>{{affix}} </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dict_by_ahui",
  data() {
    return {
      word: "",
      mean: "",
      affix: "",
      en_phonic: "",
      us_phonic: "",
      mp3: []
    };
  },
  props: {
    msg: String
  },
  methods: {
    queryWord() {
      fetch2('/api/word/getWord?', {qs:{word:this.word}})
        .then(async r => await r.json())
        .then(d => {
            console.log(d,d);
          for (let k in d) {
              console.log(k, d[k])
            this[k] = d[k];
          }
        });
    },
    play(word, lan){
        var audio = new Audio(`/public/tts/${word}.${lan}.mp3`);
        audio.play();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.voice_ico {
    display: inline-block;
    width: 20px;
    height: 16px;
    margin-left: 6px;
    margin-right: 20px;
    cursor: pointer;
    background: url(../assets/searchs_ico.png) -4px -4px no-repeat;
    vertical-align: middle;
}
.voice_ico:hover {
    background: url(http://cdn.iciba.com/www/img/icon/sound/sound-play.gif) no-repeat!important;
}
</style>
