<script setup>
import { ref, onMounted } from 'vue';
import Chat from './Chat.vue';
import Hokoku from './P1_Hokoku.vue';
import Shonin from './P2_shonin.vue';
import Review from './P3_Review.vue';

const props = defineProps({
  request: {
    type: [Object, Array],
    required: true,
  },
  userId: {
    type: [Number, String],
    required: true,
  },
});

const requestData = Array.isArray(props.request) ? props.request[0] : props.request;

// ✅ 各ステップの状態管理
const showProgress1 = ref(false);
const showProgress2 = ref(false);
const showProgress3 = ref(false);
const enableStep1 = ref(false);
const enableStep2 = ref(false);
const enableStep3 = ref(false);

const setStepVisibility = () => {
  const stateId = requestData.state_id;

  if (stateId >= 1) {
    showProgress1.value = true;
    enableStep1.value = true;
  }
  if (stateId >= 2) {
    showProgress2.value = true;
    enableStep2.value = true;
  }
  if (stateId >= 3) {
    showProgress3.value = true;
    enableStep3.value = true;
  }
};

onMounted(() => {
  setStepVisibility();
});
</script>
<template>
  <div class="participants-info">
    <Chat />

    <!-- 1: 実行報告内容 -->
    <div class="progress-section">
      <h2 class="accordion-header" :class="{ disabled: !enableStep1 }">
        ステップ１：実行報告内容
      </h2>
      <div class="accordion-content" v-show="enableStep1">
        <Hokoku :case-id="requestData.case_id" :user-id="props.userId" :request="requestData" />
      </div>
    </div>

    <!-- 2: 報告内容の承認 -->
    <div class="progress-section">
      <h2 class="accordion-header" :class="{ disabled: !showProgress2 }">
        ステップ２：報告内容の承認
      </h2>
      <div v-if="showProgress2" class="accordion-content">
        <Shonin :case-id="requestData.case_id" :user-id="props.userId" :request="requestData" />
      </div>
    </div>

    <!-- 3: 依頼参加者の評価 -->
    <div class="progress-section">
      <h2 class="accordion-header" :class="{ disabled: !enableStep3 }">
        ステップ３：依頼参加者の評価
      </h2>
      <div class="accordion-content" v-show="enableStep3">
        <Review :case-id="requestData.case_id" :user-id="props.userId" :request="requestData" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.participants-info {
  padding: 15px;
  border: 2px solid #f7a400;
  border-radius: 8px;
  background-color: #fff;
}

.progress-section {
  margin-bottom: 10px;
}

.accordion-header {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f7a400;
  color: #333;
  border-radius: 5px;
  cursor: pointer;
}

.accordion-header.disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.accordion-content {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin-top: 5px;
}
</style>
