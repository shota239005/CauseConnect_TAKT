<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/axios"; // Axiosインスタンス
import MessageList from "./MessageList.vue";
import MessageInput from "./MessageInput.vue";

const props = defineProps({
  caseId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  nickname: { // nickname プロパティを追加
    type: String,
    required: true,
  },
});

const messages = ref([]);

// チャット履歴を取得
const fetchMessages = async () => {
  try {
    const response = await apiClient.get(`/chat/${props.caseId}`);
    messages.value = response.data.messages || [];
    console.log("[Chat] 取得したメッセージ:", messages.value);
  } catch (error) {
    console.error("[Chat] チャット履歴の取得に失敗:", error);
  }
};

// メッセージの送信
const addMessage = async (message) => {
  try {
    const response = await apiClient.post("/chat", {
      case_id: props.caseId,
      user_id: props.userId,
      message: message.text,
    });
    messages.value.push(response.data.message);
  } catch (error) {
    console.error("[Chat] メッセージの送信に失敗:", error);
  }
};

// 初期化
onMounted(() => {
  fetchMessages();
});
</script>

<template>
  <div class="chat-container">
    <h1>チャット</h1>

    <!-- メッセージリスト -->
    <MessageList :messages="messages" :user-id="props.userId" :user-nickname="props.nickname" />

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
</style>
