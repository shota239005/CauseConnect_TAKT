<script setup>
import { ref } from 'vue';
import Chat from './Chat.vue';
import Hokoku from './P1_Hokoku.vue';
import Shonin from './P2_shonin.vue';
import Review from './P3_Review.vue';

// 進行度ごとのアコーディオンの開閉状態
const isProgress1Open = ref(false);
const isProgress2Open = ref(false);
const isProgress3Open = ref(false);
const isProgress4Open = ref(false);
</script>

<template>
  <div class="participants-info">
    <Chat /> <!-- Chatコンポーネントを表示 -->


    <!-- 1: アコーディオン -->
    <div class="progress-section">
      <h2 @click="isProgress2Open = !isProgress2Open" class="accordion-header">
        ステップ１：実行報告内容
        <span>{{ isProgress2Open ? '閉じる' : '開く' }}</span>
      </h2>
      <div v-if="isProgress2Open" class="accordion-content">
        <Hokoku /> <!-- 進行度2に関連するHokokuコンポーネントを表示 -->
      </div>
    </div>

    <!-- 2: アコーディオン -->
    <div class="progress-section">
      <h2 @click="isProgress3Open = !isProgress3Open" class="accordion-header">
        ステップ２：報告内容の承認
        <span>{{ isProgress3Open ? '閉じる' : '開く' }}</span>
      </h2>
      <div v-if="isProgress3Open" class="accordion-content">
        <Shonin /> <!-- 進行度3に関連するShoninコンポーネントを表示 -->
      </div>
    </div>

    <!-- 3: アコーディオン -->
    <div class="progress-section">
      <h2 @click="isProgress4Open = !isProgress4Open" class="accordion-header">
        ステップ３：依頼参加者の評価
        <span>{{ isProgress4Open ? '閉じる' : '開く' }}</span>
      </h2>
      <div v-if="isProgress4Open" class="accordion-content">
        <Review /> <!-- 進行度4に関連するReviewコンポーネントを表示 -->
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
