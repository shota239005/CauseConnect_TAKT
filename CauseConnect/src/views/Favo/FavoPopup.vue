<script setup>
import { ref, onMounted } from "vue";
import RequestItem from "./FavoMenu.vue"; // RequestItem コンポーネントをインポート
import apiClient from '@/axios'; // Axiosインスタンス

// お気に入りのリクエストを保持する変数
const favoriteRequests = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

// APIからお気に入りの依頼を取得
const fetchFavoriteRequests = async () => {
  try {
    const response = await apiClient.get("/favorites"); // APIエンドポイントを適宜変更
    favoriteRequests.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error("お気に入りの取得に失敗しました:", error);
    errorMessage.value = "お気に入りの取得に失敗しました。後ほど再試行してください。";
    isLoading.value = false;
  }
};

// コンポーネントがマウントされたときにお気に入りのリストを取得
onMounted(() => {
  fetchFavoriteRequests();
});
</script>

<template>
  <div class="favorite-list">
    <div class="title">
      <h1>お気に入り一覧</h1>
    </div>

    <!-- ローディング中の表示 -->
    <div v-if="isLoading" class="loading">
      データを読み込んでいます...
    </div>

    <!-- エラーメッセージ -->
    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>

    <!-- お気に入りリスト -->
    <div v-if="!isLoading && favoriteRequests.length === 0" class="no-requests">
      現在、表示できるお気に入りはありません。
    </div>

    <div v-else class="requests">
      <div v-for="request in favoriteRequests" :key="request.id" class="request-item">
        <RequestItem :request="request" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorite-list {
  text-align: center;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.loading {
  font-size: 18px;
  color: #666;
}

.error {
  font-size: 18px;
  color: red;
}

.requests {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.request-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 15px;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  background-color: #fff;
}

.request-item:hover {
  transform: translateX(-10px) scale(1.05); /* 左に移動して拡大 */
  background-color: #ffeacf;
  border: 3px solid #ff8c00;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 影をつけて強調 */
}
</style>
