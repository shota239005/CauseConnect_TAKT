<script setup>
import { defineProps } from "vue";

// 親コンポーネントからメッセージリストを受け取る
const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="message-list">
    <!-- メッセージをループして表示 -->
    <div v-for="(message, index) in props.messages" :key="index" class="message-item">
      <strong>{{ message.user }}:</strong> {{ message.text }}
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
  border-bottom: 1px solid #ccc;
}

.message-item:last-child {
  border-bottom: none;
}
</style>
