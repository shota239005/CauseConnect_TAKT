<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const reportData = ref(null); // コメントデータ
    const photos = ref([]); // 写真データ
    const error = ref(null); // エラーメッセージ

    const fetchReportData = async (caseId) => {
      try {
        // APIからデータを取得
        const response = await axios.get(`http://172.16.3.135:8000/api/request-report/${caseId}`);
        reportData.value = response.data.report;
        photos.value = response.data.photos;
      } catch (err) {
        // エラー処理
        error.value = 'データの取得に失敗しました';
        console.error(err);
      }
    };

    onMounted(() => {
      fetchReportData(35); // 固定された case_id = 35 を使用
    });

    return {
      reportData,
      photos,
      error,
    };
  },
};
</script>

<template>
  <div class="progress-step3">
    <div v-if="reportData && photos.length">
      <div class="data-section">
        <h3>依頼報告と写真</h3>
        <div v-for="(photo, index) in photos" :key="photo.picture_type" class="report-item">
          <p v-if="index === 0"><strong>参加者コメント:</strong> {{ reportData.comment1 }}</p>
          <p v-if="index === 1"><strong>依頼場所コメント:</strong> {{ reportData.comment2 }}</p>
          <p v-if="index === 2"><strong>実行前コメント:</strong> {{ reportData.comment3 }}</p>
          <p v-if="index === 3"><strong>実行後コメント:</strong> {{ reportData.comment4 }}</p>
          <img :src="`http://172.16.3.135:8000/storage/${photo.picture}`" :alt="`写真タイプ${photo.picture_type}`" />
        </div>
      </div>
    </div>
    <p v-else-if="error" class="error-message">{{ error }}</p>
    <p v-else class="loading">読み込み中...</p>

    <div class="approval-buttons">
      <h2>※承認を押すとポイントが付与されます</h2>
      <button class="btn1">承認</button>
      <button class="btnNo">非承認</button>
    </div>
  </div>
</template>


<style scoped>
.progress-step3 {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
  font-family: Arial, sans-serif;
}

.data-section {
  margin-bottom: 20px;
}

.data-section h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.data-section p {
  color: #333;
  font-size: 14px;
  margin-bottom: 8px;
}

.report-item {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.report-item img {
  max-width: 100%;
  border: 2px solid #f7a400;
  border-radius: 4px;
  margin-top: 10px;
}

.approval-buttons {
  text-align: right;
  margin-top: 20px;
}

.approval-buttons h2 {
  font-size: 16px;
  margin-bottom: 10px;
}


.error-message {
  color: #d9534f;
  font-size: 16px;
  margin-top: 20px;
}

.loading {
  color: #999;
  font-size: 16px;
  margin-top: 20px;
}

.btnNo {
  margin-left: 20px;
  padding: 20px 40px;
  color: #333;
  font-size: 30px;
  transition: transform 0.3s, box-shadow 0.3s;
}
.btn1{
  padding: 20px 60px;
  color: #333;
  font-size: 30px;
  font-weight: 500;
  transition: transform 0.3s, box-shadow 0.3s;
}


.btn1:hover, .btn1.selected {
  color: #333;
  background-color: #ff8c00;
  box-shadow: 0 0 0;
  transform: translate(5px, 5px);
}

.btnNo:hover, .btnNo.selected {
  background-color: #4b2ddd;
  color: #fff;
  box-shadow: 0 0 0;
  transform: translate(5px, 5px);
}

</style>
