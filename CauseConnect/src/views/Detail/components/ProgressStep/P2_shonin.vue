<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const providedData = ref({
  participantsPhoto: '',
  participantsComment: '',
  locationPhoto: '',
  locationComment: '',
  beforeExecutionPhoto: '',
  beforeExecutionComment: '',
  afterExecutionPhoto: '',
  afterExecutionComment: '',
});

const isApproved = ref(null);
const loading = ref(false);

const fetchData = async () => {
  try {
    loading.value = true;
    const response = await axios.get('/api/request-report/35'); // 例: case_id=35
    const data = response.data;

    // データが存在しない場合に備えたデフォルト値
    const photos = data.photos || [];
    const report = data.report || {};

    // データを更新
    providedData.value = {
      participantsPhoto: photos.find((photo) => photo.picture_type === 3)?.picture || '',
      participantsComment: report.comment1 || '参加者のコメントがありません',
      locationPhoto: photos.find((photo) => photo.picture_type === 4)?.picture || '',
      locationComment: report.comment2 || '依頼場所のコメントがありません',
      beforeExecutionPhoto: photos.find((photo) => photo.picture_type === 5)?.picture || '',
      beforeExecutionComment: report.comment3 || '実行前のコメントがありません',
      afterExecutionPhoto: photos.find((photo) => photo.picture_type === 6)?.picture || '',
      afterExecutionComment: report.comment4 || '実行後のコメントがありません',
    };
  } catch (error) {
    console.error('データの取得に失敗しました:', error);
  } finally {
    loading.value = false;
  }
};

const handleApproval = (status) => {
  isApproved.value = status;
};

onMounted(fetchData);
</script>

<template>
  <div class="progress-step3">
    <div v-if="loading" class="loading">データを読み込んでいます...</div>

    <div v-else>
      <div class="data-section">
        <h3>参加者の写真とコメント</h3>
        <img :src="providedData.participantsPhoto" alt="参加者の写真" width="200" />
        <p>{{ providedData.participantsComment }}</p>

        <h3>依頼場所の写真とコメント</h3>
        <img :src="providedData.locationPhoto" alt="依頼場所の写真" width="200" />
        <p>{{ providedData.locationComment }}</p>

        <h3>実行前の写真とコメント</h3>
        <img :src="providedData.beforeExecutionPhoto" alt="実行前の写真" width="200" />
        <p>{{ providedData.beforeExecutionComment }}</p>

        <h3>実行後の写真とコメント</h3>
        <img :src="providedData.afterExecutionPhoto" alt="実行後の写真" width="200" />
        <p>{{ providedData.afterExecutionComment }}</p>
      </div>

      <div class="approval-buttons">
        <h2>※承認を押すとポイントが付与されます</h2>
        <button class="btnNo"
          @click="handleApproval(false)"
          :class="{'selected': isApproved === false}">
          非承認
        </button>
        <button class="btn1"
          @click="handleApproval(true)"
          :class="{'selected': isApproved === true}">
          承認
        </button>
      </div>

      <p v-if="isApproved !== null">
        承認結果: {{ isApproved ? '承認済み' : '非承認' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.progress-step3 {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
}

.data-section {
  margin-bottom: 20px;
}

.data-section h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.data-section img {
  margin-bottom: -10px;
}

.approval-buttons {
  text-align: right;
  margin-top: 20px;
}

.approval-buttons button {
  margin-right: 10px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
}

.btnNo {
  padding: 20px 40px;
  color: #333;
  font-size: 30px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn1 {
  padding: 20px 60px;
  color: #333;
  font-size: 30px;
  font-weight: 500;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn1:hover,
.btn1.selected {
  color: #333;
  background-color: #ff8c00;
  box-shadow: 0 0 0;
  transform: translate(5px, 5px);
}

.btnNo:hover,
.btnNo.selected {
  background-color: #4b2ddd;
  color: #fff;
  box-shadow: 0 0 0;
  transform: translate(5px, 5px);
}

h3 {
  color: #333;
  margin-top: 40px;
}

.loading {
  font-size: 18px;
  color: #666;
  text-align: center;
  margin: 20px;
}
</style>
