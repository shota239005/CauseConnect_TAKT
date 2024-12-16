<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close'); // 親コンポーネントに閉じるイベントを送信
    },
  },
};
</script>

<template>
  <div class="favo-list">
    <h1>お気に入り一覧</h1>
    <div>
    <p>よーいはっけ</p>
  </div>
    <p>サスペンダー鈴木</p>
    <p></p>
  </div>
</template>


<style scoped>
.favo-list {
  text-align: center;
}

button {
  background-color: #f7a400;
  border: none;
  padding: 10px 20px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #ff8c00;
}
</style>
