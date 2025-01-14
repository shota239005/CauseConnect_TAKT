<script setup>
import BasicInfo from './components/BasicInfo/BasicInfo.vue';
import Editmenu from './components/Editmenu.vue';
import ProgressStep from './components/ProgressStep/ProgressStep.vue';
import search from '@/components/search.vue';

import { ref, onMounted, watch } from 'vue';
import apiClient from '@/axios'; // Axios クライアントをインポート

// URL パラメータの 'id' を props として受け取る
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// 取得したデータを格納する変数
const requestDetails = ref(null);

// ローディング中のフラグ
const loading = ref(true);

// 詳細データを取得する関数
const fetchRequestDetails = async () => {
  try {
    const response = await apiClient.get(`/search-posts/${props.id}`); // URLが正しいか確認
    requestDetails.value = response.data;

    // データ取得後にローディングを終了
    loading.value = false;

    // データ取得後にログを表示
    console.log("Detail.vue:", requestDetails.value);
  } catch (error) {
    console.error("データ取得に失敗しました:", error);
    loading.value = false;
  }
};

// コンポーネントがマウントされた時にデータを取得
onMounted(fetchRequestDetails);

// `props.id` が変わったときにデータを再取得
watch(
  () => props.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      fetchRequestDetails(); // 新しい ID に基づきデータ取得
    }
  }
);

// 進行度の状態（0～4）
const currentProgress = 2; // 仮の進行度データ（0:未着手、4:完了）
</script>

<template>
  <search />
  <div class="detail-page">
    <!-- ローディング中の表示 -->
    <p v-if="loading">データを読み込んでいます...</p>

    <!-- データが取得できた場合の表示 -->
    <div v-else>
      <!-- 上部：基本情報＆参加者情報 -->
      <div class="upper-section">
        <div class="left-section">
          <!-- BasicInfo にデータを渡す -->
          <BasicInfo :request="requestDetails"/>
        </div>
        <div class="right-section">
          <!-- Editmenu にデータを渡す -->
          <Editmenu :request="requestDetails.value"/>
        </div>
      </div>

      <!-- 下部：進行度1～4 -->
      <div class="progress-section">
        <!-- ProgressStep にデータと進行度を渡す -->
        <ProgressStep :request="requestDetails.value" :current-progress="currentProgress" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.detail-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.upper-section {
    display: flex;
    gap: 20px;
}

.left-section,
.right-section {
    flex: 1;
}

.progress-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.search-container{
  width: 50%;
  margin-right: 190px;
  margin-top: 10px;
  margin-bottom: 0%;
  padding: 0%;
}
</style>
