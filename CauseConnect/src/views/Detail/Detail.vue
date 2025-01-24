<script setup>
import BasicInfo from './components/BasicInfo/BasicInfo.vue';
import Editmenu from './components/Editmenu.vue';
import ProgressStep from './components/ProgressStep/ProgressStep.vue';
import search from '@/components/search.vue';

import { ref, onMounted, watch } from 'vue';
import apiClient from '@/axios';

// ✅ URL パラメータの 'id' を props として受け取る
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// ✅ 取得した詳細データとユーザーデータ
const requestDetails = ref(null);
const userInfo = ref(null);  // ✅ ユーザー情報を格納

// ✅ ローディング中のフラグ
const loading = ref(true);

// ✅ ユーザー情報を取得する関数
const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('[Detail] トークンが見つかりません');
      return;
    }

    const response = await apiClient.get('/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    });

    userInfo.value = response.data;

    console.log('[Detail] 取得したユーザー情報:', userInfo.value);

  } catch (error) {
    console.error('[Detail] ユーザー情報の取得に失敗:', error);
  }
};

// ✅ 詳細データを取得する関数
const fetchRequestDetails = async () => {
  try {
    console.log(`[Detail] APIエンドポイント: /search-posts/${props.id}`);  // ✅ 追加

    const response = await apiClient.get(`/search-posts/${props.id}`);
    requestDetails.value = response.data;

    console.log('%c[Detail] 依頼情報:', 'color: blue; font-weight: bold;', requestDetails.value);
    loading.value = false;

  } catch (error) {
    console.error('[Detail] データ取得に失敗しました:', error);
    loading.value = false;
  }
};

// ✅ コンポーネントがマウントされた時にデータ取得
onMounted(() => {
  fetchUserInfo();         // ✅ ユーザー情報の取得
  fetchRequestDetails();   // ✅ 詳細データの取得
});

// ✅ props.id が変わったときにデータを再取得
watch(
  () => props.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      fetchRequestDetails();
    }
  }
);

// ✅ 進行度の状態（0～4）
const currentProgress = 2;
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
          <!-- ✅ BasicInfo に request と userId、caseId を渡す -->
          <BasicInfo
            v-if="userInfo && userInfo.user_id"
            :request="requestDetails"
            :userId="userInfo.user_id"
            :caseId="requestDetails?.case_id"
          />
        </div>
        <div class="right-section">
          <!-- ✅ Editmenu にも条件付きで userId と caseId を渡す -->
          <Editmenu
            v-if="userInfo && userInfo.user_id && requestDetails"
            :request="requestDetails"
            :userId="userInfo.user_id"
            :caseId="requestDetails?.case_id"
          />
        </div>
      </div>

      <!-- 下部：進行度 -->
      <div class="progress-section">
        <!-- ✅ ProgressStep にも userId と caseId を渡す -->
        <ProgressStep
          v-if="userInfo && userInfo.user_id && requestDetails"
          :request="requestDetails"
          :current-progress="currentProgress"
          :userId="userInfo.user_id"
          :userInfo="userInfo"
          :caseId="requestDetails?.case_id"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 100%;
  margin: 0 auto;
  padding: 10px;
}

.upper-section {
  display: flex;
  gap: 20px;
}

.left-section,
.right-section {
  flex: 1;
  margin-top: 20px;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.search-container {
  width: 50%;
  margin-right: 220px;
  margin-top: 2%;
  margin-bottom: 0%;
  padding: 0%;
}
</style>
