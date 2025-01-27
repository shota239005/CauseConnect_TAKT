<script setup>
import { ref, defineEmits } from 'vue';

// メッセージ入力
const message = ref("");

// イベントを定義
const emit = defineEmits();

// メッセージ送信処理
const sendMessage = () => {
  if (message.value.trim() !== "") {
    emit("sendMessage", { text: message.value });
    message.value = ""; // メッセージ入力欄をクリア
  }
};
</script>

<template>
  <div class="message-input">
    <input v-model="message" type="text" placeholder="メッセージを入力..." />
    <button @click="sendMessage">送信</button>
  </div>
</template>

<style scoped>
.message-input {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

input {
  flex-grow: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
