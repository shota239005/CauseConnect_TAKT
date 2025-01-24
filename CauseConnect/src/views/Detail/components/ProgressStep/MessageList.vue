<script setup>
import { defineProps } from "vue";

// 親コンポーネントから `messages` を受け取る
defineProps({
  messages: {
    type: Array,
    required: true,
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
      :class="{ 'own-message': message.user_id === $props.userId, 'other-message': message.user_id !== $props.userId }"
    >
      <div class="message-header">
        <span class="message-user">{{ message.user_name || '匿名ユーザー' }}</span>
        <span class="message-time">{{ message.time || '時間未定' }}</span>
      </div>
      <div class="message-body">
        {{ message.message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.message-item {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
}

.own-message {
  background-color: #e0f7fa;
  color: #00796b;
  text-align: right;
}

.other-message {
  background-color: #ffebee;
  color: #b71c1c;
  text-align: left;
}

.message-header {
  font-size: 0.9em;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}

.message-user {
  font-weight: bold;
}

.message-time {
  color: #888;
}

.message-body {
  font-size: 1em;
  white-space: pre-wrap;
}
</style>
