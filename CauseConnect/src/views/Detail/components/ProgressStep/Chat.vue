<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/axios";
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
  nickname: {
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

    // 各メッセージのニックネームをログに出力
    messages.value.forEach((message, index) => {
      console.log(`[Chat] メッセージ ${index + 1}:`, {
        user_id: message.user_id,
        nickname: message.nickname || "ニックネームなし",
        message: message.message,
        created: message.created,
      });
    });

  } catch (error) {
    console.error("[Chat] チャット履歴の取得に失敗:", error);
  }
};

// メッセージ送信
const addMessage = async (message) => {
  try {
    const response = await apiClient.post("/chat", {
      case_id: props.caseId,
      user_id: props.userId,
      message: message.text,
    });
    messages.value.push(response.data.message); // 送信されたメッセージを追加
    await fetchMessages(); // 再取得して他のユーザーの変更を反映
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
    <MessageList :messages="messages" :user-id="props.userId"  :user-nickname="props.nickname" />
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
</style>
