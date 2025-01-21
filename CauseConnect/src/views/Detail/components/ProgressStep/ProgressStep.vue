<script setup>
import { ref, onMounted } from 'vue';
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

// ✅ 表示状態の管理
const showProgress1 = ref(false);
const showProgress2 = ref(false);
const showProgress3 = ref(false);

// ✅ state_idによる表示制御
const setStepVisibility = () => {
  const stateId = requestData.state_id;

  if (stateId === 1) {
    showProgress1.value = true;
  } else if (stateId === 2) {
    showProgress1.value = true;
    showProgress2.value = true;
  } else if (stateId >= 3) {
    showProgress1.value = true;
    showProgress2.value = true;
    showProgress3.value = true;
  }
};

// ✅ データ受け取りの確認ログと初期開閉状態の設定
onMounted(() => {
  // console.log("[ProgressStep] 受け取ったcaseId:", requestData.case_id);
  // console.log("[ProgressStep] 受け取ったuserId:", props.userId);
  // console.log("[ProgressStep] 受け取ったstate_id:", requestData.state_id);

  setStepVisibility();  // ✅ state_idに応じた表示制御
});
</script>

<template>
  <div class="participants-info">
    <Chat />

    <!-- 1: 実行報告内容 -->
    <div v-if="showProgress1" class="progress-section">
      <h2 class="accordion-header">ステップ１：実行報告内容</h2>
      <div class="accordion-content">
        <Hokoku 
          :case-id="requestData.case_id" 
          :user-id="props.userId" 
          :request="requestData" 
        />
      </div>
    </div>

    <!-- 2: 報告内容の承認 -->
    <div v-if="showProgress2" class="progress-section">
      <h2 class="accordion-header">ステップ２：報告内容の承認</h2>
      <div class="accordion-content">
        <Shonin 
          :case-id="requestData.case_id" 
          :user-id="props.userId" 
          :request="requestData" 
        />
      </div>
    </div>

    <!-- 3: 依頼参加者の評価 -->
    <div v-if="showProgress3" class="progress-section">
      <h2 class="accordion-header">ステップ３：依頼参加者の評価</h2>
      <div class="accordion-content">
        <Review 
          :case-id="requestData.case_id" 
          :user-id="props.userId" 
          :request="requestData"
        />
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
  cursor: default;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f7a400;
  color: #333;
  border-radius: 5px;
}

.accordion-content {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin-top: 5px;
}
</style>
