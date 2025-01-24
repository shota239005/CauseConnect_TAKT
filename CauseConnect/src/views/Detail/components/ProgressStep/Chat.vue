<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/axios"; // Axiosインスタンス
import MessageList from "./MessageList.vue";
import MessageInput from "./MessageInput.vue";

// ✅ 親コンポーネントから `caseId` と `userId` を受け取る
const props = defineProps({
  caseId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
});

const messages = ref([]); // チャットメッセージリスト

// チャット履歴を取得
const fetchMessages = async () => {
  try {
    const response = await apiClient.get(`/chat/${props.caseId}`); // caseId を使用して取得
    messages.value = response.data.messages || []; // デフォルトで空配列を設定
    console.log("チャット履歴を取得しました:", messages.value);
  } catch (error) {
    console.error("チャット履歴の取得に失敗:", error);
  }
};

// メッセージの送信
const addMessage = async (message) => {
  try {
    const response = await apiClient.post("/chat", {
      case_id: props.caseId, // caseId を使用
      user_id: props.userId, // userId を使用
      message: message.text,
    });

    // メッセージを追加し、リストを更新
    messages.value.push(response.data.message);
    console.log("メッセージを送信しました:", response.data.message);

    // メッセージリストを再取得
    await fetchMessages();
  } catch (error) {
    console.error("メッセージの送信に失敗:", error);
  }
};

// コンポーネントがマウントされたらチャット履歴を取得
onMounted(() => {
  fetchMessages();
});
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