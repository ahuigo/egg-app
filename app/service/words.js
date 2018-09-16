'use strict';
const Service = require('egg').Service;
const { execSync } = require('child_process')
const fs = require('fs')

module.exports =
  class WordsService extends Service {
    tts(r) {
      let word = r.word
      if(!fs.existsSync(`data/tts/${word}.us.mp3`)){
        for (let [lan1,lan2] of Object.entries({'uk':'en', 'en':'us'})) {
          let url = `https://fanyi.baidu.com/gettts?lan=${lan1}&text=${(word)}&spd=3&source=web`
          let cmd = `curl '${url}' -H 'Referer: https://fanyi.baidu.com/' -H 'User-Agent:  Chrome/68.0.3440.106' --compressed -o data/tts/${word}.${lan2}.mp3`
          console.log(cmd)
          execSync(cmd)
        }
      }
      r.mp3 = {
        en: `/data/tts/${word}.en.mp3`,
        us: `/data/tts/${word}.us.mp3`,
      }
    }
    async getWord(word) {
      word = encodeURIComponent(word)
      r = await this.app.model.Words.findWord(word)
      if (!r) {
        var r = {}
        let cmd = `curl 'https://fanyi.baidu.com/transapi'  -H 'User-Agent: Chrome/68.0.3440.106' -H 'Referer: https://fanyi.baidu.com/' --data 'from=en&to=zh&query=${word}&source=txt' `
        var d = JSON.parse(execSync(cmd).toString())
        console.log(d)
        if (d.result) {
          let res = JSON.parse(d.result)
          r = {word:word, ...res.voice[0], ...res.voice[1] }
          r.mean = res.content[0].mean.map(item => {
            return item.pre + ' ' + Object.keys(item.cont).join(';')
          }).join('\n')
          this.app.model.Words.createWord(r)
        }else{
          return r
        }
      }
      if(r.mean){
        this.tts(r);
      }
      return r
    }
    async saveWord() {

    }
  }
