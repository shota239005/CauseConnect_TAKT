<script setup>
import { defineProps } from "vue";

defineProps({
  messages: Array
});
</script>

<template>
  <div class="message-list">
    <!-- メッセージをループして表示 -->
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="message-item"
      :class="{ 'tanaka': message.user === 'Tanaka', 'you': message.user === 'You' }"
    >
      <div class="message-time">{{ message.time }}</div>
      <div class="message-text">
        <strong>{{ message.user }}:</strong> {{ message.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message-item {
  padding: 10px;
  border-bottom: 2px solid #f7a400;
}

.message-item:last-child {
  border-bottom: none;
}

/* Tanaka のスタイル */
.tanaka {
  background-color: #e0f7fa;
  color: #00796b;
}

/* You のスタイル */
.you {
  background-color: #ffebee;
  color: #b71c1c;
}

.message-time {
  font-size: 0.9em;
  color: #888;
  margin-bottom: 5px;
}

.message-text {
  font-size: 1em;
}
</style>
