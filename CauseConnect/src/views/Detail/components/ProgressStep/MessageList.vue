<script setup>
import { defineProps } from "vue";

// 親コンポーネントから受け取る props を定義
const props = defineProps({
  messages: {
    type: Array, // メッセージリスト
    required: true, // 必須
  },
  userId: {
    type: Number, // 現在のユーザーの ID
    required: true, // 必須
  },
  userNickname: {
    type: String, // 現在のユーザーのニックネーム
    required: true, // 必須
  },
});
</script>

<template>
  <div class="message-list">
    <!-- メッセージをループして表示 -->
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="message-item"
      :class="{ 'own-message': message.user_id === userId, 'other-message': message.user_id !== userId }"
    >
      <div class="message-header">
        <span class="message-user">
          {{ message.user_id === userId ? userNickname : message.nickname || 'ゲスト' }}
        </span>
        <span class="message-time">{{ message.created }}</span>
      </div>
      <div class="message-body">{{ message.message }}</div>
    </div>
  </div>
</template>

<style scoped>
.message-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.message-item {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.own-message {
  background-color: #e0f7fa;
  text-align: right;
}

.other-message {
  background-color: #ffebee;
  text-align: left;
}

.message-header {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 5px;
}

.message-user {
  font-weight: bold;
  margin-right: 10px;
}

.message-time {
  font-style: italic;
}

.message-body {
  font-size: 1rem;
}
</style>
