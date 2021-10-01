<template>
  <div>
    <h1>チュートリアルToDoリスト</h1>
    <table>
      <thead v-pre>
        <tr>
          <th class="id">ID</th>
          <th class="comment">コメント</th>
          <th class="state">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      
      <tbody v-for="todo in todos" :key="todo.id">
        <tr>
          <th>{{ todo.id }}</th>
          <td>{{ todo.comment }}</td>
          <td class="state">
            <button @click="changeState(todo)">
              {{ labels[todo.state] }}
            </button>
          </td>
          <td class="button">
            <button @click="deleteTodo(todo)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p>※削除ボタンはコントロールキーを押しながらクリックして下さい</p>

    <h2>新しい作業の追加</h2>
    <form class="add-form" v-on:submit.prevent="createTodo">
      <p>コメント</p>
      <input type="text" ref="comment">
      <button type="submit" >追加</button>
    </form>
  </div>
</template>

<script>

import todoStorage from '@/main'

export default {
  name: 'Todo',
  data() {
    return {
      todos: [],
      uid: 0,
      labels: ["作業中","完了"],
      options: [
        { value: -1, label: 'すべて' },
        { value: 0, label: '作業中' },
        { value: 1, label: '完了' }
      ],
    }
  },
  mounted: function() {

  },
  created() {
    this.todos = todoStorage.fetch()
    this.uid = this.todos.length
  },
  watch: {
    // データが追加されたら保存する
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  methods: {
    changeState: function (todo) {
      // 0だったら1になる
      // 1だったら0になる
      todo.state = todo.state ? 0 : 1
    },
    deleteTodo: function (todo) {
      console.log(todo)
      const index = this.todos.indexOf(todo)
      console.log(index)
      this.todos.splice(index,1)
    },
    createTodo: function() {
      /// ここで保存
      if (!this.$refs.comment.value.length) {
        // 何も入力されなかったら
        return
      }
      this.todos.push({
        // ここがおかしい
        id: this.uid++,
        comment: this.$refs.comment.value,
        state: 0
      })
      this.$refs.comment.value = ''
    }
    
  }

}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
#app {
  max-width: 640px;
  margin: 0 auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead th {
  border-bottom: 2px solid #0099e4; /*#d31c4a */
  color: #0099e4;
}
th,
th {
  padding: 0 8px;
  line-height: 40px;
}
thead th.id {
  width: 50px;
}
thead th.state {
  width: 100px;
}
thead th.button {
  width: 60px;
}
tbody td.button, tbody td.state {
  text-align: center;
}
tbody tr td,
tbody tr th {
  border-bottom: 1px solid #ccc;
  transition: all 0.4s;
}
tbody tr.done td,
tbody tr.done th {
  background: #f8f8f8;
  color: #bbb;
}
tbody tr:hover td,
tbody tr:hover th {
  background: #f4fbff;
}
button {
  border: none;
  border-radius: 20px;
  line-height: 24px;
  padding: 0 8px;
  background: #0099e4;
  color: #fff;
  cursor: pointer;
}
</style>
