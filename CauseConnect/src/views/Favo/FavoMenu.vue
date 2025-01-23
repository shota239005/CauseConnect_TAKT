<script setup>
import FavoriteIcon from "@/components/FavoriteIcon.vue"; // FavoriteIcon をインポート
import { defineProps, onMounted, reactive, ref } from "vue";
import apiClient from "@/axios"; // APIクライアントをインポート

// `requests` プロパティを受け取る
const props = defineProps({
  requests: {
    type: Array,
    required: true,
  },
});

// 都道府県名を取得する関数
const fetchPrefectureName = async (prefId) => {
  try {
    const response = await apiClient.get("/prefectures");
    const prefectures = response.data;

    const prefecture = prefectures.find((pref) => pref.pref_id === prefId);
    return prefecture ? prefecture.pref : "不明な都道府県";
  } catch (error) {
    console.error("都道府県データの取得に失敗しました:", error);
    return "不明な都道府県";
  }
};

// 各リクエストデータに都道府県名を追加
const enrichedRequests = ref([]);

onMounted(async () => {
  enrichedRequests.value = await Promise.all(
    props.requests.map(async (request) => {
      const enrichedRequest = reactive({ ...request });
      enrichedRequest.pref_name = await fetchPrefectureName(request.pref_id);

      const baseURL = "http://172.16.3.136:8000";
      enrichedRequest.pictureUrl = request.picture
        ? `${baseURL}${request.picture}`
        : "default-avatar.png";

      return enrichedRequest;
    })
  );
});
</script>

<template>
  <div class="favo-menu">
    <h1 class="title">お気に入り一覧</h1>

    <!-- お気に入りがない場合のメッセージ -->
    <div v-if="enrichedRequests.length === 0" class="no-favorites">
      現在、お気に入り登録された依頼はありません。
    </div>

    <!-- お気に入りリストの表示 -->
    <div v-else class="favorites-list">
      <div v-for="request in enrichedRequests" :key="request.case_id" class="request-item">
        <!-- お気に入りアイコン -->
        <FavoriteIcon :request="request" class="favorite-icon" />

        <!-- 画像表示 -->
        <div class="request-image">
          <img :src="request.pictureUrl" alt="お気に入り画像" />
        </div>

        <!-- 詳細情報 -->
        <div class="request-info">
          <h3>{{ request.case_name }}</h3>
          <p><strong>日付:</strong> {{ request.case_date }}</p>
          <p><strong>都道府県:</strong> {{ request.pref_name }}</p>
          <p><strong>場所:</strong> {{ request.address1 }} {{ request.address2 }}</p>
          <p><strong>活動内容:</strong> {{ request.content }}</p>

          <!-- 詳細ページへのリンク -->
          <router-link :to="`/details/${request.case_id}`" class="details-link">
            詳細を見る
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favo-menu {
  padding: 20px;
  font-family: "Zen Maru Gothic", sans-serif;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.no-favorites {
  text-align: center;
  color: #777;
  font-size: 16px;
}

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.request-item {
  display: flex;
  gap: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}

.request-image img {
  width: 150px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}

.request-info {
  flex-grow: 1;
}

.request-info h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
}

.request-info p {
  margin: 5px 0;
  font-size: 14px;
}

.details-link {
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}

.details-link:hover {
  text-decoration: underline;
}
</style>
