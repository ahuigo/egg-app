'use strict';
const Service = require('egg').Service;
const { execSync } = require('child_process')
const fs = require('fs')

module.exports =
  class WordsService extends Service {
    tts(r) {
      let word = r.word
      if (!fs.existsSync(`data/tts/${word}.us.mp3`)) {
        for (let [lan1, lan2] of Object.entries({ 'uk': 'en', 'en': 'us' })) {
          let url = `https://fanyi.baidu.com/gettts?lan=${lan1}&text=${(word)}&spd=3&source=web`
          let cmd = `curl '${url}' -H 'Referer: https://fanyi.baidu.com/' -H 'User-Agent:  Chrome/68.0.3440.106' --compressed -o data/tts/${word}.${lan2}.mp3`
          console.log(cmd)
          execSync(cmd)
        }
      }
    }

    /**
     * getAffix 词根词缀
     * @param {*} word 
     */
    getAffix(word) {
      let html = require('node-html-parser');
      let url = `http://www.youdict.com/search?word=${word}`;
      let root = html.parse(execSync(`wget '${url}' -O - `).toString());
      return (root.querySelector('#yd-ciyuan.row') || { text: 'no' }).text
    }

    /**
     * getWord 查词
     * @param {*} word 
     */
    async getWord(word) {
      word = encodeURIComponent(word)
      r = await this.app.model.Words.findWord(word)
      console.log(r,word)
      if (!r) {
        var r = {}
        let cmd = `curl 'https://fanyi.baidu.com/transapi'  -H 'User-Agent: Chrome/68.0.3440.106' -H 'Referer: https://fanyi.baidu.com/' --data 'from=en&to=zh&query=${word}&source=txt' `
        var d = JSON.parse(execSync(cmd).toString())
        console.log(d)
        if (d.result) {
          let res = JSON.parse(d.result)
          r = { word: word, ...res.voice[0], ...res.voice[1] }
          r.mean = res.content[0].mean.map(item => {
            return item.pre + ' ' + Object.keys(item.cont).join(';')
          }).join('\n')

          if (r.mean) {
            this.tts(r);
            r.affix = this.getAffix(word)
          }
          console.log(r)
          this.app.model.Words.createWord(r)
          //r.affix = this.getAffix(word)
          return r
        }
      }
      r.mp3 = {
        en: `/public/tts/${word}.en.mp3`,
        us: `/public/tts/${word}.us.mp3`,
      }
      return r
    }
  }
