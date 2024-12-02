<script setup>
import { ref } from "vue";
import MessageList from "./MessageList.vue";
import MessageInput from "./MessageInput.vue";

// メッセージリスト
const messages = ref([
  { user: "Bot", text: "こんにちは！" },
  { user: "You", text: "こんにちは！" },
]);

// メッセージの追加
const addMessage = (message) => {
  messages.value.push(message);
};
</script>

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
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
