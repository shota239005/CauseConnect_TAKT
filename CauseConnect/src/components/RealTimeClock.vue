<script>
export default {
  data() {
    return {
      currentTime: this.getCurrentTime(),
      currentDate: this.getCurrentDate(),
    };
  },
  methods: {
    getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString(); // フォーマット：HH:MM:SS
    },
    getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear(); // 西暦
      const month = now.getMonth() + 1; // 月（0始まりなので+1）
      const day = now.getDate(); // 日
      const weekday = ['日', '月', '火', '水', '木', '金', '土'][now.getDay()]; // 曜日
      return `${year}年${month}月${day}日 (${weekday})`;
    },
  },
  mounted() {
    // 1秒ごとに時刻と日付を更新
    this.timer = setInterval(() => {
      this.currentTime = this.getCurrentTime();
      this.currentDate = this.getCurrentDate();
    }, 1000);
  },
  beforeDestroy() {
    // コンポーネントが破棄される際にタイマーをクリア
    clearInterval(this.timer);
  },
};
</script>

<template>
  <div>
    <h3>{{currentDate}} {{ currentTime }}</h3>
  </div>
</template>

<style>
h3{
  font-size: 10px;
  color: #FFF;
}</style>
