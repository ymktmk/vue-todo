import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
fetch: function() {
  var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  return todos
},
save: function(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default todoStorage

new Vue({
  render: h => h(App),
}).$mount('#app')
