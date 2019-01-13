import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
Vue.config.debug = true;
Vue.config.devtools = true;

window.loadJs = function(key, url){
  return new Promise((resolve, reject)=>{
    if(window[key]){
      resolve(window[key])
    }
    let script = document.createElement('script')
    script.src = url;
    script.onload = ()=>resolve(window[key]);
    script.onerror= reject;
    window.document.head.append(script);
  });
}

window.fetch2 = function fetch2(url, options={}) {
  options = {
      // your default options
      credentials: 'same-origin',
      redirect: 'error',
      ...options,
  };

  if(options.qs) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.qs);
      delete options.queryParams;
  }

  return fetch(url, options);
}

function queryParams(params) {
  return Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
}

new Vue({
  render: h => h(App)
}).$mount('#app')
