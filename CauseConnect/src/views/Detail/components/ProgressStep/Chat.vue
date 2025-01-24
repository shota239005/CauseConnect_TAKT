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
  nickname: { // 新たに受け取るプロパティ
    type: String,
    required: true,
  },
  request: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  console.log("[Chat] props.nickname:", props.nickname); // ニックネームを確認
});

const messages = ref([]); // チャットメッセージリスト

// チャット履歴を取得
const fetchMessages = async () => {
  try {
    const response = await apiClient.get(`/chat/${props.caseId}`);
    messages.value = response.data.messages.map(msg => ({
      created: msg.created || new Date().toISOString(), // 日時を補完
      case_id: msg.case_id,
      user_id: msg.user_id,
      message: msg.message
    }));
    console.log("チャット履歴を取得しました:", messages.value);
  } catch (error) {
    console.error("チャット履歴の取得に失敗:", error);
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

    const newMessage = {
      created: new Date().toISOString(), // クライアント側で送信日時を補完
      case_id: props.caseId,
      user_id: props.userId,
      message: message.text,
    };

    messages.value.push(newMessage); // ローカルリストに追加
    console.log("メッセージを送信しました:", newMessage);

    await fetchMessages(); // 最新のメッセージリストを取得
  } catch (error) {
    console.error("メッセージの送信に失敗:", error);
  }
};

// コンポーネントがマウントされたらチャット履歴を取得
onMounted(() => {
  fetchMessages();
  console.log("[chat] caseId:", props.caseId);
  console.log("[chat] userId:", props.userId);
});

</script>

<template>
  <div class="chat-container">
    <h1>チャット</h1>

    <!-- メッセージリスト -->
    <MessageList :messages="messages" :nickname="props.nickname" />

    <!-- メッセージ送信フォーム -->
    <MessageInput @sendMessage="addMessage" :nickname="props.nickname" />
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