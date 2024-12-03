<script setup>
import { ref } from "vue";
import MessageList from "./MessageList.vue";
import MessageInput from "./MessageInput.vue";

// メッセージリスト
const messages = ref([
  { user: "Tanaka", text: "実行者さんが参加しました"},
  { user: "You", text: "依頼者さんが参加しました"},
]);

// メッセージの追加
const addMessage = (message) => {
  message.time = formatDate(new Date()); // 送信時間と日付を追加
  messages.value.push(message);
};

// 日付を「YYYY/MM/DD hh:mm:ss」の形式でフォーマット
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};</script>
<template>
  <div class="chat-container">
    <h1>チャット</h1>

    <!-- メッセージリスト -->
    <MessageList :messages="messages" />

    <!-- メッセージ送信フォーム -->
    <MessageInput @sendMessage="addMessage" />
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border: 2px solid #f7a400;
  border-radius: 8px;
}

h1 {
  text-align: center;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
