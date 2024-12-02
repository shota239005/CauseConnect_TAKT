<script>
export default {
  data() {
    return {
      logs: [], // 記録を保持する配列
    };
  },
  methods: {
    logCurrentTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const weekday = ['日', '月', '火', '水', '木', '金', '土'][now.getDay()];
      const time = now.toLocaleTimeString();
      const currentTime = `${year}年${month}月${day}日 (${weekday}) ${time}`;
      this.logs.push(currentTime); // 配列に現在時刻を追加
    },
  },
};
</script>

<template>
  <div>
    <h2>送信ボタンを押して記録</h2>
    <button class="btn1" @click="logCurrentTime">記録する</button>
    <ul>
      <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 5px 0;
  padding: 5px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
