<script setup>
import { ref,  onMounted } from 'vue';
import Chat from './Chat.vue';
import Hokoku from './P1_Hokoku.vue';
import Shonin from './P2_shonin.vue';
import Review from './P3_Review.vue';

// ✅ 親から受け取るprops（userId追加）
const props = defineProps({
  request: {
    type: [Object, Array],  // 配列対応
    required: true,
  },
  userId: {
    type: [Number, String],
    required: true,
  },
});

// ✅ requestオブジェクトが配列かオブジェクトかを判定
const requestData = Array.isArray(props.request) ? props.request[0] : props.request;

// ✅ データ受け取りの確認ログ
onMounted(() => {
  console.log("[ProgressStep] 受け取ったcaseId:", requestData.case_id);
  console.log("[ProgressStep] 受け取ったuserId:", props.userId);
  console.log("[ProgressStep] 受け取ったrequest:", requestData);
});

// ✅ アコーディオンの開閉状態
const isProgress1Open = ref(false);
const isProgress2Open = ref(false);
const isProgress3Open = ref(false);
</script>

<template>
  <div class="participants-info">
    <Chat />

    <!-- 1: 実行報告内容 -->
    <div class="progress-section">
      <h2 @click="isProgress1Open = !isProgress1Open" class="accordion-header">
        ステップ１：実行報告内容
        <span>{{ isProgress1Open ? '閉じる' : '開く' }}</span>
      </h2>
      <div v-if="isProgress1Open" class="accordion-content">
        <Hokoku 
          :case-id="requestData.case_id" 
          :user-id="props.userId" 
          :request="requestData" 
        />
      </div>
    </div>

    <!-- 2: 報告内容の承認 -->
    <div class="progress-section">
      <h2 @click="isProgress2Open = !isProgress2Open" class="accordion-header">
        ステップ２：報告内容の承認
        <span>{{ isProgress2Open ? '閉じる' : '開く' }}</span>
      </h2>
      <div v-if="isProgress2Open" class="accordion-content">
        <Shonin 
          :case-id="requestData.case_id" 
          :user-id="props.userId" 
          :request="requestData" 
          />
      </div>
    </div>

    <!-- 3: 依頼参加者の評価 -->
    <div class="progress-section">
      <h2 @click="isProgress3Open = !isProgress3Open" class="accordion-header">
        ステップ３：依頼参加者の評価
        <span>{{ isProgress3Open ? '閉じる' : '開く' }}</span>
      </h2>
      <div v-if="isProgress3Open" class="accordion-content">
        <Review />
      </div>
    </div>
  </div>
</template>

<style scoped>
.participants-info {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.progress-section {
  margin-bottom: 10px;
}

.accordion-header {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f7a400;
  color: #333;
  border-radius: 5px;
}

.accordion-header:hover {
  background-color: #ff8c00;
}

.accordion-content {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin-top: 5px;
}
</style>
