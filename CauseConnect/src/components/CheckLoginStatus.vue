<script setup>
import { ref } from "vue";
import axios from "axios";

// ログイン状態を保持
const isLoggedIn = ref(false);

// ログイン状態を親に伝えるイベント
defineEmits(["login-status-checked"]);

// APIリクエストでログイン状態を取得
const checkLoginStatus = async () => {
  try {
    // APIにリクエストを送信
    const response = await axios.get("http://172.16.3.136:8000/api/login-status");
    isLoggedIn.value = response.data.loggedIn || false; // サーバーのレスポンスに従う

    // ログイン状態を親に通知
    emit("login-status-checked", isLoggedIn.value);
  } catch (error) {
    console.error("ログイン状態確認エラー:", error);
    // エラーが発生した場合はログインしていないとみなす
    isLoggedIn.value = false;
    emit("login-status-checked", false);
  }
};

// コンポーネントがマウントされたときにログイン状態を確認
checkLoginStatus();
</script>

<template>
  <!-- 必要なら、読み込み中などのUIを表示できます -->
  <div>
    <!-- ログイン状態の確認中メッセージ -->
    <p v-if="isLoggedIn === null">ログイン状態を確認中...</p>
    <!-- ログイン状態の結果 -->
    <p v-else-if="isLoggedIn">ログイン済み</p>
    <p v-else>未ログイン</p>
  </div>
</template>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
